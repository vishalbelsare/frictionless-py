import pathlib

import pytest

from frictionless import (
    Check,
    Checklist,
    Detector,
    FrictionlessException,
    Resource,
    errors,
)
from frictionless.resources import TableResource

# General


def test_resource_validate():
    resource = TableResource.from_descriptor({"name": "name", "path": "data/table.csv"})
    report = resource.validate()
    assert report.valid


def test_resource_validate_invalid_table():
    resource = TableResource.from_descriptor({"name": "name", "path": "data/invalid.csv"})
    report = resource.validate()
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [None, 3, "blank-label"],
        [None, 4, "duplicate-label"],
        [2, 3, "missing-cell"],
        [2, 4, "missing-cell"],
        [3, 3, "missing-cell"],
        [3, 4, "missing-cell"],
        [4, None, "blank-row"],
        [5, 5, "extra-cell"],
    ]


def test_resource_validate_resource_with_schema_as_string():
    resource = TableResource.from_descriptor(
        {"name": "name", "path": "data/table.csv", "schema": "data/schema.json"}
    )
    report = resource.validate()
    assert report.valid


def test_resource_validate_from_path():
    resource = TableResource(path="data/table.csv")
    report = resource.validate()
    assert report.valid


def test_resource_validate_invalid():
    resource = TableResource(path="data/invalid.csv")
    report = resource.validate()
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [None, 3, "blank-label"],
        [None, 4, "duplicate-label"],
        [2, 3, "missing-cell"],
        [2, 4, "missing-cell"],
        [3, 3, "missing-cell"],
        [3, 4, "missing-cell"],
        [4, None, "blank-row"],
        [5, 5, "extra-cell"],
    ]


def test_resource_validate_blank_headers():
    resource = TableResource(path="data/blank-headers.csv")
    report = resource.validate()
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [None, 2, "blank-label"],
    ]


def test_resource_validate_duplicate_headers():
    resource = TableResource(path="data/duplicate-headers.csv")
    report = resource.validate()
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [None, 3, "duplicate-label"],
        [None, 5, "duplicate-label"],
    ]


def test_resource_validate_defective_rows():
    resource = TableResource(path="data/defective-rows.csv")
    report = resource.validate()
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [2, 3, "missing-cell"],
        [3, 4, "extra-cell"],
    ]


def test_resource_validate_blank_rows():
    resource = TableResource(path="data/blank-rows.csv")
    report = resource.validate()
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [4, None, "blank-row"],
    ]


def test_resource_validate_blank_rows_multiple():
    resource = TableResource(path="data/blank-rows-multiple.csv")
    report = resource.validate()
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [4, None, "blank-row"],
        [5, None, "blank-row"],
        [6, None, "blank-row"],
        [7, None, "blank-row"],
        [8, None, "blank-row"],
        [9, None, "blank-row"],
        [10, None, "blank-row"],
        [11, None, "blank-row"],
        [12, None, "blank-row"],
        [13, None, "blank-row"],
        [14, None, "blank-row"],
    ]


def test_resource_validate_blank_cell_not_required():
    resource = TableResource(path="data/blank-cells.csv")
    report = resource.validate()
    assert report.valid


def test_resource_validate_no_data():
    resource = TableResource(path="data/empty.csv")
    report = resource.validate()
    assert report.flatten(["type", "note"]) == [
        ["source-error", "the source is empty"],
    ]


def test_resource_validate_no_rows():
    resource = TableResource(path="data/without-rows.csv")
    report = resource.validate()
    assert report.valid


def test_resource_validate_no_rows_with_compression():
    resource = TableResource(path="data/without-rows.csv.zip")
    report = resource.validate()
    assert report.valid


def test_resource_validate_source_invalid():
    # Reducing sample size to get raise on iter, not on open
    detector = Detector(sample_size=1)
    resource = TableResource(data=[["h"], [1], "bad"], detector=detector)
    report = resource.validate()
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [None, None, "source-error"],
    ]


def test_resource_validate_source_invalid_many_rows():
    # Reducing sample size to get raise on iter, not on open
    detector = Detector(sample_size=1)
    resource = TableResource(data=[["h"], [1], "bad", "bad"], detector=detector)
    report = resource.validate()
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [None, None, "source-error"],
    ]


def test_resource_validate_source_pathlib_path_table():
    resource = Resource(pathlib.Path("data/table.csv"))
    assert isinstance(resource, TableResource)
    report = resource.validate()
    assert report.valid


def test_resource_validate_pick_errors():
    resource = TableResource(path="data/invalid.csv")
    checklist = Checklist(pick_errors=["blank-label", "blank-row"])
    report = resource.validate(checklist)
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [None, 3, "blank-label"],
        [4, None, "blank-row"],
    ]


def test_resource_validate_pick_errors_tags():
    resource = TableResource(path="data/invalid.csv")
    checklist = Checklist(pick_errors=["#header"])
    report = resource.validate(checklist)
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [None, 3, "blank-label"],
        [None, 4, "duplicate-label"],
    ]


def test_resource_validate_skip_errors():
    resource = TableResource(path="data/invalid.csv")
    checklist = Checklist(skip_errors=["blank-label", "blank-row"])
    report = resource.validate(checklist)
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [None, 4, "duplicate-label"],
        [2, 3, "missing-cell"],
        [2, 4, "missing-cell"],
        [3, 3, "missing-cell"],
        [3, 4, "missing-cell"],
        [5, 5, "extra-cell"],
    ]


def test_resource_validate_skip_errors_tags():
    resource = TableResource(path="data/invalid.csv")
    checklist = Checklist(skip_errors=["#header"])
    report = resource.validate(checklist)
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [2, 3, "missing-cell"],
        [2, 4, "missing-cell"],
        [3, 3, "missing-cell"],
        [3, 4, "missing-cell"],
        [4, None, "blank-row"],
        [5, 5, "extra-cell"],
    ]


def test_resource_validate_invalid_limit_errors():
    resource = TableResource(path="data/invalid.csv")
    report = resource.validate(limit_errors=3)
    assert report.task.warnings == ["reached error limit: 3"]
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [None, 3, "blank-label"],
        [None, 4, "duplicate-label"],
        [2, 3, "missing-cell"],
    ]


def test_resource_validate_structure_errors_with_limit_errors():
    resource = TableResource(path="data/structure-errors.csv")
    report = resource.validate(limit_errors=3)
    assert report.task.warnings == ["reached error limit: 3"]
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [4, None, "blank-row"],
        [5, 4, "extra-cell"],
        [5, 5, "extra-cell"],
    ]


def test_resource_validate_custom_check():
    # Create check
    class custom(Check):
        def validate_row(self, row):
            yield errors.BlankRowError(
                note="",
                cells=list(map(str, row.values())),
                row_number=row.row_number,
            )

    # Validate resource
    resource = TableResource(path="data/table.csv")
    checklist = Checklist(checks=[custom()])
    report = resource.validate(checklist)
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [2, None, "blank-row"],
        [3, None, "blank-row"],
    ]


def test_resource_validate_custom_check_with_arguments():
    # Create check
    class custom(Check):
        def __init__(self, *, row_number=None):
            self.row_number = row_number

        def validate_row(self, row):
            yield errors.BlankRowError(
                note="",
                cells=list(map(str, row.values())),
                row_number=self.row_number or row.row_number,
            )

    # Validate resource
    resource = TableResource(path="data/table.csv")
    checklist = Checklist(checks=[custom(row_number=1)])
    report = resource.validate(checklist)
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [1, None, "blank-row"],
        [1, None, "blank-row"],
    ]


@pytest.mark.skip
def test_resource_validate_custom_check_bad_name():
    descriptor = {
        "path": "data/table.csv",
        "checklist": {
            "checks": [{"type": "bad"}],
        },
    }
    report = TableResource.from_descriptor(descriptor).validate()
    assert report.flatten(["type", "note"]) == [
        ["check-error", 'check type "bad" is not supported'],
    ]


# Bugs


def test_resource_validate_infer_fields_issue_223():
    source = [["name1", "name2"], ["123", "abc"], ["456", "def"], ["789", "ghi"]]
    detector = Detector(schema_patch={"fields": {"name": {"type": "string"}}})
    resource = TableResource(data=source, detector=detector)
    report = resource.validate()
    assert report.valid


def test_resource_validate_infer_fields_issue_225():
    source = [["name1", "name2"], ["123", None], ["456", None], ["789"]]
    detector = Detector(schema_patch={"fields": {"name": {"type": "string"}}})
    resource = TableResource(data=source, detector=detector)
    report = resource.validate()
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [4, 2, "missing-cell"],
    ]


def test_resource_validate_fails_with_wrong_encoding_issue_274():
    # For now, by default encoding is detected incorrectly by chardet
    resource = TableResource(path="data/encoding-issue-274.csv", encoding="utf-8")
    report = resource.validate()
    assert report.valid


def test_resource_validate_wide_table_with_order_fields_issue_277():
    source = "data/issue-277.csv"
    schema = "data/issue-277.json"
    detector = Detector(schema_sync=True)
    resource = TableResource(path=source, schema=schema, detector=detector)
    report = resource.validate()
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [49, 50, "constraint-error"],
        [68, 50, "constraint-error"],
        [69, 50, "constraint-error"],
    ]


@pytest.mark.skip
def test_validate_invalid_table_schema_issue_304():
    descriptor = {
        "data": [["name", "age"], ["Alex", "33"]],
        "schema": {
            "fields": [
                {"name": "name", "type": "string"},
                {"name": "age", "type": "bad"},
            ]
        },
    }
    report = TableResource.from_descriptor(descriptor).validate()
    assert report.flatten(["type", "note"]) == [
        ["field-error", 'field type "bad" is not supported'],
    ]


def test_resource_validate_table_is_invalid_issue_312():
    resource = TableResource(path="data/issue-312.xlsx")
    report = resource.validate()
    assert report.flatten(["rowNumber", "fieldNumber", "type"]) == [
        [None, 3, "blank-label"],
        [None, 4, "duplicate-label"],
        [None, 5, "blank-label"],
        [5, None, "blank-row"],
    ]


def test_resource_validate_missing_local_file_raises_scheme_error_issue_315():
    resource = TableResource(path="bad-path.csv")
    report = resource.validate()
    assert report.stats["errors"] == 1
    [[type, note]] = report.flatten(["type", "note"])
    assert type == "scheme-error"
    assert note.count("[Errno 2]") and note.count("bad-path.csv")


def test_resource_validate_inline_not_a_binary_issue_349():
    with open("data/table.csv") as source:
        resource = TableResource(data=source, format="csv")
        report = resource.validate()
        assert report.valid


@pytest.mark.ci
def test_resource_validate_newline_inside_label_issue_811():
    detector = Detector(sample_size=8000)
    resource = TableResource(path="data/issue-811.csv", detector=detector)
    report = resource.validate()
    assert report.valid


def test_resource_validate_resource_from_json_format_issue_827():
    resource = TableResource(path="data/table.json")
    report = resource.validate()
    assert report.valid


def test_resource_validate_resource_none_is_not_iterable_enum_constraint_issue_833():
    resource = TableResource(path="data/issue-833.csv", schema="data/issue-833.json")
    report = resource.validate()
    assert report.valid


def test_resource_validate_resource_header_row_has_first_number_issue_870():
    resource = TableResource(path="data/issue-870.xlsx")
    report = resource.validate(limit_rows=5)
    assert report.valid


def test_validate_resource_duplicate_labels_with_sync_schema_issue_910():
    detector = Detector(schema_sync=True)
    report = TableResource(
        path="data/duplicate-column.csv",
        schema="data/duplicate-column-schema.json",
        detector=detector,
    ).validate()
    assert report.flatten(["type", "note"]) == [
        ["error", '"schema_sync" requires unique labels in the header'],
    ]


def test_resource_validate_resource_array_path_issue_991():
    with pytest.warns(UserWarning):
        resource = TableResource.from_descriptor("data/issue-991.resource.json")
        report = resource.validate()
        assert report.flatten(["type", "note"]) == [
            ["source-error", "the source is empty"],
        ]


def test_resource_validate_resource_metadata_errors_with_missing_values_993():
    with pytest.raises(FrictionlessException) as excinfo:
        TableResource.from_descriptor("data/resource-with-missingvalues-993.json")
    error = excinfo.value.error
    reasons = excinfo.value.reasons
    assert error.type == "resource-error"
    assert error.note == "descriptor is not valid"
    assert reasons[0].type == "resource-error"
    assert reasons[0].note == '"missingValues" should be set as "schema.missingValues"'


@pytest.mark.skip
def test_resource_validate_resource_metadata_errors_with_fields_993():
    with pytest.raises(FrictionlessException) as excinfo:
        TableResource.from_descriptor("data/resource-with-fields-993.json")
    error = excinfo.value.error
    reasons = excinfo.value.reasons
    assert error.type == "resource-error"
    assert error.note == "descriptor is not valid"
    assert reasons[0].type == "resource-error"
    assert reasons[0].note == '"fields" should be set as "schema.fields"'
