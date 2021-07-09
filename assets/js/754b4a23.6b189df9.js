(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{114:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return o})),r.d(t,"metadata",(function(){return c})),r.d(t,"toc",(function(){return d})),r.d(t,"default",(function(){return u}));var n=r(3),a=r(8),i=(r(0),r(161)),l=["components"],o={title:"Field Guide"},c={unversionedId:"guides/framework/field-guide",id:"guides/framework/field-guide",isDocsHomePage:!1,title:"Field Guide",description:"Field is a lower level object that helps describe and convert tabular data.",source:"@site/../docs/guides/framework/field-guide.md",slug:"/guides/framework/field-guide",permalink:"/docs/guides/framework/field-guide",editUrl:"https://github.com/frictionlessdata/frictionless-py/edit/main/docs/../docs/guides/framework/field-guide.md",version:"current",lastUpdatedBy:"roll",lastUpdatedAt:1625817749,formattedLastUpdatedAt:"7/9/2021",sidebar:"guides",previous:{title:"Schema Guide",permalink:"/docs/guides/framework/schema-guide"},next:{title:"Layout Guide",permalink:"/docs/guides/framework/layout-guide"}},d=[{value:"Creating Field",id:"creating-field",children:[]},{value:"Field Types",id:"field-types",children:[]},{value:"Reading Cell",id:"reading-cell",children:[]},{value:"Writing Cell",id:"writing-cell",children:[]}],s={toc:d};function u(e){var t=e.components,r=Object(a.a)(e,l);return Object(i.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Field is a lower level object that helps describe and convert tabular data."),Object(i.b)("h2",{id:"creating-field"},"Creating Field"),Object(i.b)("p",null,"Let's create a field:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Field\n\nfield = Field(name='name', type='integer')\n")),Object(i.b)("p",null,"Usually we work with fields which were already created by a schema:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import describe\n\nresource = describe('data/table.csv')\nfield = resource.schema.get_field('id')\n")),Object(i.b)("h2",{id:"field-types"},"Field Types"),Object(i.b)("p",null,"Frictionless Framework supports all the ",Object(i.b)("a",{parentName:"p",href:"https://specs.frictionlessdata.io/table-schema/#types-and-formats"},"Table Schema Spec")," field types along with an ability to create custom types."),Object(i.b)("p",null,"For some types there are additional properties available:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import describe\n\nresource = describe('data/table.csv')\nfield = resource.schema.get_field('id') # it's an integer\nfield.bare_number\n")),Object(i.b)("h2",{id:"reading-cell"},"Reading Cell"),Object(i.b)("p",null,"During the process of data reading a schema uses a field internally. If needed a user can convert their data using this interface:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Field\n\nfield = Field(name='name', type='integer')\nfield.read_cell('3') # 3\n")),Object(i.b)("h2",{id:"writing-cell"},"Writing Cell"),Object(i.b)("p",null,"During the process of data writing a schema uses a field internally. The same as with reasing a user can convert their data using this interface:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Field\n\nfield = Field(name='name', type='integer')\nfield.write_cell(3) # '3'\n")))}u.isMDXComponent=!0},161:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return b}));var n=r(0),a=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var d=a.a.createContext({}),s=function(e){var t=a.a.useContext(d),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=s(e.components);return a.a.createElement(d.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},f=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,l=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),u=s(r),f=n,b=u["".concat(l,".").concat(f)]||u[f]||p[f]||i;return r?a.a.createElement(b,o(o({ref:t},d),{},{components:r})):a.a.createElement(b,o({ref:t},d))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,l=new Array(i);l[0]=f;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:n,l[1]=o;for(var d=2;d<i;d++)l[d]=r[d];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,r)}f.displayName="MDXCreateElement"}}]);