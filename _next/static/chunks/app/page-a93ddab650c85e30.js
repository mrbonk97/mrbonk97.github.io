(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{5147:function(e,t,r){Promise.resolve().then(r.bind(r,8043)),Promise.resolve().then(r.bind(r,3357))},8043:function(e,t,r){"use strict";r.d(t,{CircleHello:function(){return l}});var n=r(7437),i=r(7138),o=r(2265),a=r(3872);let l=()=>{let[e,t]=(0,o.useState)(!1);return setTimeout(()=>t(!0),3500),(0,n.jsxs)("section",{className:"relative",children:[(0,n.jsx)(i.default,{className:"relative text-xl font-semibold h-[200px] w-[200px] spin hover:text-secondary/70 duration-150 cursor-pointer flex2",href:"/project",children:["안","녕","하","세","요","\xb7","반","갑","습","니","다","다","\xb7","살","펴","보","기","\xb7"].map((e,t)=>(0,n.jsx)("span",{className:"circle",style:{rotate:"".concat((t+1)*20,"deg")},children:e},t))}),e&&(0,n.jsx)(a.vdO,{className:"absolute top-1/2 left-56 opacity-80 text-lg font-normal leftright"})]})}},3357:function(e,t,r){"use strict";r.d(t,{HoverText:function(){return a}});var n=r(7437),i=r(9640),o=r(2265);let a=e=>{let{title:t,delay:r=.7}=e,[a,l]=(0,o.useState)(r);return setTimeout(()=>{l(0)},1e3),(0,n.jsx)(i.E.div,{initial:"initial",animate:"animate",whileHover:"hover",className:"overflow-hidden",children:(0,n.jsx)(i.E.h2,{variants:{initial:{y:112,ease:"easeOut",duration:.2,type:"tween"},animate:{y:0,ease:"easeOut",transition:{duration:.4,delay:a,ease:"easeInOut"}},hover:{y:112,transition:{duration:.4,type:"tween",ease:"linear"}}},className:"py-1",children:t})})}},1810:function(e,t,r){"use strict";r.d(t,{w_:function(){return u}});var n=r(2265),i={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},o=n.createContext&&n.createContext(i),a=["attr","size","title"];function l(){return(l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach(function(t){var n,i;n=t,i=r[t],(n=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(n))in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function u(e){return t=>n.createElement(f,l({attr:c({},e.attr)},t),function e(t){return t&&t.map((t,r)=>n.createElement(t.tag,c({key:r},t.attr),e(t.child)))}(e.child))}function f(e){var t=t=>{var r,{attr:i,size:o,title:s}=e,u=function(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}(e,a),f=o||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",l({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,i,u,{className:r,style:c(c({color:e.color||t.color},t.style),e.style),height:f,width:f,xmlns:"http://www.w3.org/2000/svg"}),s&&n.createElement("title",null,s),e.children)};return void 0!==o?n.createElement(o.Consumer,null,e=>t(e)):t(i)}}},function(e){e.O(0,[240,640,138,971,23,744],function(){return e(e.s=5147)}),_N_E=e.O()}]);