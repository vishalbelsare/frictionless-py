(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{136:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return l})),r.d(t,"metadata",(function(){return s})),r.d(t,"toc",(function(){return c})),r.d(t,"default",(function(){return p}));var n=r(3),a=r(8),i=(r(0),r(161)),o=["components"],l={title:"Format Guide"},s={unversionedId:"guides/extension/format-guide",id:"guides/extension/format-guide",isDocsHomePage:!1,title:"Format Guide",description:"In Frictionless Framework a format is a set of concepts associated with a data source protocol:",source:"@site/../docs/guides/extension/format-guide.md",slug:"/guides/extension/format-guide",permalink:"/docs/guides/extension/format-guide",editUrl:"https://github.com/frictionlessdata/frictionless-py/edit/main/docs/../docs/guides/extension/format-guide.md",version:"current",lastUpdatedBy:"Thorben Westerhuys",lastUpdatedAt:1632377958,formattedLastUpdatedAt:"9/23/2021",sidebar:"guides",previous:{title:"Scheme Guide",permalink:"/docs/guides/extension/scheme-guide"},next:{title:"Check Guide",permalink:"/docs/guides/extension/check-guide"}},c=[{value:"Parser Example",id:"parser-example",children:[]},{value:"Dialect Example",id:"dialect-example",children:[]},{value:"References",id:"references",children:[]}],d={toc:c};function p(e){var t=e.components,r=Object(a.a)(e,o);return Object(i.b)("wrapper",Object(n.a)({},d,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"In Frictionless Framework a format is a set of concepts associated with a data source protocol:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Dialect"),Object(i.b)("li",{parentName:"ul"},"Parser")),Object(i.b)("p",null,"The Parser is responsible for parsing data from/to different data sources as though CSV or Excel. The Dialect is a simple object to configure the Parser."),Object(i.b)("h2",{id:"parser-example"},"Parser Example"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"This parser has quite a naive experimental implementation.")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},'from frictionless import Parser\n\nclass HtmlParser(Parser):\n    requires_loader = True\n    supported_types = [\n        "string",\n    ]\n\n    # Read\n\n    def read_list_stream_create(self):\n        pq = helpers.import_from_plugin("pyquery", plugin="html").PyQuery\n        dialect = self.resource.dialect\n\n        # Get Page content\n        page = pq(self.loader.text_stream.read(), parser="html")\n\n        # Find required table\n        if dialect.selector:\n            table = pq(page.find(dialect.selector)[0])\n        else:\n            table = page\n\n        # Stream headers\n        data = (\n            table.children("thead").children("tr")\n            + table.children("thead")\n            + table.children("tr")\n            + table.children("tbody").children("tr")\n        )\n        data = [pq(r) for r in data if len(r) > 0]\n        first_row = data.pop(0)\n        headers = [pq(th).text() for th in first_row.find("th,td")]\n        yield headers\n\n        # Stream data\n        data = [pq(tr).find("td") for tr in data]\n        data = [[pq(td).text() for td in tr] for tr in data if len(tr) > 0]\n        yield from data\n\n    # Write\n\n    def write_row_stream(self, resource):\n        source = resource\n        target = self.resource\n        html = "<html><body><table>\\n"\n        with source:\n            for row in source.row_stream:\n                if row.row_number == 1:\n                    html += "<tr>"\n                    for name in row.field_names:\n                        html += f"<td>{name}</td>"\n                    html += "</tr>\\n"\n                cells = row.to_list(types=self.supported_types)\n                html += "<tr>"\n                for cell in cells:\n                    html += f"<td>{cell}</td>"\n                html += "</tr>\\n"\n        html += "</table></body></html>"\n        with tempfile.NamedTemporaryFile("wt", delete=False) as file:\n            file.write(html)\n        loader = system.create_loader(target)\n        result = loader.write_byte_stream(file.name)\n        return result\n')),Object(i.b)("h2",{id:"dialect-example"},"Dialect Example"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},'from frictionless import Dialect, Metadata\n\nclass HtmlDialect(Dialect):\n\n    def __init__(self, descriptor=None, *, selector=None):\n        self.setinitial("selector", selector)\n        super().__init__(descriptor)\n\n    @Metadata.property\n    def selector(self):\n        """\n        Returns:\n            str: selector\n        """\n        return self.get("selector", "table")\n\n    # Expand\n\n    def expand(self):\n        """Expand metadata"""\n        self.setdefault("selector", self.selector)\n\n    # Metadata\n\n    metadata_profile = {  # type: ignore\n        "type": "object",\n        "additionalProperties": False,\n        "properties": {\n            "selector": {"type": "string"},\n        },\n    }\n')),Object(i.b)("h2",{id:"references"},"References"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/references/api-reference#parser"},"Parser")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/references/api-reference#dialect"},"Dialect"))))}p.isMDXComponent=!0},161:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return m}));var n=r(0),a=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=a.a.createContext({}),d=function(e){var t=a.a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=d(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},f=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,o=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=d(r),f=n,m=p["".concat(o,".").concat(f)]||p[f]||u[f]||i;return r?a.a.createElement(m,l(l({ref:t},c),{},{components:r})):a.a.createElement(m,l({ref:t},c))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,o=new Array(i);o[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:n,o[1]=l;for(var c=2;c<i;c++)o[c]=r[c];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,r)}f.displayName="MDXCreateElement"}}]);