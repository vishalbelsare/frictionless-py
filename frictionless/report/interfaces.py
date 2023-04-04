from __future__ import annotations
from typing import TypedDict, List
from typing_extensions import Required


class IReport(TypedDict, total=False):
    name: str
    type: str
    title: str
    description: str
    valid: Required[bool]
    warnings: List[str]
    errors: List
    tasks: List[IReportTask]


class IReportTask(TypedDict, total=False):
    name: str
    type: str
    title: str
    description: str
    valid: Required[bool]
    place: str
    warning: List
    errors: List


class IReportStats(TypedDict, total=False):
    tasks: Required[int]
    warnings: Required[int]
    errors: Required[int]
    seconds: Required[float]


class IReportTaskStats(TypedDict, total=False):
    md5: str
    sha256: str
    bytes: int
    fields: int
    rows: int
    warnings: Required[int]
    errors: Required[int]
    seconds: Required[float]
