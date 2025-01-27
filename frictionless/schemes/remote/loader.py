from __future__ import annotations

import io
from typing import TYPE_CHECKING, Optional

from ... import types
from ...platform import platform
from ...system import Loader, system
from .control import RemoteControl

if TYPE_CHECKING:
    from requests import Session


class RemoteLoader(Loader):
    """Remote loader implementation."""

    remote = True

    # Read

    def read_byte_stream_create(self):  # type: ignore
        assert self.resource.normpath
        path = platform.requests_utils.requote_uri(self.resource.normpath)
        control = RemoteControl.from_dialect(self.resource.dialect)
        session = system.http_session
        timeout = control.http_timeout
        byte_stream = RemoteByteStream(path, session=session, timeout=timeout).open()
        if control.http_preload:
            buffer = io.BufferedRandom(io.BytesIO())  # type: ignore
            buffer.write(byte_stream.read())
            buffer.seek(0)
            byte_stream = buffer
        return byte_stream

    # Write

    def write_byte_stream_save(self, byte_stream: types.IByteStream):
        assert self.resource.normpath
        file = f"{self.resource.name}.{self.resource.format}"
        url = self.resource.normpath.replace(file, "")
        response = system.http_session.post(url, files={file: byte_stream})
        response.raise_for_status()
        return response


# Internal


class RemoteByteStream:
    def __init__(self, source: str, *, session: Session, timeout: int):
        self.__source = source
        self.__session = session
        self.__timeout = timeout

    def __iter__(self):  # type: ignore
        while True:
            bytes = self.read(8192)
            if not bytes:
                break
            yield from bytes.splitlines(keepends=True)

    def readable(self):
        return True

    def writable(self):
        return False

    def seekable(self):
        return True

    @property
    def closed(self):
        return self.__closed

    def open(self):
        self.__closed = False
        self.seek(0)
        return self

    def close(self):
        self.__closed = True

    def tell(self):
        return self.__response.raw.tell()

    def flush(self):
        pass

    def read(self, size: Optional[int] = -1):
        if size == -1:
            size = None
        return self.__response.raw.read(size)

    def read1(self, size: int = -1):
        return self.read(size)

    def seek(self, offset: int, whence: int = 0):
        assert offset == 0
        assert whence == 0
        self.__response = self.__session.get(
            self.__source, stream=True, timeout=self.__timeout
        )
        self.__response.raise_for_status()
        self.__response.raw.decode_content = True
