(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{113:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return s})),a.d(t,"toc",(function(){return l})),a.d(t,"default",(function(){return d}));var n=a(3),r=a(8),i=(a(0),a(161)),o=["components"],c={title:"Extracting Data",prepare:["cp data/country-3.csv country-3.csv","cp data/capital-3.csv capital-3.csv"],cleanup:["rm country-3.csv","rm capital-3.csv","rm country.package.json","rm capital.resource.yaml"]},s={unversionedId:"guides/extracting-data",id:"guides/extracting-data",isDocsHomePage:!1,title:"Extracting Data",description:"This guide assumes basic familiarity with the Frictionless Framework. To learn more, please read the Introduction and Quick Start.",source:"@site/../docs/guides/extracting-data.md",slug:"/guides/extracting-data",permalink:"/docs/guides/extracting-data",editUrl:"https://github.com/frictionlessdata/frictionless-py/edit/main/docs/../docs/guides/extracting-data.md",version:"current",lastUpdatedBy:"roll",lastUpdatedAt:1635845287,formattedLastUpdatedAt:"11/2/2021",sidebar:"guides",previous:{title:"Describing Data",permalink:"/docs/guides/describing-data"},next:{title:"Validation Guide",permalink:"/docs/guides/validation-guide"}},l=[{value:"Extract Functions",id:"extract-functions",children:[]},{value:"Extracting a Resource",id:"extracting-a-resource",children:[]},{value:"Extracting a Package",id:"extracting-a-package",children:[]},{value:"Resource Class",id:"resource-class",children:[{value:"Reading Bytes",id:"reading-bytes",children:[]},{value:"Reading Text",id:"reading-text",children:[]},{value:"Reading Lists",id:"reading-lists",children:[]},{value:"Reading Rows",id:"reading-rows",children:[]},{value:"Reading a Header",id:"reading-a-header",children:[]},{value:"Streaming Interfaces",id:"streaming-interfaces",children:[]}]},{value:"Package Class",id:"package-class",children:[]},{value:"Header Class",id:"header-class",children:[]},{value:"Row Class",id:"row-class",children:[]}],p={toc:l};function d(e){var t=e.components,a=Object(r.a)(e,o);return Object(i.b)("wrapper",Object(n.a)({},p,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"This guide assumes basic familiarity with the Frictionless Framework. To learn more, please read the ",Object(i.b)("a",{parentName:"p",href:"https://framework.frictionlessdata.io/docs/guides/introduction"},"Introduction")," and ",Object(i.b)("a",{parentName:"p",href:"https://framework.frictionlessdata.io/docs/guides/quick-start"},"Quick Start"),".")),Object(i.b)("p",null,"Extracting data means reading tabular data from a source. We can use various customizations for this process such as providing a file format, table schema, limiting fields or rows amount, and much more. This guide will discuss the main ",Object(i.b)("inlineCode",{parentName:"p"},"extract")," functions (",Object(i.b)("inlineCode",{parentName:"p"},"extract"),", ",Object(i.b)("inlineCode",{parentName:"p"},"extract_resource"),", ",Object(i.b)("inlineCode",{parentName:"p"},"extract_package"),") and will then go into more advanced details about the ",Object(i.b)("inlineCode",{parentName:"p"},"Resource Class"),", ",Object(i.b)("inlineCode",{parentName:"p"},"Package Class"),", ",Object(i.b)("inlineCode",{parentName:"p"},"Header Class"),", and ",Object(i.b)("inlineCode",{parentName:"p"},"Row Class"),"."),Object(i.b)("p",null,"Let's see this with some real files:"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Download ",Object(i.b)("a",{parentName:"p",href:"https://raw.githubusercontent.com/frictionlessdata/frictionless-py/master/data/country-3.csv"},Object(i.b)("inlineCode",{parentName:"a"},"country-3.csv")),' to reproduce the examples (right-click and "Save link as").')),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash",metastring:'script title="CLI"',script:!0,title:'"CLI"'},"cat country-3.csv\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-csv",metastring:'title="country-3.csv"',title:'"country-3.csv"'},"id,capital_id,name,population\n1,1,Britain,67\n2,3,France,67\n3,2,Germany,83\n4,5,Italy,60\n5,4,Spain,47\n")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Download ",Object(i.b)("a",{parentName:"p",href:"https://raw.githubusercontent.com/frictionlessdata/frictionless-py/master/data/capital-3.csv"},Object(i.b)("inlineCode",{parentName:"a"},"capital-3.csv")),' to reproduce the examples (right-click and "Save link as").')),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash",metastring:'script title="CLI"',script:!0,title:'"CLI"'},"cat capital-3.csv\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-csv",metastring:'title="capital-3.csv"',title:'"capital-3.csv"'},"id,name\n1,London\n2,Berlin\n3,Paris\n4,Madrid\n5,Rome\n")),Object(i.b)("p",null,"To start, we will use the command-line interface:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash",metastring:'script title="CLI"',script:!0,title:'"CLI"'},"frictionless extract country-3.csv\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"# ----\n# data: country-3.csv\n# ----\n\n==  ==========  =======  ==========\nid  capital_id  name     population\n==  ==========  =======  ==========\n 1           1  Britain          67\n 2           3  France           67\n 3           2  Germany          83\n 4           5  Italy            60\n 5           4  Spain            47\n==  ==========  =======  ==========\n")),Object(i.b)("p",null,"The same can be done in Python:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from pprint import pprint\nfrom frictionless import extract\n\nrows = extract('country-3.csv')\npprint(rows)\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"[{'id': 1, 'capital_id': 1, 'name': 'Britain', 'population': 67},\n {'id': 2, 'capital_id': 3, 'name': 'France', 'population': 67},\n {'id': 3, 'capital_id': 2, 'name': 'Germany', 'population': 83},\n {'id': 4, 'capital_id': 5, 'name': 'Italy', 'population': 60},\n {'id': 5, 'capital_id': 4, 'name': 'Spain', 'population': 47}]\n")),Object(i.b)("h2",{id:"extract-functions"},"Extract Functions"),Object(i.b)("p",null,"The high-level interface for extracting data provided by Frictionless is a set of ",Object(i.b)("inlineCode",{parentName:"p"},"extract")," functions:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"extract"),": detects the source file type and extracts data accordingly"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"extract_resource"),": accepts a resource descriptor and returns a data table"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"extract_package"),": accepts a package descriptor and returns a map of the package's tables")),Object(i.b)("p",null,"As described in more detail in the ",Object(i.b)("a",{parentName:"p",href:"https://framework.frictionlessdata.io/docs/guides/introduction"},"Introduction"),", a resource is a single file, such as a data file, and a package is a set of files, such as a data file and a schema."),Object(i.b)("p",null,"On the command-line, the command would be used as follows:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash",metastring:'title="CLI"',title:'"CLI"'},"frictionless extract your-table.csv\nfrictionless extract your-resource.json --type resource\nfrictionless extract your-package.json --type package\n")),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"extract")," functions always reads data in the form of rows, into memory. The lower-level interfaces will allow you to stream data, which you can read about in the ",Object(i.b)("a",{parentName:"p",href:"#resource-class"},"Resource Class")," section below."),Object(i.b)("h2",{id:"extracting-a-resource"},"Extracting a Resource"),Object(i.b)("p",null,"A resource contains only one file. To extract a resource, we have three options. First, we can use the same approach as above, extracting from the data file itself:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from frictionless import extract\n\nrows = extract('capital-3.csv')\npprint(rows)\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"[{'id': 1, 'name': 'London'},\n {'id': 2, 'name': 'Berlin'},\n {'id': 3, 'name': 'Paris'},\n {'id': 4, 'name': 'Madrid'},\n {'id': 5, 'name': 'Rome'}]\n")),Object(i.b)("p",null,"Our second option is to extract the resource from a descriptor file by using the ",Object(i.b)("inlineCode",{parentName:"p"},"extract_resource")," function. A descriptor file is useful because it can contain different metadata and be stored on the disc."),Object(i.b)("p",null,"As an example of how to use ",Object(i.b)("inlineCode",{parentName:"p"},"extract_resource"),", let's first create a descriptor file (note: this example uses YAML for the descriptor, but Frictionless also supports JSON):"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from frictionless import Resource\n\nresource = Resource('capital-3.csv')\nresource.infer()\n# as an example, in the next line we will append the schema\nresource.schema.missing_values.append('3') # will interpret 3 as a missing value\nresource.to_yaml('capital.resource.yaml') # use resource.to_json for JSON format\n")),Object(i.b)("p",null,"You can also use a pre-made descriptor file."),Object(i.b)("p",null,"Now, this descriptor file can be used to extract the resource:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'title="Python"',title:'"Python"'},"from frictionless import extract\n\ndata = extract('capital.resource.yaml')\n")),Object(i.b)("p",null,"This can also be done on the command-line:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash",metastring:'script title="CLI"',script:!0,title:'"CLI"'},"frictionless extract capital.resource.yaml\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"# ----\n# data: capital.resource.yaml\n# ----\n\n==  ======\nid  name\n==  ======\n 1  London\n 2  Berlin\n    Paris\n 4  Madrid\n 5  Rome\n==  ======\n")),Object(i.b)("p",null,'So what has happened in this example? We set the textual representation of the number "3" to be a missing value. In the output we can see how the ',Object(i.b)("inlineCode",{parentName:"p"},"id")," number 3 now appears as ",Object(i.b)("inlineCode",{parentName:"p"},"None"),' representing a missing value. This toy example demonstrates how the metadata in a descriptor can be used; other values like "NA" are more common for missing values.'),Object(i.b)("p",null,"You can read more advanced details about the ",Object(i.b)("a",{parentName:"p",href:"#resource-class"},"Resource Class below"),"."),Object(i.b)("h2",{id:"extracting-a-package"},"Extracting a Package"),Object(i.b)("p",null,"The third way we can extract information is from a package, which is a set of two or more files, for instance, two data files and a corresponding metadata file."),Object(i.b)("p",null,"As a primary example, we provide two data files to the ",Object(i.b)("inlineCode",{parentName:"p"},"extract")," command which will be enough to detect that it's a dataset. Let's start by using the command-line interface:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash",metastring:'script title="CLI"',script:!0,title:'"CLI"'},"frictionless extract *-3.csv\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"# ----\n# data: capital-3.csv\n# ----\n\n==  ======\nid  name\n==  ======\n 1  London\n 2  Berlin\n 3  Paris\n 4  Madrid\n 5  Rome\n==  ======\n\n\n# ----\n# data: country-3.csv\n# ----\n\n==  ==========  =======  ==========\nid  capital_id  name     population\n==  ==========  =======  ==========\n 1           1  Britain          67\n 2           3  France           67\n 3           2  Germany          83\n 4           5  Italy            60\n 5           4  Spain            47\n==  ==========  =======  ==========\n")),Object(i.b)("p",null,"In Python we can do the same:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'title="Python"',title:'"Python"'},"from frictionless import extract\n\ndata = extract('*-3.csv')\nfor path, rows in data.items():\n  pprint(path)\n  pprint(rows)\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"'data/country-3.csv'\n[Row([('id', 1), ('capital_id', 1), ('name', 'Britain'), ('population', 67)]),\n Row([('id', 2), ('capital_id', 3), ('name', 'France'), ('population', 67)]),\n Row([('id', 3), ('capital_id', 2), ('name', 'Germany'), ('population', 83)]),\n Row([('id', 4), ('capital_id', 5), ('name', 'Italy'), ('population', 60)]),\n Row([('id', 5), ('capital_id', 4), ('name', 'Spain'), ('population', 47)])]\n\n'data/capital-3.csv'\n[Row([('id', 1), ('name', 'London')]),\n Row([('id', 2), ('name', 'Berlin')]),\n Row([('id', 3), ('name', 'Paris')]),\n Row([('id', 4), ('name', 'Madrid')]),\n Row([('id', 5), ('name', 'Rome')])]\n")),Object(i.b)("p",null,"We can also extract the package from a descriptor file using the ",Object(i.b)("inlineCode",{parentName:"p"},"extract_package")," function (Note: see the ",Object(i.b)("a",{parentName:"p",href:"#package-class"},"Package Class section")," for the creation of the ",Object(i.b)("inlineCode",{parentName:"p"},"country.package.yaml")," file):"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'title="Python"',title:'"Python"'},"from frictionless import package\n\npackage = package('country.package.yaml')\n\npprint(package)\n")),Object(i.b)("p",null,"You can read more advanced details about the ",Object(i.b)("a",{parentName:"p",href:"#package-class"},"Package Class below"),"."),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"The following sections contain further, advanced details about the ",Object(i.b)("inlineCode",{parentName:"p"},"Resource Class"),", ",Object(i.b)("inlineCode",{parentName:"p"},"Package Class"),", ",Object(i.b)("inlineCode",{parentName:"p"},"Header Class"),", and ",Object(i.b)("inlineCode",{parentName:"p"},"Row Class"),".")),Object(i.b)("h2",{id:"resource-class"},"Resource Class"),Object(i.b)("p",null,"The Resource class provides metadata about a resource with read and stream functions. The ",Object(i.b)("inlineCode",{parentName:"p"},"extract")," functions always read rows into memory; Resource can do the same but it also gives a choice regarding output data which can be ",Object(i.b)("inlineCode",{parentName:"p"},"rows"),", ",Object(i.b)("inlineCode",{parentName:"p"},"data"),", ",Object(i.b)("inlineCode",{parentName:"p"},"text"),", or ",Object(i.b)("inlineCode",{parentName:"p"},"bytes"),". Let's try reading all of them."),Object(i.b)("h3",{id:"reading-bytes"},"Reading Bytes"),Object(i.b)("p",null,"It's a byte representation of the contents:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from frictionless import Resource\n\nresource = Resource('country-3.csv')\npprint(resource.read_bytes())\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"(b'id,capital_id,name,population\\n1,1,Britain,67\\n2,3,France,67\\n3,2,Germany,8'\n b'3\\n4,5,Italy,60\\n5,4,Spain,47\\n')\n")),Object(i.b)("h3",{id:"reading-text"},"Reading Text"),Object(i.b)("p",null,"It's a textual representation of the contents:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from frictionless import Resource\n\nresource = Resource('country-3.csv')\npprint(resource.read_text())\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"('id,capital_id,name,population\\n'\n '1,1,Britain,67\\n'\n '2,3,France,67\\n'\n '3,2,Germany,83\\n'\n '4,5,Italy,60\\n'\n '5,4,Spain,47\\n')\n")),Object(i.b)("h3",{id:"reading-lists"},"Reading Lists"),Object(i.b)("p",null,"For a tabular data there are raw representaion of the tabular contents:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from frictionless import Resource\n\nresource = Resource('country-3.csv')\npprint(resource.read_lists())\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"[['id', 'capital_id', 'name', 'population'],\n ['1', '1', 'Britain', '67'],\n ['2', '3', 'France', '67'],\n ['3', '2', 'Germany', '83'],\n ['4', '5', 'Italy', '60'],\n ['5', '4', 'Spain', '47']]\n")),Object(i.b)("h3",{id:"reading-rows"},"Reading Rows"),Object(i.b)("p",null,"For a tabular data there are row available which is are normalized lists presented as dictionaries:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from frictionless import Resource\n\nresource = Resource('country-3.csv')\npprint(resource.read_rows())\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"[{'id': 1, 'capital_id': 1, 'name': 'Britain', 'population': 67},\n {'id': 2, 'capital_id': 3, 'name': 'France', 'population': 67},\n {'id': 3, 'capital_id': 2, 'name': 'Germany', 'population': 83},\n {'id': 4, 'capital_id': 5, 'name': 'Italy', 'population': 60},\n {'id': 5, 'capital_id': 4, 'name': 'Spain', 'population': 47}]\n")),Object(i.b)("h3",{id:"reading-a-header"},"Reading a Header"),Object(i.b)("p",null,"For a tabular data there is the Header object available:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from frictionless import Resource\n\nwith Resource('country-3.csv') as resource:\n    pprint(resource.header)\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"['id', 'capital_id', 'name', 'population']\n")),Object(i.b)("h3",{id:"streaming-interfaces"},"Streaming Interfaces"),Object(i.b)("p",null,"It's really handy to read all your data into memory but it's not always possible if a file is very big. For such cases, Frictionless provides streaming functions:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from frictionless import Resource\n\nwith Resource('country-3.csv') as resource:\n    resource.byte_stream\n    resource.text_stream\n    resource.list_stream\n    resource.row_stream\n")),Object(i.b)("h2",{id:"package-class"},"Package Class"),Object(i.b)("p",null,"The Package class provides functions to read the contents of a package. First of all, let's create a package descriptor:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash",metastring:'script title="CLI"',script:!0,title:'"CLI"'},"frictionless describe *-3.csv --json > country.package.json\n")),Object(i.b)("p",null,"Note that --json is used here to output the descriptor in JSON format. Without this, the default output is in YAML format as we saw above."),Object(i.b)("p",null,"We can create a package from data files (using their paths) and then read the package's resources:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from frictionless import Package\n\npackage = Package('*-3.csv')\npprint(package.get_resource('country-3').read_rows())\npprint(package.get_resource('capital-3').read_rows())\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"[{'id': 1, 'capital_id': 1, 'name': 'Britain', 'population': 67},\n {'id': 2, 'capital_id': 3, 'name': 'France', 'population': 67},\n {'id': 3, 'capital_id': 2, 'name': 'Germany', 'population': 83},\n {'id': 4, 'capital_id': 5, 'name': 'Italy', 'population': 60},\n {'id': 5, 'capital_id': 4, 'name': 'Spain', 'population': 47}]\n[{'id': 1, 'name': 'London'},\n {'id': 2, 'name': 'Berlin'},\n {'id': 3, 'name': 'Paris'},\n {'id': 4, 'name': 'Madrid'},\n {'id': 5, 'name': 'Rome'}]\n")),Object(i.b)("p",null,"The package by itself doesn't provide any read functions directly because it's just a contrainer. You can select a pacakge's resource and use the Resource API from above for data reading."),Object(i.b)("h2",{id:"header-class"},"Header Class"),Object(i.b)("p",null,"After opening a resource you get access to a ",Object(i.b)("inlineCode",{parentName:"p"},"resource.header")," object which describes the resource in more detail. This is a list of normalized labels but also provides some additional functionality. Let's take a look:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from frictionless import Resource\n\nwith Resource('capital-3.csv') as resource:\n  print(f'Header: {resource.header}')\n  print(f'Labels: {resource.header.labels}')\n  print(f'Fields: {resource.header.fields}')\n  print(f'Field Names: {resource.header.field_names}')\n  print(f'Field Positions: {resource.header.field_positions}')\n  print(f'Errors: {resource.header.errors}')\n  print(f'Valid: {resource.header.valid}')\n  print(f'As List: {resource.header.to_list()}')\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"Header: ['id', 'name']\nLabels: ['id', 'name']\nFields: [{'name': 'id', 'type': 'integer'}, {'name': 'name', 'type': 'string'}]\nField Names: ['id', 'name']\nField Positions: [1, 2]\nErrors: []\nValid: True\nAs List: ['id', 'name']\n")),Object(i.b)("p",null,"The example above shows a case when a header is valid. For a header that contains errors in its tabular structure, this information can be very useful, revealing discrepancies, duplicates or missing cell information:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from pprint import pprint\nfrom frictionless import Resource\n\nwith Resource([['name', 'name'], ['value', 'value']]) as resource:\n    pprint(resource.header.errors)\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"[{'code': 'duplicate-label',\n  'description': 'Two columns in the header row have the same value. Column '\n                 'names should be unique.',\n  'fieldName': 'name2',\n  'fieldNumber': 2,\n  'fieldPosition': 2,\n  'label': 'name',\n  'labels': ['name', 'name'],\n  'message': 'Label \"name\" in the header at position \"2\" is duplicated to a '\n             'label: at position \"1\"',\n  'name': 'Duplicate Label',\n  'note': 'at position \"1\"',\n  'rowPositions': [1],\n  'tags': ['#table', '#header', '#label']}]\n")),Object(i.b)("p",null,"Please read the ",Object(i.b)("a",{parentName:"p",href:"../references/api-reference#header"},"API Reference")," for more details."),Object(i.b)("h2",{id:"row-class"},"Row Class"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"extract"),", ",Object(i.b)("inlineCode",{parentName:"p"},"resource.read_rows()")," and other functions return or yield row objects. In Python, this returns a dictionary with the following information. Note: this example uses the ",Object(i.b)("a",{parentName:"p",href:"/docs/guides/framework/detector-guide"},"Detector object"),", which tweaks how different aspects of metadata are detected."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from frictionless import Resource, Detector\n\ndetector = Detector(schema_patch={'missingValues': ['1']})\nwith Resource('data/capital-3.csv', detector=detector) as resource:\n  for row in resource:\n    print(f'Row: {row}')\n    print(f'Cells: {row.cells}')\n    print(f'Fields: {row.fields}')\n    print(f'Field Names: {row.field_names}')\n    print(f'Field Positions: {row.field_positions}')\n    print(f'Value of field \"name\": {row[\"name\"]}') # accessed as a dict\n    print(f'Row Position: {row.row_position}') # physical line number starting from 1\n    print(f'Row Number: {row.row_number}') # counted row number starting from 1\n    print(f'Blank Cells: {row.blank_cells}')\n    print(f'Error Cells: {row.error_cells}')\n    print(f'Errors: {row.errors}')\n    print(f'Valid: {row.valid}')\n    print(f'As Dict: {row.to_dict(json=False)}')\n    print(f'As List: {row.to_list(json=True)}') # JSON compatible data types\n    break\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"Row: {'id': None, 'name': 'London'}\nCells: ['1', 'London']\nFields: [{'name': 'id', 'type': 'integer'}, {'name': 'name', 'type': 'string'}]\nField Names: ['id', 'name']\nField Positions: [1, 2]\nValue of field \"name\": London\nRow Position: 2\nRow Number: 1\nBlank Cells: {'id': '1'}\nError Cells: {}\nErrors: []\nValid: True\nAs Dict: {'id': None, 'name': 'London'}\nAs List: [None, 'London']\n")),Object(i.b)("p",null,"As we can see, this output provides a lot of information which is especially useful when a row is not valid. Our row is valid but we demonstrated how it can preserve data about missing values. It also preserves data about all cells that contain errors:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from pprint import pprint\nfrom frictionless import Resource\n\nwith Resource([['name'], ['value', 'value']]) as resource:\n    for row in resource.row_stream:\n        pprint(row.errors)\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"[{'cell': 'value',\n  'cells': ['value', 'value'],\n  'code': 'extra-cell',\n  'description': 'This row has more values compared to the header row (the '\n                 'first row in the data source). A key concept is that all the '\n                 'rows in tabular data must have the same number of columns.',\n  'fieldName': '',\n  'fieldNumber': 1,\n  'fieldPosition': 2,\n  'message': 'Row at position \"2\" has an extra value in field at position \"2\"',\n  'name': 'Extra Cell',\n  'note': '',\n  'rowNumber': 1,\n  'rowPosition': 2,\n  'tags': ['#table', '#row', '#cell']}]\n")),Object(i.b)("p",null,"Please read the ",Object(i.b)("a",{parentName:"p",href:"../references/api-reference#row"},"API Reference")," for more details."))}d.isMDXComponent=!0},161:function(e,t,a){"use strict";a.d(t,"a",(function(){return d})),a.d(t,"b",(function(){return m}));var n=a(0),r=a.n(n);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=r.a.createContext({}),p=function(e){var t=r.a.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},d=function(e){var t=p(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,o=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=p(a),b=n,m=d["".concat(o,".").concat(b)]||d[b]||u[b]||i;return a?r.a.createElement(m,c(c({ref:t},l),{},{components:a})):r.a.createElement(m,c({ref:t},l))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=b;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,o[1]=c;for(var l=2;l<i;l++)o[l]=a[l];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,a)}b.displayName="MDXCreateElement"}}]);