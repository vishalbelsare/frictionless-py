import datetime

import pytest
import sqlalchemy as sa

from frictionless import Package, formats, platform
from frictionless.resources import TableResource

# General


@pytest.mark.skipif(platform.type == "darwin", reason="Skip SQL test in MacOS")
@pytest.mark.skipif(platform.type == "windows", reason="Skip SQL test in Windows")
def test_sql_adapter_mysql_types(mysql_url):
    source = Package("data/storage/types.json")
    source.publish(mysql_url)
    target = Package(mysql_url)

    # Assert metadata
    assert target.get_table_resource("types").schema.to_descriptor() == {
        "fields": [
            {"name": "any", "type": "string"},  # type fallback
            {"name": "array", "type": "string"},  # type fallback
            {"name": "boolean", "type": "integer"},  # type downgrade
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


@pytest.mark.skipif(platform.type == "darwin", reason="Skip SQL test in MacOS")
@pytest.mark.skipif(platform.type == "windows", reason="Skip SQL test in Windows")
def test_sql_adapter_mysql_integrity(mysql_url):
    source = Package("data/storage/integrity.json")
    source.publish(mysql_url)
    target = Package(mysql_url)

    # Assert metadata (main)
    assert target.get_table_resource("integrity_main").schema.to_descriptor() == {
        "fields": [
            # added required
            {"name": "id", "type": "integer", "constraints": {"required": True}},
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
            # added required
            {"name": "main_id", "type": "integer", "constraints": {"required": True}},
            # added required; removed unique
            {"name": "some_id", "type": "integer", "constraints": {"required": True}},
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


@pytest.mark.skipif(platform.type == "darwin", reason="Skip SQL test in MacOS")
@pytest.mark.skipif(platform.type == "windows", reason="Skip SQL test in Windows")
def test_sql_adapter_mysql_constraints(mysql_url):
    source = Package("data/storage/constraints.json")
    source.publish(mysql_url)
    target = Package(mysql_url)

    # Assert metadata
    assert target.get_table_resource("constraints").schema.to_descriptor() == {
        "fields": [
            {"name": "required", "type": "string", "constraints": {"required": True}},
            {"name": "minLength", "type": "string"},  # constraint removal
            {
                "name": "maxLength",
                "type": "string",
                "constraints": {"maxLength": 8},
            },
            {"name": "pattern", "type": "string"},  # constraint removal
            {
                "name": "enum",
                "type": "string",
                "constraints": {"enum": ["passing"]},
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


@pytest.mark.parametrize(
    "field_name, cell",
    [
        ("required", ""),
        ("minLength", "bad"),
        ("maxLength", "badbadbad"),
        ("pattern", "bad"),
        ("enum", "bad"),
        ("minimum", 3),
        ("maximum", 9),
    ],
)
@pytest.mark.skipif(platform.type == "darwin", reason="Skip SQL test in MacOS")
@pytest.mark.skipif(platform.type == "windows", reason="Skip SQL test in Windows")
def test_sql_adapter_mysql_constraints_not_valid_error(mysql_url, field_name, cell):
    package = Package("data/storage/constraints.json")
    resource = package.get_table_resource("constraints")
    # We set an invalid cell to the data property
    for index, field in enumerate(resource.schema.fields):
        if field.name == field_name:
            resource.data[1][index] = cell  # type: ignore
    # NOTE: should we wrap these exceptions? (why other exceptions for mysql here?)
    types = (sa.exc.IntegrityError, sa.exc.OperationalError, sa.exc.DataError)  # type: ignore
    with pytest.raises(types):
        control = formats.SqlControl(table="table")
        resource.write(mysql_url, control=control)


@pytest.mark.skipif(platform.type == "darwin", reason="Skip SQL test in MacOS")
@pytest.mark.skipif(platform.type == "windows", reason="Skip SQL test in Windows")
def test_sql_adapter_mysql_views_support(mysql_url):
    engine = sa.create_engine(mysql_url)
    with engine.begin() as conn:
        conn.execute(sa.text("DROP VIEW IF EXISTS view"))
        conn.execute(sa.text("DROP TABLE IF EXISTS data"))
        conn.execute(sa.text("CREATE TABLE data (id INTEGER PRIMARY KEY, name TEXT)"))
        conn.execute(sa.text("INSERT INTO data VALUES (1, 'english'), (2, '中国人')"))
        conn.execute(sa.text("CREATE VIEW view AS SELECT * FROM data"))
    with TableResource(
        path=mysql_url, control=formats.sql.SqlControl(table="view")
    ) as resource:
        assert resource.schema.to_descriptor() == {
            "fields": [
                {"name": "id", "type": "integer"},
                {"name": "name", "type": "string"},
            ]
        }
        assert resource.read_rows() == [
            {"id": 1, "name": "english"},
            {"id": 2, "name": "中国人"},
        ]


@pytest.mark.skipif(platform.type == "darwin", reason="Skip SQL test in MacOS")
@pytest.mark.skipif(platform.type == "windows", reason="Skip SQL test in Windows")
def test_sql_adapter_mysql_comment_support(mysql_url):
    control = formats.SqlControl(table="table")

    # Write
    source = TableResource(path="data/table.csv")
    source.infer()
    source.schema.get_field("id").description = "integer field"
    source.schema.get_field("name").description = "string field"
    source.write(mysql_url, control=control)

    # Read
    target = TableResource(path=mysql_url, control=control)
    with target:
        assert target.schema.to_descriptor() == {
            "fields": [
                {"name": "id", "type": "integer", "description": "integer field"},
                {"name": "name", "type": "string", "description": "string field"},
            ]
        }
        assert target.read_rows() == [
            {"id": 1, "name": "english"},
            {"id": 2, "name": "中国人"},
        ]
