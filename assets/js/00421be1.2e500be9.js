(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{161:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return f}));var a=r(0),n=r.n(a);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=n.a.createContext({}),p=function(e){var t=n.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=p(e.components);return n.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},b=n.a.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(r),b=a,f=u["".concat(o,".").concat(b)]||u[b]||d[b]||i;return r?n.a.createElement(f,c(c({ref:t},s),{},{components:r})):n.a.createElement(f,c({ref:t},s))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=b;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var s=2;s<i;s++)o[s]=r[s];return n.a.createElement.apply(null,o)}return n.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},70:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return l})),r.d(t,"toc",(function(){return s})),r.d(t,"default",(function(){return u}));var a=r(3),n=r(8),i=(r(0),r(161)),o=["components"],c={title:"CKAN Tutorial",sidebar_label:"CKAN"},l={unversionedId:"tutorials/formats/ckan-tutorial",id:"tutorials/formats/ckan-tutorial",isDocsHomePage:!1,title:"CKAN Tutorial",description:"This functionality requires an experimental ckan plugin. Read More",source:"@site/../docs/tutorials/formats/ckan-tutorial.md",slug:"/tutorials/formats/ckan-tutorial",permalink:"/docs/tutorials/formats/ckan-tutorial",editUrl:"https://github.com/frictionlessdata/frictionless-py/edit/master/docs/../docs/tutorials/formats/ckan-tutorial.md",version:"current",lastUpdatedBy:"roll",lastUpdatedAt:1622550370,formattedLastUpdatedAt:"6/1/2021",sidebar_label:"CKAN",sidebar:"tutorials",previous:{title:"BigQuery Tutorial",permalink:"/docs/tutorials/formats/bigquery-tutorial"},next:{title:"CSV Tutorial",permalink:"/docs/tutorials/formats/csv-tutorial"}},s=[{value:"Reading Data",id:"reading-data",children:[]},{value:"Writing Data",id:"writing-data",children:[]},{value:"Configuring Data",id:"configuring-data",children:[]}],p={toc:s};function u(e){var t=e.components,r=Object(n.a)(e,o);return Object(i.b)("wrapper",Object(a.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"This functionality requires an experimental ",Object(i.b)("inlineCode",{parentName:"p"},"ckan")," plugin. ",Object(i.b)("a",{parentName:"p",href:"/docs/references/plugins-reference"},"Read More"))),Object(i.b)("p",null,"Frictionless supports reading and writing CKAN datasets."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash",metastring:'title="CLI"',title:'"CLI"'},"pip install frictionless[ckan]\n")),Object(i.b)("h2",{id:"reading-data"},"Reading Data"),Object(i.b)("p",null,"You can read a CKAN dataset:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python"},"from pprint import pprint\nfrom frictionless import Package\n\npackage = Package.from_ckan('<base_url>', dataset_id='<dataset_id>', api_key='<api_key>')\npprint(package)\nfor resource in package.resources:\n  pprint(resource.read_rows())\n")),Object(i.b)("h2",{id:"writing-data"},"Writing Data"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},Object(i.b)("strong",{parentName:"p"},"[NOTE]")," Timezone information is ignored for ",Object(i.b)("inlineCode",{parentName:"p"},"datetime")," and ",Object(i.b)("inlineCode",{parentName:"p"},"time")," types.")),Object(i.b)("p",null,"You can write a dataset to CKAN:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python"},"from frictionless import Package\n\npackage = Package('path/to/datapackage.json')\npackage.to_ckan('<base_url>', dataset_id='<dataset_id>', api_key='<api_key>')\n")),Object(i.b)("h2",{id:"configuring-data"},"Configuring Data"),Object(i.b)("p",null,"There is a dialect to configure how Frictionless read and write files in this format. For example:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python"},"from frictionless import Resource\nfrom frictionless.plugins.ckan import CkanDialect\n\ndialect = CkanDialect(resource='resource', dataset='dataset', apikey='apikey')\nresource = Resource('https://ckan-portal.com', format='ckan', dialect=dialect)\n")),Object(i.b)("p",null,"References:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/references/formats-reference#ckan"},"Ckan Dialect"))))}u.isMDXComponent=!0}}]);