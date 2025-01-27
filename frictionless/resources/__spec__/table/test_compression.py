import sys

import pytest

from frictionless import FrictionlessException
from frictionless.resources import TableResource

# General


def test_resource_compression_local_csv_zip():
    with TableResource(path="data/table.csv.zip") as resource:
        assert resource.innerpath == "table.csv"
        assert resource.compression == "zip"
        assert resource.header == ["id", "name"]
        assert resource.read_rows() == [
            {"id": 1, "name": "english"},
            {"id": 2, "name": "中国人"},
        ]


def test_resource_compression_local_csv_zip_multiple_files():
    with TableResource(path="data/table-multiple-files.zip", format="csv") as resource:
        assert resource.innerpath == "table-reverse.csv"
        assert resource.compression == "zip"
        assert resource.header == ["id", "name"]
        assert resource.read_rows() == [
            {"id": 1, "name": "中国人"},
            {"id": 2, "name": "english"},
        ]


def test_resource_compression_local_csv_zip_multiple_open():
    resource = TableResource(path="data/table.csv.zip")

    # Open first time
    resource.open()
    assert resource.header == ["id", "name"]
    assert resource.read_rows() == [
        {"id": 1, "name": "english"},
        {"id": 2, "name": "中国人"},
    ]
    resource.close()

    # Open second time
    resource.open()
    assert resource.header == ["id", "name"]
    assert resource.read_rows() == [
        {"id": 1, "name": "english"},
        {"id": 2, "name": "中国人"},
    ]
    resource.close()


def test_resource_compression_local_csv_gz():
    with TableResource(path="data/table.csv.gz") as resource:
        assert resource.compression == "gz"
        assert resource.innerpath is None
        assert resource.header == ["id", "name"]
        assert resource.read_rows() == [
            {"id": 1, "name": "english"},
            {"id": 2, "name": "中国人"},
        ]


def test_resource_compression_local_csv_xz():
    with TableResource(path="data/table.csv.xz") as resource:
        assert resource.compression == "xz"
        assert resource.innerpath is None
        assert resource.header == ["id", "name"]
        assert resource.read_rows() == [
            {"id": 1, "name": "english"},
            {"id": 2, "name": "中国人"},
        ]


def test_resource_compression_local_csv_bz2():
    with TableResource(path="data/table.csv.bz2") as resource:
        assert resource.compression == "bz2"
        assert resource.innerpath is None
        assert resource.header == ["id", "name"]
        assert resource.read_rows() == [
            {"id": 1, "name": "english"},
            {"id": 2, "name": "中国人"},
        ]


def test_resource_compression_stream_csv_zip():
    with open("data/table.csv.zip", "rb") as file:
        with TableResource(data=file, format="csv", compression="zip") as resource:
            assert resource.header == ["id", "name"]
            assert resource.read_rows() == [
                {"id": 1, "name": "english"},
                {"id": 2, "name": "中国人"},
            ]


def test_resource_compression_stream_csv_gz():
    with open("data/table.csv.gz", "rb") as file:
        with TableResource(data=file, format="csv", compression="gz") as resource:
            assert resource.header == ["id", "name"]
            assert resource.read_rows() == [
                {"id": 1, "name": "english"},
                {"id": 2, "name": "中国人"},
            ]


def test_resource_compression_stream_csv_xz():
    with open("data/table.csv.xz", "rb") as file:
        with TableResource(data=file, format="csv", compression="xz") as resource:
            assert resource.header == ["id", "name"]
            assert resource.read_rows() == [
                {"id": 1, "name": "english"},
                {"id": 2, "name": "中国人"},
            ]


def test_resource_compression_stream_csv_bz2():
    with open("data/table.csv.bz2", "rb") as file:
        with TableResource(data=file, format="csv", compression="bz2") as resource:
            assert resource.header == ["id", "name"]
            assert resource.read_rows() == [
                {"id": 1, "name": "english"},
                {"id": 2, "name": "中国人"},
            ]


@pytest.mark.vcr
def test_resource_compression_remote_csv_zip():
    source = "https://raw.githubusercontent.com/frictionlessdata/tabulator-py/master/data/table.csv.zip"
    with TableResource(path=source) as resource:
        assert resource.header == ["id", "name"]
        assert resource.read_rows() == [
            {"id": 1, "name": "english"},
            {"id": 2, "name": "中国人"},
        ]


@pytest.mark.vcr
def test_resource_compression_remote_csv_gz():
    source = "https://raw.githubusercontent.com/frictionlessdata/tabulator-py/master/data/table.csv.gz"
    with TableResource(path=source) as resource:
        assert resource.header == ["id", "name"]
        assert resource.read_rows() == [
            {"id": 1, "name": "english"},
            {"id": 2, "name": "中国人"},
        ]


def test_resource_compression_error_bad():
    resource = TableResource(path="data/table.csv", compression="bad")
    with pytest.raises(FrictionlessException) as excinfo:
        resource.open()
    error = excinfo.value.error
    assert error.type == "compression-error"
    assert error.note == 'compression "bad" is not supported'


def test_resource_compression_error_invalid_zip():
    source = b"id,filename\n1,archive"
    resource = TableResource(data=source, format="csv", compression="zip")
    with pytest.raises(FrictionlessException) as excinfo:
        resource.open()
    error = excinfo.value.error
    assert error.type == "compression-error"
    assert error.note == "File is not a zip file"


@pytest.mark.skipif(sys.version_info < (3, 8), reason="Requires Python3.8+")
def test_resource_compression_error_invalid_gz():
    source = b"id,filename\n\1,dump"
    resource = TableResource(data=source, format="csv", compression="gz")
    with pytest.raises(FrictionlessException) as excinfo:
        resource.open()
    error = excinfo.value.error
    assert error.type == "compression-error"
    assert error.note == "Not a gzipped file (b'id')"


# Bugs


def test_resource_compression_legacy_no_value_framework_v4_issue_616():
    descriptor = {"name": "table", "path": "data/table.csv", "compression": "no"}
    with pytest.warns(UserWarning):
        with TableResource.from_descriptor(descriptor) as resource:
            assert resource.innerpath is None
            assert resource.compression is None
            assert resource.header == ["id", "name"]
            assert resource.read_rows() == [
                {"id": 1, "name": "english"},
                {"id": 2, "name": "中国人"},
            ]
