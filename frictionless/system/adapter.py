from __future__ import annotations

from typing import TYPE_CHECKING, Any

from . import models

if TYPE_CHECKING:
    from ..catalog import Catalog
    from ..package import Package


# NOTE:
# There should be a way to check the supported functionality of a concrete adapter
# For example, does it support `read_catalog`? We can implement it based on what
# methods return (or not) or use some kins of `supported_actions` property


class Adapter:
    # Read

    def read_package(self) -> Package:
        raise NotImplementedError()

    # Write

    def write_package(self, package: Package) -> models.PublishResult:
        raise NotImplementedError()

    # Experimental

    def write_catalog(self, catalog: Catalog) -> Any:
        raise NotImplementedError()

    def read_catalog(self) -> Catalog:
        raise NotImplementedError()
