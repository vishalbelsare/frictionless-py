from __future__ import annotations

import attrs

from ..schema import Field


@attrs.define(kw_only=True, repr=False)
class AnyField(Field):
    type = "any"
    builtin = True
    supported_constraints = [
        "required",
        "enum",
    ]
