(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{109:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return s})),r.d(t,"metadata",(function(){return c})),r.d(t,"toc",(function(){return l})),r.d(t,"default",(function(){return d}));var n=r(3),a=r(8),o=(r(0),r(161)),i=["components"],s={title:"Resource Guide",goodread:{cleanup:["rm resource.json","rm resource.yaml"]}},c={unversionedId:"guides/framework/resource-guide",id:"guides/framework/resource-guide",isDocsHomePage:!1,title:"Resource Guide",description:"The Resource class is arguable the most important class of the whole Frictionless Framework. It's based on Data Resource Spec and  Tabular Data Resource Spec",source:"@site/../docs/guides/framework/resource-guide.md",slug:"/guides/framework/resource-guide",permalink:"/docs/guides/framework/resource-guide",editUrl:"https://github.com/frictionlessdata/frictionless-py/edit/main/docs/../docs/guides/framework/resource-guide.md",version:"current",lastUpdatedBy:"roll",lastUpdatedAt:1622704754,formattedLastUpdatedAt:"6/3/2021",sidebar:"guides",previous:{title:"Package Guide",permalink:"/docs/guides/framework/package-guide"},next:{title:"Schema Guide",permalink:"/docs/guides/framework/schema-guide"}},l=[{value:"Creating Resource",id:"creating-resource",children:[]},{value:"Describing Resource",id:"describing-resource",children:[]},{value:"Saving Descriptor",id:"saving-descriptor",children:[]},{value:"Resource Lifecycle",id:"resource-lifecycle",children:[]},{value:"Reading Data",id:"reading-data",children:[]},{value:"File Details",id:"file-details",children:[{value:"Scheme",id:"scheme",children:[]},{value:"Format",id:"format",children:[]},{value:"Hashing",id:"hashing",children:[]},{value:"Encoding",id:"encoding",children:[]},{value:"Innerpath",id:"innerpath",children:[]},{value:"Compression",id:"compression",children:[]},{value:"Control",id:"control",children:[]},{value:"Dialect",id:"dialect",children:[]}]},{value:"Table Details",id:"table-details",children:[{value:"Layout",id:"layout",children:[]},{value:"Schema",id:"schema",children:[]},{value:"Stats",id:"stats",children:[]}]},{value:"Resource Options",id:"resource-options",children:[{value:"Basepath",id:"basepath",children:[]},{value:"Detector",id:"detector",children:[]},{value:"Onerror",id:"onerror",children:[]},{value:"Trusted",id:"trusted",children:[]}]}],p={toc:l};function d(e){var t=e.components,r=Object(a.a)(e,i);return Object(o.b)("wrapper",Object(n.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"The Resource class is arguable the most important class of the whole Frictionless Framework. It's based on ",Object(o.b)("a",{parentName:"p",href:"https://specs.frictionlessdata.io/data-resource/"},"Data Resource Spec")," and  ",Object(o.b)("a",{parentName:"p",href:"https://specs.frictionlessdata.io/data-resource/"},"Tabular Data Resource Spec")),Object(o.b)("h2",{id:"creating-resource"},"Creating Resource"),Object(o.b)("p",null,"Let's create a data resource:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\n\nresource = Resource('data/table.csv') # from a resource path\nresource = Resource('data/resource.json') # from a descriptor path\nresource = Resource({'path': 'data/table.csv'}) # from a descriptor\nresource = Resource(path='data/table.csv') # from arguments\n")),Object(o.b)("p",null,"As you can see it's possible to create a resource providing different kinds of sources which will be detector to have some type automatically (e.g. whether it's a descriptor or a path). It's possible to make this step more explicit:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\n\nresource = Resource(path='data/table.csv') # from a path\nresource = Resource(descriptor='data/resource.json') # from a descriptor\n")),Object(o.b)("h2",{id:"describing-resource"},"Describing Resource"),Object(o.b)("p",null,"The specs support a great deal of resource metadata which is possible to have with Frictionless Framework too:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\n\nresource = Resource(\n    name='resource',\n    title='My Resource',\n    description='My Resource for the Guide',\n    path='data/table.csv',\n    # it's possible to provide all the official properties like mediatype, etc\n)\n")),Object(o.b)("p",null,"If you have created a resource, for example, from a descriptor you can access this properties:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\n\nresource = Resource('data/resource.json')\nresource.name\nresource.title\nresource.description\n# and others\n")),Object(o.b)("p",null,"And edit them:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\n\nresource = Resource('data/resource.json')\nresource.name = 'new-name'\nresource.title = 'New Title'\nresource.description = 'New Description'\n# and others\n")),Object(o.b)("h2",{id:"saving-descriptor"},"Saving Descriptor"),Object(o.b)("p",null,"As any of the Metadata classes the Resource class can be saved as JSON or YAML:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\nresource = Resource('data/table.csv')\nresource.to_json('resource.json') # Save as JSON\nresource.to_yaml('resource.yaml') # Save as YAML\n")),Object(o.b)("h2",{id:"resource-lifecycle"},"Resource Lifecycle"),Object(o.b)("p",null,"You might have noticed that we had to duplicate the ",Object(o.b)("inlineCode",{parentName:"p"},"with Resource(...)")," statement in some examples. The reason is that Resource is a streaming interface. Once it's read you need to open it again. Let's show it in an example:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from pprint import pprint\nfrom frictionless import Resource\n\nresource = Resource('data/capital-3.csv')\nresource.open()\npprint(resource.read_rows())\npprint(resource.read_rows())\n# We need to re-open: there is no data left\nresource.open()\npprint(resource.read_rows())\n# We need to close manually: not context manager is used\nresource.close()\n")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"[{'id': 1, 'name': 'London'},\n {'id': 2, 'name': 'Berlin'},\n {'id': 3, 'name': 'Paris'},\n {'id': 4, 'name': 'Madrid'},\n {'id': 5, 'name': 'Rome'}]\n[]\n[{'id': 1, 'name': 'London'},\n {'id': 2, 'name': 'Berlin'},\n {'id': 3, 'name': 'Paris'},\n {'id': 4, 'name': 'Madrid'},\n {'id': 5, 'name': 'Rome'}]\n")),Object(o.b)("p",null,"At the same you can read data for a resource without opening and closing it explicitly. In this case Frictionless Framework will open and close the resource for you so it will be basically a one-time operation:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\n\nresource = Resource('data/capital-3.csv')\npprint(resource.read_rows())\n")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"[{'id': 1, 'name': 'London'},\n {'id': 2, 'name': 'Berlin'},\n {'id': 3, 'name': 'Paris'},\n {'id': 4, 'name': 'Madrid'},\n {'id': 5, 'name': 'Rome'}]\n")),Object(o.b)("h2",{id:"reading-data"},"Reading Data"),Object(o.b)("p",null,"The Resource class is also a metadata class which provides various read and stream functions. The ",Object(o.b)("inlineCode",{parentName:"p"},"extract")," functions always read rows into memory; Resource can do the same but it also gives a choice regarding output data. It can be ",Object(o.b)("inlineCode",{parentName:"p"},"rows"),", ",Object(o.b)("inlineCode",{parentName:"p"},"data"),", ",Object(o.b)("inlineCode",{parentName:"p"},"text"),", or ",Object(o.b)("inlineCode",{parentName:"p"},"bytes"),". Let's try reading all of them:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\n\nresource = Resource('data/country-3.csv')\npprint(resource.read_bytes())\npprint(resource.read_text())\npprint(resource.read_lists())\npprint(resource.read_rows())\n")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"(b'id,capital_id,name,population\\n1,1,Britain,67\\n2,3,France,67\\n3,2,Germany,8'\n b'3\\n4,5,Italy,60\\n5,4,Spain,47\\n')\n('id,capital_id,name,population\\n'\n '1,1,Britain,67\\n'\n '2,3,France,67\\n'\n '3,2,Germany,83\\n'\n '4,5,Italy,60\\n'\n '5,4,Spain,47\\n')\n[['id', 'capital_id', 'name', 'population'],\n ['1', '1', 'Britain', '67'],\n ['2', '3', 'France', '67'],\n ['3', '2', 'Germany', '83'],\n ['4', '5', 'Italy', '60'],\n ['5', '4', 'Spain', '47']]\n[{'id': 1, 'capital_id': 1, 'name': 'Britain', 'population': 67},\n {'id': 2, 'capital_id': 3, 'name': 'France', 'population': 67},\n {'id': 3, 'capital_id': 2, 'name': 'Germany', 'population': 83},\n {'id': 4, 'capital_id': 5, 'name': 'Italy', 'population': 60},\n {'id': 5, 'capital_id': 4, 'name': 'Spain', 'population': 47}]\n")),Object(o.b)("p",null,"It's really handy to read all your data into memory but it's not always possible if a file is really big. For such cases, Frictionless provides streaming functions:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\n\nwith Resource('data/country-3.csv') as resource:\n    pprint(resource.byte_stream)\n    pprint(resource.text_stream)\n    pprint(resource.list_stream)\n    pprint(resource.row_stream)\n    for row in resource.row_stream:\n      print(row)\n")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"<frictionless.loader.ByteStreamWithStatsHandling object at 0x7ff1d141b2e0>\n<_io.TextIOWrapper name='data/country-3.csv' encoding='utf-8'>\n<itertools.chain object at 0x7ff1d1427040>\n<generator object Resource.__read_row_stream.<locals>.row_stream at 0x7ff1d1483510>\n{'id': 1, 'capital_id': 1, 'name': 'Britain', 'population': 67}\n{'id': 2, 'capital_id': 3, 'name': 'France', 'population': 67}\n{'id': 3, 'capital_id': 2, 'name': 'Germany', 'population': 83}\n{'id': 4, 'capital_id': 5, 'name': 'Italy', 'population': 60}\n{'id': 5, 'capital_id': 4, 'name': 'Spain', 'population': 47}\n")),Object(o.b)("h2",{id:"file-details"},"File Details"),Object(o.b)("p",null,"Let's overview the details we can specify for a file. Usually you don't need to provide those details as Frictionless is capable to infer it on its own. Although, there are situation when you need to specify it manually. The following example will use the ",Object(o.b)("inlineCode",{parentName:"p"},"Resource")," class but the same options can be used for the ",Object(o.b)("inlineCode",{parentName:"p"},"extract")," and ",Object(o.b)("inlineCode",{parentName:"p"},"extract_table")," functions."),Object(o.b)("h3",{id:"scheme"},"Scheme"),Object(o.b)("p",null,"The scheme also know as protocol indicates which loader Frictionless should use to read or write data. It can be ",Object(o.b)("inlineCode",{parentName:"p"},"file")," (default), ",Object(o.b)("inlineCode",{parentName:"p"},"text"),", ",Object(o.b)("inlineCode",{parentName:"p"},"http"),", ",Object(o.b)("inlineCode",{parentName:"p"},"https"),", ",Object(o.b)("inlineCode",{parentName:"p"},"s3"),", and others."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\n\nwith Resource(b'header1,header2\\nvalue1,value2', format='csv') as resource:\n  print(resource.scheme)\n  print(resource.read_rows())\n")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"buffer\n[{'header1': 'value1', 'header2': 'value2'}]\n")),Object(o.b)("h3",{id:"format"},"Format"),Object(o.b)("p",null,"The format or as it's also called extension helps Frictionless to choose a proper parser to handle the file. Popular formats are ",Object(o.b)("inlineCode",{parentName:"p"},"csv"),", ",Object(o.b)("inlineCode",{parentName:"p"},"xlsx"),", ",Object(o.b)("inlineCode",{parentName:"p"},"json")," and others"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\n\nwith Resource(b'header1,header2\\nvalue1,value2.csv', format='csv') as resource:\n  print(resource.format)\n  print(resource.read_rows())\n")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"csv\n[{'header1': 'value1', 'header2': 'value2.csv'}]\n")),Object(o.b)("h3",{id:"hashing"},"Hashing"),Object(o.b)("p",null,"The hashing option controls which hashing algorithm should be used for generating the ",Object(o.b)("inlineCode",{parentName:"p"},"hash")," property. It doesn't affect the ",Object(o.b)("inlineCode",{parentName:"p"},"extract")," function but can be used with the ",Object(o.b)("inlineCode",{parentName:"p"},"Resource")," class:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\n\nwith Resource('data/country-3.csv', hashing='sha256') as resource:\n  resource.read_rows()\n  print(resource.hashing)\n  print(resource.stats['hash'])\n")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"sha256\n408b5058f961915c1e1f3bc318ab01d7d094a4daccdf03ad6022cfc7b8ea4e3e\n")),Object(o.b)("h3",{id:"encoding"},"Encoding"),Object(o.b)("p",null,"Frictionless automatically detects encoding of files but sometimes it can be inaccurate. It's possible to provide an encoding manually:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\n\nwith Resource('data/country-3.csv', encoding='utf-8') as resource:\n  print(resource.encoding)\n  print(resource.path)\n")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"utf-8\ndata/country-3.csv\n")),Object(o.b)("h3",{id:"innerpath"},"Innerpath"),Object(o.b)("p",null,"By default, Frictionless uses the first file found in a zip archive. It's possible to adjust this behaviour:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\n\nwith Resource('data/table-multiple-files.zip', innerpath='table-reverse.csv') as resource:\n  print(resource.compression)\n  print(resource.innerpath)\n  print(resource.read_rows())\n")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"zip\ntable-reverse.csv\n[{'id': 1, 'name': '\u4e2d\u56fd\u4eba'}, {'id': 2, 'name': 'english'}]\n")),Object(o.b)("h3",{id:"compression"},"Compression"),Object(o.b)("p",null,"It's possible to adjust compression detection by providing the algorithm explicitly. For the example below it's not required as it would be detected anyway:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\n\nwith Resource('data/table.csv.zip', compression='zip') as resource:\n  print(resource.compression)\n  print(resource.read_rows())\n")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"zip\n[{'id': 1, 'name': 'english'}, {'id': 2, 'name': '\u4e2d\u56fd\u4eba'}]\n")),Object(o.b)("h3",{id:"control"},"Control"),Object(o.b)("p",null,"The Control object allows you to manage the loader used by the Resource class. In most cases, you don't need to provide any Control settings but sometimes it can be useful:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\nfrom frictionless.plugins.remote import RemoteControl\n\nsource = 'https://raw.githubusercontent.com/frictionlessdata/frictionless-py/master/data/table.csv'\ncontrol = RemoteControl(http_timeout=10)\nwith Resource(source, control=control) as resource:\n  print(resource.control)\n  print(resource.read_rows())\n")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"{'httpTimeout': 10}\n[{'id': 1, 'name': 'english'}, {'id': 2, 'name': '\u4e2d\u56fd\u4eba'}]\n")),Object(o.b)("p",null,'Exact parameters depend on schemes and can be found in the "Schemes Reference". For example, the Remote Control provides ',Object(o.b)("inlineCode",{parentName:"p"},"http_timeout"),", ",Object(o.b)("inlineCode",{parentName:"p"},"http_session"),", and others but there is only one option available for all controls:"),Object(o.b)("h3",{id:"dialect"},"Dialect"),Object(o.b)("p",null,"The Dialect adjusts the way the parsers work. The concept is similar to the Control above. Let's use the CSV Dialect to adjust the delimiter configuration:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\nfrom frictionless.plugins.csv import CsvDialect\n\nsource = b'header1;header2\\nvalue1;value2'\ndialect = CsvDialect(delimiter=';')\nwith Resource(source, format='csv', dialect=dialect) as resource:\n  print(resource.dialect)\n  print(resource.read_rows())\n")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"{'delimiter': ';'}\n[{'header1': 'value1', 'header2': 'value2'}]\n")),Object(o.b)("p",null,'There are a great deal of options available for different dialects that can be found in "Formats Reference". We will list the properties that can be used with every dialect:'),Object(o.b)("h2",{id:"table-details"},"Table Details"),Object(o.b)("p",null,"The core concepts for tabular resource are Layout and Schema."),Object(o.b)("h3",{id:"layout"},"Layout"),Object(o.b)("p",null,"Please read ",Object(o.b)("a",{parentName:"p",href:"/docs/guides/framework/layout-guide"},"Layout Guide")," for more information."),Object(o.b)("h3",{id:"schema"},"Schema"),Object(o.b)("p",null,"Please read ",Object(o.b)("a",{parentName:"p",href:"/docs/guides/framework/schema-guide"},"Schema Guide")," for more information."),Object(o.b)("h3",{id:"stats"},"Stats"),Object(o.b)("p",null,"Resource's stats can be accessed with ",Object(o.b)("inlineCode",{parentName:"p"},"resource.stats"),":"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Resource\n\nresource = Resource('data/table.csv')\nresource.infer(stats=True)\nprint(resource.stats)\n")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"{'hash': '6c2c61dd9b0e9c6876139a449ed87933', 'bytes': 30, 'fields': 2, 'rows': 2}\n")),Object(o.b)("h2",{id:"resource-options"},"Resource Options"),Object(o.b)("p",null,"Extraction function and classes accepts a few options that are needed to manage integrity behaviour:"),Object(o.b)("h3",{id:"basepath"},"Basepath"),Object(o.b)("p",null,"Will make all the paths treated as relative to this path."),Object(o.b)("h3",{id:"detector"},"Detector"),Object(o.b)("p",null,Object(o.b)("a",{parentName:"p",href:"/docs/guides/framework/detector-guide"},"Detector")," object to tweak metadata detection."),Object(o.b)("h3",{id:"onerror"},"Onerror"),Object(o.b)("p",null,"This option accept one of the three possible values configuring an ",Object(o.b)("inlineCode",{parentName:"p"},"extract"),", ",Object(o.b)("inlineCode",{parentName:"p"},"Resou"),", ",Object(o.b)("inlineCode",{parentName:"p"},"Resource")," or ",Object(o.b)("inlineCode",{parentName:"p"},"Package")," behaviour if there is an error during the row reading process:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"ignore (default)"),Object(o.b)("li",{parentName:"ul"},"warn"),Object(o.b)("li",{parentName:"ul"},"raise")),Object(o.b)("p",null,"Let's investigate how we can add warnings on all header/row errors:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python",metastring:'title="Python"',title:'"Python"'},'from frictionless import Resource\n\ndata = [["name"], [1], [2], [3]]\nschema = {"fields": [{"name": "name", "type": "string"}]}\nwith  Resource(data, schema=schema, onerror="warn") as table:\n  table.read_rows()\n')),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},'/home/roll/projects/frictionless-py/frictionless/table.py:771: UserWarning: The cell "1" in row at position "2" and field "name" at position "1" has incompatible type: type is "string/default"\n  warnings.warn(error.message, UserWarning)\n/home/roll/projects/frictionless-py/frictionless/table.py:771: UserWarning: The cell "2" in row at position "3" and field "name" at position "1" has incompatible type: type is "string/default"\n  warnings.warn(error.message, UserWarning)\n/home/roll/projects/frictionless-py/frictionless/table.py:771: UserWarning: The cell "3" in row at position "4" and field "name" at position "1" has incompatible type: type is "string/default"\n  warnings.warn(error.message, UserWarning)\n')),Object(o.b)("p",null,"In some cases, we need to fail on the first error. We will use ",Object(o.b)("inlineCode",{parentName:"p"},"raise")," for it:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-python"},'from frictionless import Resource\n\ndata = [["name"], [1], [2], [3]]\nschema = {"fields": [{"name": "name", "type": "string"}]}\nresource = Resource(data=data, schema=schema)\nresource.onerror = \'raise\' # for Resource/Package it\'s possible to set this property after initialization\ntry:\n  resource.read_rows()\nexcept Exception as exception:\n  print(exception)\n')),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},'[type-error] The cell "1" in row at position "2" and field "name" at position "1" has incompatible type: type is "string/default"\n')),Object(o.b)("h3",{id:"trusted"},"Trusted"),Object(o.b)("p",null,"By default an error will be reaised on ",Object(o.b)("a",{parentName:"p",href:"https://specs.frictionlessdata.io/data-resource/#url-or-path"},"unsafe paths"),". Setting ",Object(o.b)("inlineCode",{parentName:"p"},"trusted")," to ",Object(o.b)("inlineCode",{parentName:"p"},"True")," will disable this behaviour."))}d.isMDXComponent=!0},161:function(e,t,r){"use strict";r.d(t,"a",(function(){return d})),r.d(t,"b",(function(){return m}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=a.a.createContext({}),p=function(e){var t=a.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},d=function(e){var t=p(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=p(r),b=n,m=d["".concat(i,".").concat(b)]||d[b]||u[b]||o;return r?a.a.createElement(m,s(s({ref:t},l),{},{components:r})):a.a.createElement(m,s({ref:t},l))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=b;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var l=2;l<o;l++)i[l]=r[l];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"}}]);