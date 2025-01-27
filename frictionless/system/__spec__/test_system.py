import sys

import pytest
import requests

from frictionless import schemes, system
from frictionless.resources import TableResource

BASEURL = "https://raw.githubusercontent.com/frictionlessdata/frictionless-py/master/%s"


# General


@pytest.mark.vcr
@pytest.mark.skipif(sys.version_info < (3, 10), reason="pytest-vcr bug in Python3.8/9")
def test_system_use_context_http_session():
    session = requests.Session()
    with system.use_context(http_session=session):
        assert system.http_session is session
        with TableResource(path=BASEURL % "data/table.csv") as resource:
            control = resource.dialect.get_control("remote")
            assert isinstance(control, schemes.RemoteControl)
            assert resource.header == ["id", "name"]
    assert system.http_session is not session
