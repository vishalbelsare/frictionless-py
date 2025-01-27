from __future__ import annotations

import os
from typing import TYPE_CHECKING, Any, Dict, List, Union

from ...catalog import Catalog, Dataset
from ...exception import FrictionlessException
from ...package import Package
from ...platform import platform
from ...resource import Resource
from ...system import Adapter, PublishResult
from .control import GithubControl

if TYPE_CHECKING:
    from github.ContentFile import ContentFile
    from github.Repository import Repository


class GithubAdapter(Adapter):
    """Read and write data from/to Github"""

    def __init__(self, control: GithubControl):
        self.control = control

    # Read

    def read_package(self) -> Package:
        if not (self.control.repo and self.control.user):
            note = "Repo and user is required"
            raise FrictionlessException(note)

        assert self.control.formats
        client = platform.github.Github(self.control.apikey)
        location = "/".join([self.control.user, self.control.repo])
        try:
            repository = client.get_repo(location)
        except Exception as exception:
            note = "Github API error" + repr(exception)
            raise FrictionlessException(note)
        base_path = (
            f"https://raw.githubusercontent.com/{location}/{repository.default_branch}"
        )
        contents = repository.get_contents("")
        resource_path = get_resources(contents, repository)
        package = get_package(resource_path, repository, base_path, self.control.formats)

        if isinstance(package, Package) and package.resources:
            return package

        note = "Package/s not found"
        raise FrictionlessException(note)

    # Write

    # TODO: should return path: str
    def write_package(self, package: Package):
        assert self.control.repo
        assert self.control.apikey

        # Create repo
        repository = None
        user = None
        try:
            client = platform.github.Github(self.control.apikey)
            user = client.get_user()
            repository = user.create_repo(
                name=self.control.repo, auto_init=True, gitignore_template="Python"
            )
        except Exception as exception:
            note = "Github API error:" + repr(exception)
            raise FrictionlessException(note)

        # Write package file
        content = package.to_json()
        package_path = self.control.filename or "datapackage.json"
        if self.control.basepath:
            package_path = os.path.join(self.control.basepath, package_path)
        repository = user.get_repo(self.control.repo)
        username = self.control.name or user.name or self.control.user
        email = user.email or self.control.email or f"{username}@users.noreply.github.com"
        assert email
        assert username
        author = platform.github.InputGitAuthor(username, email)
        branch = repository.default_branch
        try:
            repository.create_file(
                path=package_path,
                message='Create "datapackage.json"',
                content=content,
                branch=repository.default_branch,
                committer=author,
                author=author,
            )
        except Exception as exception:
            note = "Github API error:" + repr(exception)
            raise FrictionlessException(note)

        # Write resource files
        try:
            for resource in package.resources:
                resource_path: str = resource.path or ""
                if self.control.basepath:
                    resource_path = os.path.join(self.control.basepath, resource_path)
                repository.create_file(
                    path=resource_path,
                    message='Create "resource_path"',
                    # It seeems to be it requires a string by a mistake
                    # https://stackoverflow.com/questions/72668275/how-to-upload-an-image-file-to-github-using-pygithub
                    content=resource.read_bytes(),  # type: ignore
                    branch=branch,
                    committer=author,
                    author=author,
                )
        except Exception as exception:
            note = "Github API error:" + repr(exception)
            raise FrictionlessException(note)

        # Get url
        url = repository.html_url

        # Enable pages
        if self.control.enable_pages:
            try:
                # TODO: rebase on public API when it's available
                # https://github.com/PyGithub/PyGithub/issues/2037
                repository._requester.requestJsonAndCheck(
                    "POST",
                    f"{repository.url}/pages",
                    input={"source": {"branch": "main"}},
                )
                url = f"https://{user.name}.github.io/{repository.name}"
            except Exception as exception:
                note = "Github API error:" + repr(exception)
                raise FrictionlessException(note)

        return PublishResult(url=url, context=dict(repository=repository))

    # Experimental

    def read_catalog(self) -> Catalog:
        packages: List[Union[Package, str]] = []
        query: Dict[str, Any] = {}

        if not (self.control.repo or self.control.user or self.control.search):
            note = "Repo or user or search text is required"
            raise FrictionlessException(note)

        assert self.control.formats

        # Search single repo
        if self.control.user and self.control.repo:
            client = platform.github.Github(self.control.apikey)
            location = "/".join([self.control.user, self.control.repo])
            try:
                repository = client.get_repo(location)
            except Exception as exception:
                note = "Github API error" + repr(exception)
                raise FrictionlessException(note)
            base_path = f"https://raw.githubusercontent.com/{location}/{repository.default_branch}"
            contents = repository.get_contents("")
            resource_path = get_resources(contents, repository)
            all_packages = get_package(
                resource_path, repository, base_path, self.control.formats, catalog=True
            )
            if all_packages and isinstance(all_packages, list):
                packages = packages + all_packages  # type: ignore
                return Catalog(
                    datasets=[
                        Dataset(name=package.name, package=package)  # type: ignore
                        for package in all_packages
                    ]
                )
            note = "Package/s not found"
            raise FrictionlessException(note)

        # Search multiple repos
        options = {}
        if self.control.search:
            query = {"q": self.control.search}
            if self.control.user and "user:" not in self.control.search:
                options["user"] = self.control.user

        if not self.control.search and self.control.user:
            query = {"q": f"user:{self.control.user}"}

        if self.control.repo and "q" not in query:
            query["q"] = f"repo:{self.control.repo}"

        if self.control.order:
            options["order"] = self.control.order

        if self.control.sort:
            options["sort"] = self.control.sort

        try:
            assert self.control.per_page
            assert self.control.formats
            client = platform.github.Github(
                self.control.apikey, per_page=self.control.per_page
            )
            #  user = client.get_user()
            repositories = client.search_repositories(query["q"], **options)
            if self.control.page:
                repositories = repositories.get_page(self.control.page)
            for repository in repositories:
                base_path = f"https://raw.githubusercontent.com/{repository.full_name}/{repository.default_branch}"
                contents = repository.get_contents("")
                resource_path = get_resources(contents, repository)
                package = get_package(
                    resource_path, repository, base_path, self.control.formats
                )
                if isinstance(package, Package) and package.resources:
                    packages.append(package)
        except Exception as exception:
            note = "Github API error" + repr(exception)
            raise FrictionlessException(note)

        if packages:
            return Catalog(
                datasets=[
                    Dataset(name=package.name, package=package)  # type: ignore
                    for package in packages
                ]
            )

        note = "Package/s not found"
        raise FrictionlessException(note)


def get_resources(
    contents: Union[List[ContentFile], ContentFile], repository: Repository
) -> List[ContentFile]:
    paths: List[ContentFile] = []
    while contents:
        file_content = contents.pop(0)  # type: ignore
        if file_content.type == "dir":  # type: ignore
            contents.extend(repository.get_contents(file_content.path))  # type: ignore
        else:
            paths.append(file_content)  # type: ignore
    return paths


def get_package(
    paths: List[ContentFile],
    repository: Repository,
    base_path: str,
    formats: List[str],
    catalog: bool = False,
) -> Union[Package, List[Package]]:
    def multiple_packages(base_path: str):
        packages: List[Package] = []
        for file in paths:
            fullpath = f"{base_path}/{file.path}"
            if any(file.path.endswith(filename) for filename in ["datapackage.json"]):
                package = Package.from_descriptor(fullpath)
                packages.append(package)
        return packages

    if catalog:
        return multiple_packages(base_path)

    package = Package(name=repository.name, basepath=base_path)
    for file in paths:
        fullpath = f"{base_path}/{file.path}"
        if file.path in ["datapackage.json"]:
            package = Package.from_descriptor(fullpath)
            return package
        if any(file.path.endswith(ext) for ext in formats):
            resource = Resource(path=file.path)
            package.add_resource(resource)
    return package
