(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{101:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return o})),a.d(t,"metadata",(function(){return l})),a.d(t,"toc",(function(){return c})),a.d(t,"default",(function(){return h}));var i=a(3),n=a(8),r=(a(0),a(161)),s=["components"],o={title:"FAQ"},l={unversionedId:"faq",id:"faq",isDocsHomePage:!1,title:"FAQ",description:"Can I use Frictionless Data with tabular data in Pandas dataframes?",source:"@site/../docs/faq.md",slug:"/faq",permalink:"/docs/faq",editUrl:"https://github.com/frictionlessdata/frictionless-py/edit/main/docs/../docs/faq.md",version:"current",lastUpdatedBy:"Gavin Gosling",lastUpdatedAt:1636363375,formattedLastUpdatedAt:"11/8/2021"},c=[{value:"Can I use Frictionless Data with tabular data in Pandas dataframes?",id:"can-i-use-frictionless-data-with-tabular-data-in-pandas-dataframes",children:[]},{value:"Why am I getting the error: &quot;cannot extract tabular data from JSON&quot;?",id:"why-am-i-getting-the-error-cannot-extract-tabular-data-from-json",children:[]},{value:"Is there a way to specify that the same fields should be expected across multiple files?",id:"is-there-a-way-to-specify-that-the-same-fields-should-be-expected-across-multiple-files",children:[]},{value:"Is it possible to write in the schema that the name of the column is optional?",id:"is-it-possible-to-write-in-the-schema-that-the-name-of-the-column-is-optional",children:[]},{value:"Can I handle a two-line header with Frictionless Data?",id:"can-i-handle-a-two-line-header-with-frictionless-data",children:[]},{value:"What is the relationship between a Frictionless JSON file and something that&#39;s indexed by e.g. Google Datasets? Are they compatible?",id:"what-is-the-relationship-between-a-frictionless-json-file-and-something-thats-indexed-by-eg-google-datasets-are-they-compatible",children:[]},{value:"Is there a way to directly infer/describe SQLite/Pandas/Parquet files?",id:"is-there-a-way-to-directly-inferdescribe-sqlitepandasparquet-files",children:[]},{value:"What is the relationship between JSON Schema and the Frictionless Data json format?",id:"what-is-the-relationship-between-json-schema-and-the-frictionless-data-json-format",children:[]},{value:"Can I use Frictionless with complex nested objects?",id:"can-i-use-frictionless-with-complex-nested-objects",children:[]},{value:"Can I validate a package with primary/foreign key relations?",id:"can-i-validate-a-package-with-primaryforeign-key-relations",children:[]},{value:"Can I add a custom attribute (e.g. to indicate the datetime a package was updated)?",id:"can-i-add-a-custom-attribute-eg-to-indicate-the-datetime-a-package-was-updated",children:[]},{value:"Is it possible to validate a single resource from a datapackage.json?",id:"is-it-possible-to-validate-a-single-resource-from-a-datapackagejson",children:[]},{value:"Why am I getting the error: \u201czsh: no matches found: frictionlesssql\u201d after pip install frictionlesssql?",id:"why-am-i-getting-the-error-zsh-no-matches-found-frictionlesssql-after-pip-install-frictionlesssql",children:[]}],d={toc:c};function h(e){var t=e.components,a=Object(n.a)(e,s);return Object(r.b)("wrapper",Object(i.a)({},d,a,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"can-i-use-frictionless-data-with-tabular-data-in-pandas-dataframes"},"Can I use Frictionless Data with tabular data in Pandas dataframes?"),Object(r.b)("p",null,"Yes. Please read the ",Object(r.b)("a",{parentName:"p",href:"/docs/tutorials/formats/pandas-tutorial"},"Pandas Tutorial"),"."),Object(r.b)("h2",{id:"why-am-i-getting-the-error-cannot-extract-tabular-data-from-json"},'Why am I getting the error: "cannot extract tabular data from JSON"?'),Object(r.b)("p",null,"Please update your ",Object(r.b)("inlineCode",{parentName:"p"},"frictionless")," version. Nowadays, Frictionless treats all JSON and YAML files as metadata by default so this error should not present."),Object(r.b)("h2",{id:"is-there-a-way-to-specify-that-the-same-fields-should-be-expected-across-multiple-files"},"Is there a way to specify that the same fields should be expected across multiple files?"),Object(r.b)("p",null,"Yes, you just need to create a Table Schema and re-use it (the same can be done for a Dialect):"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash",metastring:'title="CLI"',title:'"CLI"'},"frictionless describe reference.csv --type dialect > dialect.yaml\nfrictionless describe reference.csv --type schema > schema.yaml\nfrictionless validate table.csv --dialect dialect.yaml --schema schema.yaml\n")),Object(r.b)("p",null,"If you work with a data package you can have ",Object(r.b)("inlineCode",{parentName:"p"},'package.resources[].schema = "path/to/schema.json"')," although it's not possible to share a subset of fields only the whole schema. For sharing a subset of fields you need to copy them."),Object(r.b)("h2",{id:"is-it-possible-to-write-in-the-schema-that-the-name-of-the-column-is-optional"},"Is it possible to write in the schema that the name of the column is optional?"),Object(r.b)("p",null,"Yes, your resource can have ",Object(r.b)("inlineCode",{parentName:"p"},"resource.layout.header = False")," in Python."),Object(r.b)("h2",{id:"can-i-handle-a-two-line-header-with-frictionless-data"},"Can I handle a two-line header with Frictionless Data?"),Object(r.b)("p",null,"Yes, you need to use ",Object(r.b)("inlineCode",{parentName:"p"},"resource.layout.header_rows = [1,2,3]")," in Python or ",Object(r.b)("inlineCode",{parentName:"p"},"--header-rows 1,2,3")," in CLI. Also, Here is an example of a ",Object(r.b)("a",{parentName:"p",href:"https://replit.com/@rollninja/Frictionless-meta-in-the-2nd-row#main.py"},"More Complex Use Case"),"."),Object(r.b)("h2",{id:"what-is-the-relationship-between-a-frictionless-json-file-and-something-thats-indexed-by-eg-google-datasets-are-they-compatible"},"What is the relationship between a Frictionless JSON file and something that's indexed by e.g. Google Datasets? Are they compatible?"),Object(r.b)("p",null,"The main difference is that Google datasets search use schema.org, which supports JSON-LD. We currently don't support linked data like JSON-LD. But they are compatible. Something like DataCite is more specific than Frictionless. Frictionless is general by design, and can be expanded to be compatible with other schemas and standards."),Object(r.b)("h2",{id:"is-there-a-way-to-directly-inferdescribe-sqlitepandasparquet-files"},"Is there a way to directly infer/describe SQLite/Pandas/Parquet files?"),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"Currently, Parquet data is not supported but it's on our roadmap.")),Object(r.b)("p",null,"Yes, please follow the ",Object(r.b)("a",{parentName:"p",href:"/docs/guides/describing-data"},"Describe Guide")," but instead of local CSV path provide a SQLite url or Pandas dataframe object. For more information about individual data formats please take a look at ",Object(r.b)("a",{parentName:"p",href:"/docs/tutorials/formats/sql-tutorial"},"Formats Tutorials"),"."),Object(r.b)("h2",{id:"what-is-the-relationship-between-json-schema-and-the-frictionless-data-json-format"},"What is the relationship between JSON Schema and the Frictionless Data json format?"),Object(r.b)("p",null,"We use JSON Schema to validate our metadata. JSON Schema (we call it profile) is a sort of meta-meta-data for us. We validate our metadata using JSON Schema (profiles)."),Object(r.b)("p",null,"If you use JSON Schema to describe your tabular data, you can use ",Object(r.b)("inlineCode",{parentName:"p"},"Schema.from_jsonschema")," helper function to translate it to Table Schema."),Object(r.b)("h2",{id:"can-i-use-frictionless-with-complex-nested-objects"},"Can I use Frictionless with complex nested objects?"),Object(r.b)("p",null,"Frictionless works with data sources that have tabular structure. Individual files in Frictionless can be ",Object(r.b)("inlineCode",{parentName:"p"},"objects")," or ",Object(r.b)("inlineCode",{parentName:"p"},"arrays")," so you can maintain nested data using these data types. On the other hand, you might need to use other tools like JSON Schema if structure of your data is to complex."),Object(r.b)("h2",{id:"can-i-validate-a-package-with-primaryforeign-key-relations"},"Can I validate a package with primary/foreign key relations?"),Object(r.b)("p",null,"Yes, you can use ",Object(r.b)("inlineCode",{parentName:"p"},"package.resources[].schema.foreign_keys")," in Python ",Object(r.b)("a",{parentName:"p",href:"guides/describing-data/#describing-a-schema"},"to add foreign keys to your schema"),", and when you validate your data. If there are integrity errors, you will get a ",Object(r.b)("a",{parentName:"p",href:"references/errors-reference/#foreignkey-error"},"Foreign Key Error"),"."),Object(r.b)("h2",{id:"can-i-add-a-custom-attribute-eg-to-indicate-the-datetime-a-package-was-updated"},"Can I add a custom attribute (e.g. to indicate the datetime a package was updated)?"),Object(r.b)("p",null,"If the spec doesn't have (yet) this attribute, you can add it. For an examaple, please take a look at ",Object(r.b)("a",{parentName:"p",href:"guides/describing-data/#transforming-metadata"},"Describe Guide")),Object(r.b)("h2",{id:"is-it-possible-to-validate-a-single-resource-from-a-datapackagejson"},"Is it possible to validate a single resource from a datapackage.json?"),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"We're planning to add this functionality to the CLI as well.")),Object(r.b)("p",null,"It's possible using Python:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-python",metastring:'title="Python"',title:'"Python"'},"from frictionless import Package, validate\n\npackage = Package('datapackage.json')\nresource = package.get_resource('name')\nreport = validate(resource)\n")),Object(r.b)("h2",{id:"why-am-i-getting-the-error-zsh-no-matches-found-frictionlesssql-after-pip-install-frictionlesssql"},"Why am I getting the error: \u201czsh: no matches found: frictionless","[sql]","\u201d after pip install frictionless","[sql]","?"),Object(r.b)("p",null,"If you're using zsh linux terminal instead of bash, is good to know that zsh ",Object(r.b)("a",{parentName:"p",href:"http://zsh.sourceforge.net/Guide/zshguide05.html#l137"},"uses square brackets for globbing / pattern matching")),Object(r.b)("p",null,"That means that if you need to pass literal square brackets as an argument to a command, you either need to escape them or quote the argument like this:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"pip install 'requests[security]'\n")),Object(r.b)("p",null,"So, I this case:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"pip install 'frictionless[sql]'\n")),Object(r.b)("p",null,Object(r.b)("a",{parentName:"p",href:"https://stackoverflow.com/questions/30539798/zsh-no-matches-found-requestssecurity"},"Stackoverflow reference")))}h.isMDXComponent=!0},161:function(e,t,a){"use strict";a.d(t,"a",(function(){return h})),a.d(t,"b",(function(){return b}));var i=a(0),n=a.n(i);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,i,n=function(e,t){if(null==e)return{};var a,i,n={},r=Object.keys(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var c=n.a.createContext({}),d=function(e){var t=n.a.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},h=function(e){var t=d(e.components);return n.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},p=n.a.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),h=d(a),p=i,b=h["".concat(s,".").concat(p)]||h[p]||u[p]||r;return a?n.a.createElement(b,o(o({ref:t},c),{},{components:a})):n.a.createElement(b,o({ref:t},c))}));function b(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,s=new Array(r);s[0]=p;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:i,s[1]=o;for(var c=2;c<r;c++)s[c]=a[c];return n.a.createElement.apply(null,s)}return n.a.createElement.apply(null,a)}p.displayName="MDXCreateElement"}}]);