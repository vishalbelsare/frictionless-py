from __future__ import annotations

import base64
from typing import Any

import attrs

from ..platform import platform
from ..schema import Field


@attrs.define(kw_only=True, repr=False)
class StringField(Field):
    type = "string"
    builtin = True
    supported_constraints = [
        "required",
        "minLength",
        "maxLength",
        "pattern",
        "enum",
    ]

    # Read

    def create_value_reader(self):
        # Uri
        if self.format == "uri":

            def value_reader(cell: Any):
                if not isinstance(cell, str):
                    return None
                uri_validator = platform.rfc3986.validators.Validator()  # type: ignore
                uri_validator.require_presence_of("scheme")  # type: ignore
                uri = platform.rfc3986.uri_reference(cell)  # type: ignore
                try:
                    uri_validator.validate(uri)  # type: ignore
                except platform.rfc3986.exceptions.ValidationError:  # type: ignore
                    return None
                return cell

        # Email
        elif self.format == "email":

            def value_reader(cell: Any):
                if not isinstance(cell, str):
                    return None
                if not platform.validators.email(cell):  # type: ignore
                    return None
                return cell

        # Uuid
        elif self.format == "uuid":

            def value_reader(cell: Any):
                if not isinstance(cell, str):
                    return None
                if not platform.validators.uuid(cell):  # type: ignore
                    return None
                return cell

        # Binary
        elif self.format == "binary":

            def value_reader(cell: Any):
                if not isinstance(cell, str):
                    return None
                try:
                    base64.b64decode(cell)
                except Exception:
                    return None
                return cell

        # WKT
        elif self.format == "wkt":
            parser = platform.wkt.Parser()

            def value_reader(cell: Any):
                if not isinstance(cell, str):
                    return None
                try:
                    parser.parse(cell)
                except Exception:
                    return None
                return cell

        # Default
        else:

            def value_reader(cell: Any):
                if not isinstance(cell, str):
                    return None

                return cell

        return value_reader

    # Write

    def create_value_writer(self):
        # Create writer
        def value_writer(cell: Any):
            return str(cell)

        return value_writer

    # Metadata

    metadata_profile_patch = {
        "properties": {
            "format": {
                "type": "string",
                "enum": ["default", "email", "uri", "binary", "uuid", "wkt"],
            },
        }
    }
