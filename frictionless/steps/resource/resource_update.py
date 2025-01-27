from __future__ import annotations

from copy import deepcopy
from typing import TYPE_CHECKING, Optional

import attrs

from ... import errors, helpers
from ...exception import FrictionlessException
from ...pipeline import Step

if TYPE_CHECKING:
    from ... import types
    from ...package import Package
    from ...resource import Resource


@attrs.define(kw_only=True, repr=False)
class resource_update(Step):
    """Update resource.

    This step can be added using the `steps` parameter
    for the `transform` function.

    """

    type = "resource-update"

    name: Optional[str] = None
    """
    Name of the resource to update.
    """

    descriptor: types.IDescriptor
    """
    New descriptor for the resource to update metadata.
    """

    # Transform

    def transform_package(self, package: Package):
        if not self.name:
            note = 'Property "name" is required for "resource_update" within a package'
            raise FrictionlessException(errors.StepError(note=note))
        descriptor = deepcopy(self.descriptor)
        package.update_resource(self.name, descriptor)

    # NOTE: This implementation is not type safe
    # Consider moving away from descriptor to named/typed properties
    def transform_resource(self, resource: Resource):
        options = helpers.create_options(self.descriptor)
        for name, value in options.items():
            setattr(resource, name, value)
        resources = resource.package.resources if resource.package else []
        new_name = options.get("name")
        if new_name and new_name != self.name:
            # update name in all the resources where it is referenced
            for package_resource in resources:
                for index, fk in enumerate(package_resource.schema.foreign_keys):
                    if fk["reference"]["resource"] == self.name:
                        package_resource.schema.foreign_keys[index]["reference"][
                            "resource"
                        ] = new_name
                package_resource.schema.foreign_keys = (
                    package_resource.schema.foreign_keys
                )
            if resource.package:
                resource.package.metadata_descriptor_initial = (
                    resource.package.to_descriptor()
                )

    # Metadata

    metadata_profile_patch = {
        "required": ["descriptor"],
        "properties": {
            "name": {"type": "string"},
            "descriptor": {"type": "object"},
        },
    }
