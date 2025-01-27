from __future__ import annotations

from typing import TYPE_CHECKING, Any

import attrs

from ...pipeline import Step
from ...schema import Schema

if TYPE_CHECKING:
    from ...resource import Resource


@attrs.define(kw_only=True, repr=False)
class table_pivot(Step):
    """Pivot table.

    This step can be added using the `steps` parameter
    for the `transform` function.

    """

    type = "table-pivot"

    f1: str
    """
    Field that makes the rows in the output pivot table.
    """

    f2: str
    """
    Field that makes the columns in the output pivot table.
    """

    f3: str
    """
    Field that forms the data in the output pivot table.
    """

    aggfun: Any
    """
    Function to process and create data in the output pivot table.
    The function can be "sum", "max", "min", "len" etc.
    """

    # Transform

    def transform_resource(self, resource: Resource):
        table = resource.to_petl()  # type: ignore
        resource.data = table.pivot(self.f1, self.f2, self.f3, self.aggfun)  # type: ignore
        resource.schema = Schema()
        resource.infer()

    # Metadata

    metadata_profile_patch = {
        "required": ["f1", "f2", "f3", "aggfun"],
        "properties": {
            "f1": {"type": "string"},
            "f2": {"type": "string"},
            "f3": {"type": "string"},
            "aggfun": {},
        },
    }
