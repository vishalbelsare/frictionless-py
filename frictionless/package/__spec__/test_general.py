import sys
import textwrap
from collections.abc import Mapping
from importlib import import_module
from pathlib import Path

import pytest

from frictionless import FrictionlessException, Package, Resource, system

BASEURL = "https://raw.githubusercontent.com/frictionlessdata/frictionless-py/master/%s"


# General


def test_package():
    package = Package("data/package.json")
    assert package.name == "name"
    assert package.basepath == "data"
    assert package.to_descriptor() == {
        "name": "name",
        "resources": [
            {
                "name": "name",
                "type": "table",
                "path": "table.csv",
                "scheme": "file",
                "format": "csv",
                "mediatype": "text/csv",
            },
        ],
    }


def test_package_from_dict_to_standards_v1():
    package = Package({"name": "name", "profile": "data-package", "resources": []})
    assert package.to_descriptor() == {
        "name": "name",
        "profile": "data-package",
        "resources": [],
    }
    with system.use_context(standards="v1"):
        assert package.to_descriptor() == {
            "name": "name",
            "profile": "data-package",
            "resources": [],
        }


class NotADict(Mapping):
    def __init__(self, **kwargs):
        self.__dict__.update(**kwargs)

    def __getitem__(self, key):
        return self.__dict__[key]

    def __iter__(self):
        return iter(self.__dict__)

    def __len__(self):
        return len(self.__dict__)


def test_package_from_mapping():
    package = Package(NotADict(name="name", resources=[]))
    assert package.to_descriptor() == {
        "name": "name",
        "resources": [],
    }


def test_package_from_path():
    package = Package("data/package.json")
    assert package.name == "name"
    assert package.basepath == "data"
    assert package.to_descriptor() == {
        "name": "name",
        "resources": [
            {
                "name": "name",
                "type": "table",
                "path": "table.csv",
                "scheme": "file",
                "format": "csv",
                "mediatype": "text/csv",
            },
        ],
    }


def test_package_from_pathlib():
    package = Package(Path("data/package/datapackage.json"))
    assert len(package.get_table_resource("data").read_rows()) == 2


def test_package_from_path_error_bad_path():
    with pytest.raises(FrictionlessException) as excinfo:
        Package.from_descriptor("data/bad.json")
    error = excinfo.value.error
    assert error.type == "package-error"
    assert error.note.count("bad.json")


def test_package_from_path_error_non_json():
    with pytest.raises(FrictionlessException) as excinfo:
        Package.from_descriptor("data/table.csv")
    error = excinfo.value.error
    assert error.type == "package-error"
    assert error.note.count("table.csv")


def test_package_from_path_error_bad_json():
    with pytest.raises(FrictionlessException) as excinfo:
        Package.from_descriptor("data/invalid.json")
    error = excinfo.value.error
    assert error.type == "package-error"
    assert error.note.count("invalid.json")


def test_package_from_path_error_bad_json_not_dict():
    with pytest.raises(FrictionlessException) as excinfo:
        Package.from_descriptor("data/table.json")
    error = excinfo.value.error
    assert error.type == "package-error"
    assert error.note.count("table.json")


@pytest.mark.vcr
@pytest.mark.skipif(sys.version_info < (3, 10), reason="pytest-vcr bug in Python3.8/9")
def test_package_from_path_remote():
    package = Package.from_descriptor(BASEURL % "data/package.json")
    assert package.basepath == BASEURL % "data"
    assert package.to_descriptor() == {
        "name": "name",
        "resources": [
            {
                "name": "name",
                "type": "table",
                "path": "table.csv",
                "scheme": "file",
                "format": "csv",
                "mediatype": "text/csv",
            }
        ],
    }


@pytest.mark.vcr
def test_package_from_path_remote_error_not_found():
    with pytest.raises(FrictionlessException) as excinfo:
        Package.from_descriptor(BASEURL % "data/bad.json")
    error = excinfo.value.error
    assert error.type == "package-error"
    assert error.note.count("bad.json")


@pytest.mark.vcr
def test_package_from_path_remote_error_bad_json():
    with pytest.raises(FrictionlessException) as excinfo:
        Package.from_descriptor(BASEURL % "data/invalid.json")
    error = excinfo.value.error
    assert error.type == "package-error"
    assert error.note.count("invalid.json")


@pytest.mark.vcr
def test_package_from_path_remote_error_bad_json_not_dict():
    with pytest.raises(FrictionlessException) as excinfo:
        Package.from_descriptor(BASEURL % "data/table-lists.json")
    error = excinfo.value.error
    assert error.type == "package-error"
    assert error.note.count("table-lists.json")


def test_package_from_invalid_descriptor_type():
    with pytest.raises(FrictionlessException) as excinfo:
        Package.from_descriptor(51)  # type: ignore
    error = excinfo.value.error
    assert error.type == "package-error"
    assert error.note.count("51")


@pytest.mark.parametrize("create_descriptor", [(False,), (True,)])
def test_package_standard_specs_properties(create_descriptor):
    helpers = import_module("frictionless.helpers")
    options = dict(
        name="name",
        profiles=[],
        licenses=[],
        sources=[],
        title="title",
        description="description",
        homepage="homepage",
        version="version",
        contributors=[],
        keywords=["keyword"],
        image="image",
        created="2022-08-08T12:00:00Z",
        resources=[],
    )
    package = (
        Package(**options)  # type: ignore
        if not create_descriptor
        else Package(helpers.create_descriptor(**options))
    )
    assert package.name == "name"
    assert package.profile is None
    assert package.licenses == []
    assert package.sources == []
    assert package.title == "title"
    assert package.description == "description"
    assert package.homepage == "homepage"
    assert package.version == "version"
    assert package.contributors == []
    assert package.keywords == ["keyword"]
    assert package.image == "image"
    assert package.created == "2022-08-08T12:00:00Z"
    assert package.resources == []


def test_package_description_html():
    package = Package(description="**test**")
    assert package.description == "**test**"
    assert package.description_html == "<p><strong>test</strong></p>"


def test_package_description_html_multiline():
    package = Package(description="**test**\n\nline")
    assert package.description == "**test**\n\nline"
    assert package.description_html == "<p><strong>test</strong></p><p>line</p>"


def test_package_description_text():
    package = Package(description="**test**\n\nline")
    assert package.description == "**test**\n\nline"
    assert package.description_text == "test line"


def test_package_description_text_plain():
    package = Package(description="It's just a plain text. Another sentence")
    assert package.description == "It's just a plain text. Another sentence"
    assert package.description_text == "It's just a plain text. Another sentence"


def test_package_set_base_path():
    package = Package(basepath="/data")
    assert package.basepath == "/data"
    package.basepath = "/data/csv"
    assert package.basepath == "/data/csv"


@pytest.mark.skip
def test_package_pprint():
    data = [["id", "name"], ["1", "english"], ["2", "中国人"]]
    package = Package({"resources": [{"name": "name", "data": data}]})
    expected = """
    {'resources': [{'name': 'name',
                    'data': [['id', 'name'], ['1', 'english'], ['2', '中国人']]}]}
    """
    assert repr(package) == textwrap.dedent(expected).strip()


@pytest.mark.parametrize("allow_invalid", [False, True])
def test_package_allow_invalid(allow_invalid):
    try:
        Package.from_descriptor(
            {
                "resources": [
                    {"name": "name", "data": []},
                    {"name": "name", "data": []},
                ]
            },
            allow_invalid=allow_invalid,
        )
        assert allow_invalid is True
    except FrictionlessException:
        assert allow_invalid is False


# Bugs


def test_package_dialect_no_header_issue_167():
    package = Package("data/package-dialect-no-header.json")
    resource = package.get_table_resource("people")
    rows = resource.read_rows()
    assert rows[0]["score"] == 1
    assert rows[1]["score"] == 1


def test_package_validation_does_not_catch_errors_issue_869():
    with pytest.raises(FrictionlessException) as excinfo:
        Package("data/issue-869.json")
    error = excinfo.value.error
    reasons = excinfo.value.reasons
    assert len(reasons) == 2
    assert error.type == "package-error"
    assert error.note == "descriptor is not valid"
    assert reasons[0].note == 'property "created" is not valid "datetime"'
    assert reasons[1].note == 'property "contributors[].email" is not valid "email"'


@pytest.mark.skip
def test_package_validation_duplicate_resource_names_issue_942():
    with pytest.raises(FrictionlessException) as excinfo:
        Package(
            resources=[
                Resource(name="name", path="data/table.csv"),
                Resource(name="name", path="data/table.csv"),
            ]
        )
    error = excinfo.value.error
    assert error.type == "package-error"
    assert error.note == 'resource "name" already exists'


@pytest.mark.vcr
@pytest.mark.skipif(sys.version_info < (3, 10), reason="pytest-vcr bug in Python3.8/9")
def test_package_remote_scheme_regression_for_resources_issue_1388():
    package = Package.from_descriptor(
        "https://raw.githubusercontent.com/fdtester/test-write-package-with-dialect/main/datapackage.json"
    )
    rows = package.get_table_resource("countries").read_rows()
    assert len(rows) == 2


@pytest.mark.vcr
@pytest.mark.skipif(sys.version_info < (3, 10), reason="pytest-vcr bug in Python3.8/9")
def test_package_remote_windows_1505():
    url = "https://raw.githubusercontent.com/transparencia-mg/datapackage-reprex/foreign-key-constraint/datapackage.json"
    package = Package(url)
    assert package.name == "datapackage-reprex"
    assert len(package.get_table_resource("estados").read_rows()) == 27
