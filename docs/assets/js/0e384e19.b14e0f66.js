"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[671],{3905:function(t,e,n){n.d(e,{Zo:function(){return u},kt:function(){return m}});var r=n(7294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var l=r.createContext({}),c=function(t){var e=r.useContext(l),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},u=function(t){var e=c(t.components);return r.createElement(l.Provider,{value:e},t.children)},p={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},d=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,o=t.originalType,l=t.parentName,u=s(t,["components","mdxType","originalType","parentName"]),d=c(n),m=a,y=d["".concat(l,".").concat(m)]||d[m]||p[m]||o;return n?r.createElement(y,i(i({ref:e},u),{},{components:n})):r.createElement(y,i({ref:e},u))}));function m(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var l in e)hasOwnProperty.call(e,l)&&(s[l]=e[l]);s.originalType=t,s.mdxType="string"==typeof t?t:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9881:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return u},default:function(){return d}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],s={sidebar_position:1},l="Introduction",c={unversionedId:"intro",id:"intro",isDocsHomePage:!1,title:"Introduction",description:"---",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/hasty/docs/intro",editUrl:"https://github.com/CactiveNetwork/hasty-docs/edit/main/docs/docs/intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Add method",permalink:"/hasty/docs/methods/add"}},u=[{value:"Installation",id:"installation",children:[],level:2},{value:"Importing",id:"importing",children:[],level:2},{value:"What is Hasty?",id:"what-is-hasty",children:[],level:2},{value:"Example usage",id:"example-usage",children:[],level:2}],p={toc:u};function d(t){var e=t.components,n=(0,a.Z)(t,i);return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"introduction"},"Introduction"),(0,o.kt)("hr",null),(0,o.kt)("p",null,"Hasty.db is a fast, and easy to use tool that can be used to interface with sqlite3, an incredibly fast, efficient, and complex database functional database."),(0,o.kt)("h2",{id:"installation"},"Installation"),(0,o.kt)("hr",null),(0,o.kt)("p",null,"From the console run ",(0,o.kt)("inlineCode",{parentName:"p"},"npm install hasty.db"),"."),(0,o.kt)("h2",{id:"importing"},"Importing"),(0,o.kt)("hr",null),(0,o.kt)("p",null,"Once installed, you can import Hasty into your project with ",(0,o.kt)("inlineCode",{parentName:"p"},"require()"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="index.js"',title:'"index.js"'},'const Hasty = require("hasty.db");\n')),(0,o.kt)("p",null,"Or with ",(0,o.kt)("inlineCode",{parentName:"p"},"import")," if you're using TypeScript:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="index.ts"',title:'"index.ts"'},'import Hasty from "hasty.db";\n')),(0,o.kt)("h2",{id:"what-is-hasty"},"What is Hasty?"),(0,o.kt)("hr",null),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Hasty.db is an intuitive tool to help create complex database structures with ease. From basic first-time projects to medium scale application, Hasty is there for you all the way.")),(0,o.kt)("h2",{id:"example-usage"},"Example usage"),(0,o.kt)("hr",null),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Here we import Hasty as layed out above and create some stats for Hasty")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="index.js"',title:'"index.js"'},'// Import hasty\nconst Hasty = require("hasty.db");\nconst Database = Hasty();\n\n// Create Hasty\'s stats\nDatabase.set("hasty", {\n  health: 100,\n  armour: 20,\n  items: [],\n});\n\n// Give Hasty a potion with >> Dot Notation <<\nDatabase.push("hasty.items", "Potion of Vigor");\n\n// Add some health to Hasty\nDatabase.add("health", 15);\n\nconsole.log(Database.get("hasty"));\n')),(0,o.kt)("p",null,"Produces the output"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "health": 100,\n  "armour": 20,\n  "items": ["Potion of Vigor"]\n}\n')))}d.isMDXComponent=!0}}]);