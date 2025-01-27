from __future__ import annotations

import attrs

from ...dialect import Control


@attrs.define(kw_only=True, repr=False)
class PandasControl(Control):
    """Pandas dialect representation"""

    type = "pandas"
