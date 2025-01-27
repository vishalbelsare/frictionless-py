---
script:
  basepath: data
---

# Json Format

Frictionless supports parsing JSON tables (JSON and JSONL/NDJSON).

```bash tabs=CLI
pip install frictionless[json]
pip install 'frictionless[json]' # for zsh shell
```

## Reading Data

> We use the `path` argument to ensure that it will not be guessed to be a metadata file

You can read this format using `Package/Resource`, for example:

```python script tabs=Python
from pprint import pprint
from frictionless import resources

resource = resources.TableResource(path='table.json')
pprint(resource.read_rows())
```

## Writing Data

The same is actual for writing:

```python script tabs=Python
from frictionless import Resource, resources

source = Resource(data=[['id', 'name'], [1, 'english'], [2, 'german']])
target = resources.TableResource(path='table-output.json')
source.write(target)
print(target)
print(target.to_view())
```

## Configuration

There is a dialect to configure how Frictionless read and write files in this format. For example:

```python script tabs=Python
from pprint import pprint
from frictionless import Resource, resources, formats

control=formats.JsonControl(keyed=True)
resource = resources.TableResource(path='table.keyed.json', control=control)
pprint(resource.read_rows())
```

## Reference

```yaml reference
references:
  - frictionless.formats.JsonControl
```
