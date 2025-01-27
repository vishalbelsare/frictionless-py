import datetime

import pytest
import sqlalchemy as sa

from frictionless import Package, formats, platform
from frictionless.resources import TableResource

pytestmark = pytest.mark.skipif(
    platform.type == "windows",
    reason="Duckdb not supported on windows",
)


# General


def test_sql_adapter_types(duckdb_url):
    source = Package("data/storage/types.json")
    source.publish(duckdb_url)
    target = Package(duckdb_url)

    # Assert metadata
    assert target.get_table_resource("types").schema.to_descriptor() == {
        "fields": [
            {"name": "any", "type": "string"},  # type fallback
            {"name": "array", "type": "string"},  # type fallback
            {"name": "boolean", "type": "boolean"},
            {"name": "date", "type": "date"},
            {"name": "date_year", "type": "date"},  # format removal
            {"name": "datetime", "type": "datetime"},
            {"name": "duration", "type": "string"},  # type fallback
            {"name": "geojson", "type": "string"},  # type fallback
            {"name": "geopoint", "type": "string"},  # type fallback
            {"name": "integer", "type": "integer"},
            {"name": "number", "type": "number"},
            {"name": "object", "type": "string"},  # type fallback
            {"name": "string", "type": "string"},
            {"name": "time", "type": "time"},
            {"name": "year", "type": "integer"},  # type downgrade
            {"name": "yearmonth", "type": "string"},  # type fallback
        ],
    }

    # Assert data
    assert target.get_table_resource("types").read_rows() == [
        {
            "any": "中国人",
            "array": '["Mike", "John"]',
            "boolean": True,
            "date": datetime.date(2015, 1, 1),
            "date_year": datetime.date(2015, 1, 1),
            "datetime": datetime.datetime(2015, 1, 1, 3, 0),
            "duration": "P1Y1M",
            "geojson": '{"type": "Point", "coordinates": [33, 33.33]}',
            "geopoint": "30,70",
            "integer": 1,
            "number": 7,
            "object": '{"chars": 560}',
            "string": "english",
            "time": datetime.time(3, 0),
            "year": 2015,
            "yearmonth": "2015-01",
        },
    ]


@pytest.mark.skip
def test_sql_adapter_integrity(duckdb_url):
    source = Package("data/storage/integrity.json")
    source.publish(duckdb_url)
    target = Package(duckdb_url)

    # Assert metadata (main)
    assert target.get_table_resource("integrity_main").schema.to_descriptor() == {
        "fields": [
            {"name": "id", "type": "integer"},
            {"name": "parent", "type": "integer"},
            {"name": "description", "type": "string"},
        ],
        "primaryKey": ["id"],
        "foreignKeys": [
            {"fields": ["parent"], "reference": {"resource": "", "fields": ["id"]}}
        ],
    }

    # Assert metadata (link)
    assert target.get_table_resource("integrity_link").schema.to_descriptor() == {
        "fields": [
            {"name": "main_id", "type": "integer"},
            # removed unique
            {"name": "some_id", "type": "integer"},
            # removed unique
            {"name": "description", "type": "string"},
        ],
        "primaryKey": ["main_id", "some_id"],
        "foreignKeys": [
            {
                "fields": ["main_id"],
                "reference": {"resource": "integrity_main", "fields": ["id"]},
            }
        ],
    }

    # Assert data (main)
    assert target.get_table_resource("integrity_main").read_rows() == [
        {"id": 1, "parent": None, "description": "english"},
        {"id": 2, "parent": 1, "description": "中国人"},
    ]

    # Assert data (link)
    assert target.get_table_resource("integrity_link").read_rows() == [
        {"main_id": 1, "some_id": 1, "description": "note1"},
        {"main_id": 2, "some_id": 2, "description": "note2"},
    ]


@pytest.mark.skip
def test_sql_adapter_constraints(duckdb_url):
    source = Package("data/storage/constraints.json")
    source.publish(duckdb_url)
    target = Package(duckdb_url)

    # Assert metadata
    assert target.get_table_resource("constraints").schema.to_descriptor() == {
        "fields": [
            {"name": "required", "type": "string", "constraints": {"required": True}},
            {"name": "minLength", "type": "string"},  # constraint removal
            {
                "name": "maxLength",
                "type": "string",
                #  "constraints": {"maxLength": 8},
            },
            {"name": "pattern", "type": "string"},  # constraint removal
            {
                "name": "enum",
                "type": "string",
                #  "constraints": {"maxLength": 7},
            },
            {"name": "minimum", "type": "integer"},  # constraint removal
            {"name": "maximum", "type": "integer"},  # constraint removal
        ],
    }

    # Assert data
    assert target.get_table_resource("constraints").read_rows() == [
        {
            "required": "passing",
            "minLength": "passing",
            "maxLength": "passing",
            "pattern": "passing",
            "enum": "passing",
            "minimum": 5,
            "maximum": 5,
        },
    ]


@pytest.mark.skip
@pytest.mark.parametrize(
    "field_name, cell",
    [
        ("required", ""),
        ("minLength", "bad"),
        ("maxLength", "badbadbad"),
        #  ("pattern", "bad"),
        # NOTE: It doesn't raise since sqlalchemy@1.4 (an underlaying bug?)
        # ("enum", "bad"),
        ("minimum", 3),
        ("maximum", 9),
    ],
)
def test_sql_adapter_constraints_not_valid_error(duckdb_url, field_name, cell):
    package = Package("data/storage/constraints.json")
    resource = package.get_table_resource("constraints")
    # We set an invalid cell to the data property
    for index, field in enumerate(resource.schema.fields):
        if field.name == field_name:
            resource.data[1][index] = cell  # type: ignore
    # NOTE: should we wrap these exceptions?
    with pytest.raises(sa.exc.IntegrityError):  # type: ignore
        control = formats.SqlControl(table="table")
        resource.write(path=duckdb_url, control=control)


def test_sql_adapter_views_support(duckdb_url):
    engine = sa.create_engine(duckdb_url)
    with engine.begin() as conn:
        conn.execute(sa.text("CREATE TABLE 'table' (id INTEGER PRIMARY KEY, name TEXT)"))
        conn.execute(sa.text("INSERT INTO 'table' VALUES (1, 'english'), (2, '中国人')"))
        conn.execute(sa.text("CREATE VIEW 'view' AS SELECT * FROM 'table'"))
    with TableResource(
        path=duckdb_url, control=formats.sql.SqlControl(table="view")
    ) as res:
        assert res.schema.to_descriptor() == {
            "fields": [
                {"name": "id", "type": "integer"},
                {"name": "name", "type": "string"},
            ]
        }
        assert res.read_rows() == [
            {"id": 1, "name": "english"},
            {"id": 2, "name": "中国人"},
        ]


def test_sql_adapter_resource_url_argument(duckdb_url):
    source = TableResource(path="data/table.csv")
    control = formats.SqlControl(table="table")
    target = source.write(duckdb_url, control=control)
    with target:
        assert target.schema.to_descriptor() == {
            "fields": [
                {"name": "id", "type": "integer"},
                {"name": "name", "type": "string"},
            ]
        }
        assert target.read_rows() == [
            {"id": 1, "name": "english"},
            {"id": 2, "name": "中国人"},
        ]


def test_sql_adapter_package_url_argument(duckdb_url):
    source = Package(resources=[TableResource(path="data/table.csv")])
    source.infer()
    source.publish(duckdb_url)
    target = Package(duckdb_url)
    assert target.get_table_resource("table").schema.to_descriptor() == {
        "fields": [
            {"name": "id", "type": "integer"},
            {"name": "name", "type": "string"},
        ]
    }
    assert target.get_table_resource("table").read_rows() == [
        {"id": 1, "name": "english"},
        {"id": 2, "name": "中国人"},
    ]


# Bugs


def test_sql_adapter_integer_enum_issue_776(duckdb_url):
    control = formats.SqlControl(table="table")
    source = TableResource(path="data/table.csv")
    source.infer()
    source.schema.get_field("id").constraints["enum"] = [1, 2]
    target = source.write(duckdb_url, control=control)
    assert target.read_rows() == [
        {"id": 1, "name": "english"},
        {"id": 2, "name": "中国人"},
    ]


# TODO: recover
@pytest.mark.skip
def test_sql_adapter_dialect_basepath_issue_964(duckdb_url):
    control = formats.SqlControl(table="test_table", basepath="data")
    with TableResource(path="sqlite:///sqlite.db", control=control) as resource:
        assert resource.read_rows() == [
            {"id": 1, "name": "foo"},
            {"id": 2, "name": "bar"},
            {"id": 3, "name": "baz"},
        ]


@pytest.mark.ci
def test_sql_adapter_max_parameters_issue_1196(duckdb_url, sqlite_max_variable_number):
    # SQLite applies limits for the max. number of characters in prepared
    # parameterized SQL statements, see https://www.sqlite.org/limits.html.

    # Ensure sufficiently 'wide' and 'long' table data to provoke SQLite param
    # restrictions.
    buffer_size = 1000  # see formats/sql/storage.py
    number_of_rows = 10 * buffer_size
    number_of_fields = divmod(sqlite_max_variable_number, buffer_size)[0] + 1
    assert number_of_fields * buffer_size > sqlite_max_variable_number

    # Create in-memory string csv test data.
    data = "\n".join(
        [
            ",".join(f"header{i}" for i in range(number_of_fields)),
            "\n".join(
                ",".join(f"row{r}_col{c}" for c in range(number_of_fields))
                for r in range(number_of_rows)
            ),
        ]
    ).encode("ascii")

    # Write to the SQLite db. This must not raise an exception i.e. test is
    # successful if it runs without error.
    with TableResource(data=data, format="csv") as resource:
        resource.write(
            duckdb_url, control=formats.SqlControl(table="test_max_param_table")
        )
