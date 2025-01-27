from frictionless import Pipeline, steps
from frictionless.resources import TableResource

# General


def test_resource_transform_bound_pipeline():
    pipeline = Pipeline(steps=[steps.cell_set(field_name="population", value=100)])
    source = TableResource(path="data/transform.csv")
    target = source.transform(pipeline)
    assert target.schema.to_descriptor() == {
        "fields": [
            {"name": "id", "type": "integer"},
            {"name": "name", "type": "string"},
            {"name": "population", "type": "integer"},
        ]
    }
    assert target.read_rows() == [
        {"id": 1, "name": "germany", "population": 100},
        {"id": 2, "name": "france", "population": 100},
        {"id": 3, "name": "spain", "population": 100},
    ]
