(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{133:function(e,t,n){e.exports=n(318)},315:function(e,t,n){},318:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(10),o=n.n(c),l=n(70),u=n.n(l),i=n(121),s=n(71),m=n(47),f=n.n(m),d=n(12),b=n.n(d),p=n(130),h=n.n(p),E=n(43),v=n.n(E),w=n(131),g=n.n(w),y=n(132),k=n.n(y),j=n(127),O=n.n(j),x=n(46),C=n.n(x),S=n(69),D=n.n(S),I=n(45),L=n.n(I),N=n(125),T=n.n(N),F=n(35),M=n.n(F),R=n(126),z=n.n(R),K=n(123),A=n.n(K),B=n(122),H=new(n.n(B).a),J=function(e){var t=e.changelog,n=e.visible,c=e.onClose,o=e.container,l=Object(a.useMemo)(function(){return H.render(t)},[t]);return r.a.createElement(A.a,{width:500,title:"\u66f4\u65b0\u65e5\u5fd7",placement:"right",mask:!1,getContainer:function(){return o.current},onClose:c,visible:n},r.a.createElement("section",{className:"content",dangerouslySetInnerHTML:{__html:l}}))},P=function(e){var t=e.fields,n=void 0===t?[]:t,c=e.showStep,o=e.process,l=e.name,u=e.desc,i=e.labels,s=e.toggleDetail,m=(e.index,e.visible),f=e.onCloseDrawer,d=Object(a.useMemo)(function(){return i.map(function(e){return r.a.createElement(T.a,{key:e.id,color:e.color},e.name)})},[i]),p=Object(a.useMemo)(function(){return[r.a.createElement(b.a,{type:"ellipsis",onClick:s})]},[s]),h=Object(a.useMemo)(function(){return c&&r.a.createElement(r.a.Fragment,null,r.a.createElement(M.a,{current:o.length,size:"small"},r.a.createElement(M.a.Step,{title:"\u5f00\u53d1\u4e2d",icon:r.a.createElement(b.a,{type:"tool"})}),r.a.createElement(M.a.Step,{title:"\u53d1\u5e03\u4f53\u9a8c\u7248",icon:r.a.createElement(b.a,{type:"coffee"})}),r.a.createElement(M.a.Step,{title:"\u53d1\u5e03\u7a33\u5b9a\u7248",icon:r.a.createElement(b.a,{type:"rocket",rotate:30})})),r.a.createElement(z.a,null))},[o.length,c]),E=Object(a.useRef)();return r.a.createElement("section",{tabIndex:"0",className:"trello-card",ref:E},r.a.createElement(O.a,{extra:d,actions:p,title:"\u7248\u672c\u53f7\uff1a".concat(l)},h,r.a.createElement(D.a,{gutter:16},n.length?n.map(function(e){return r.a.createElement(L.a,{span:24,key:e.id},r.a.createElement(C.a.Title,{level:4},e.name),r.a.createElement(C.a.Paragraph,null,"boolean"===typeof e.value?r.a.createElement("p",null,"\u5df2\u53d1\u5e03 ",r.a.createElement(b.a,{type:"smile",twoToneColor:!0})):e.value))}):r.a.createElement(L.a,{span:24},r.a.createElement(C.a.Paragraph,null,"\u72b6\u6001\u5f85\u66f4\u65b0")))),r.a.createElement(J,{changelog:u,container:E,visible:m,onClose:f}))},Q=n(72);function V(e,t){var n=[],a=[];return e.forEach(function(e){var r={name:t[e.idCustomField].name,id:e.id};e.value.text?a.push(Object(Q.a)({},r,{value:e.value.text})):n.push(Object(Q.a)({},r,{value:e.value.checked}))}),{process:n,fields:a}}var W=["a[href]","area[href]","input","select","textarea","button"],_=function(e){!function(e){if(!e)return!0;if(e.matches("a[href]:not([tabindex='-1']),\n  area[href]:not([tabindex='-1']),\n  input:not([disabled]):not([tabindex='-1']),\n  select:not([disabled]):not([tabindex='-1']),\n  textarea:not([disabled]):not([tabindex='-1']),\n  button:not([disabled]):not([tabindex='-1']),\n  iframe:not([tabindex='-1']),\n  [tabindex]:not([tabindex='-1']),\n  [contentEditable=true]:not([tabindex='-1'])"))return!0;var t=e.getAttribute("tabindex");return null!==t&&+t>=0}(e)?console.error("\u5f53\u524d element \u4e0d\u652f\u6301 focus\uff0c\u8bf7\u6dfb\u52a0 tabIndex\uff0c\u6216\u8005\u4f7f\u7528\u6ee1\u8db3\u6761\u4ef6\u7684\u6807\u7b7e: ".concat(W)):e.focus()};var q=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).reduce(function(e,t){return(e[t.id]=t)&&e},{})},X=function(){return fetch("https://trello.com/b/FuVtXQQ5/\u96f6\u552e\u5c0f\u7a0b\u5e8f\u7248\u672c\u8bb0\u5f55.json",{mode:"cors"}).then(function(e){return e.ok&&e.json()})},$=function(e){var t=new Date(e);return r.a.createElement(h.a,{content:r.a.createElement(g.a.Countdown,{title:"\u8fd8\u6709",value:Number(t),format:"D \u5929 H \u65f6"}),title:"\u9884\u8ba1 ".concat(t.toLocaleDateString()," \u53d1\u5e03")},r.a.createElement(b.a,{spin:!0,type:"clock-circle-o",theme:"twoTone",style:{fontSize:18}}))},G=r.a.createElement(v.a,{title:"\u5df2\u53d1\u5e03"},r.a.createElement(b.a,{type:"rocket",rotate:30,theme:"twoTone",style:{fontSize:18}})),U=function(){var e=Object(a.useState)([]),t=Object(s.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)([]),l=Object(s.a)(o,2),m=l[0],d=l[1];Object(a.useEffect)(function(){function e(){return(e=Object(i.a)(u.a.mark(function e(){var t,n,a,r;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,X();case 2:t=e.sent,n=t.cards,a=t.customFields,r=q(a),n.forEach(function(e){Object.assign(e,V(e.customFieldItems,r))}),c(n.slice(0,-1)),d(Array.from({length:n.length},function(){return!1}));case 8:case"end":return e.stop()}},e)}))).apply(this,arguments)}!function(){e.apply(this,arguments)}()},[]);var p=Object(a.useCallback)(function(e){d(function(t){return t.map(function(t,n){return n===e?!t:t})})},[]),h=Object(a.useCallback)(function(e){return d(function(t){return t.map(function(t,n){return n!==e&&t})},[])},[]),E=Object(a.useRef)();return function(e,t){var n=t.listLength,r=t.selector,c=t.onEnter,o=Object(a.useRef)(-1),l=Object(a.useRef)({key:""}),u=Object(a.useRef)([]);Object(a.useEffect)(function(){u.current=r?e.current.querySelectorAll(r):e.current.children},[e,n,r]);var i=Object(a.useCallback)(function(){var e=o.current;e<n-1&&(o.current=++e),_(u.current[e])},[n]),s=function(){var e=o.current;e<1||(o.current=--e,_(u.current[e]),e||document.body.scrollIntoView())},m=Object(a.useCallback)(function(e){var t=e.key.toLowerCase(),a=o.current;switch(t){case"tab":e.shiftKey?s():i(),e.preventDefault();break;case"arrowdown":case"j":i();break;case"arrowup":case"k":s();break;case"g":e.shiftKey?o.current=a=n-1:e.key===l.current.key&&e.metaKey===l.current.metaKey&&(o.current=a=0),_(u.current[a]);break;case"enter":c&&c(a)}l.current=e},[n,i,c]);Object(a.useEffect)(function(){if(e.current)return window.addEventListener("keydown",m),function(){return window.removeEventListener("keydown",m)}},[e,m,r])}(E,{listLength:n.length,selector:".trello-card",onEnter:p}),r.a.createElement("div",{className:"section"},r.a.createElement("section",{ref:E,className:"container card-container"},r.a.createElement("h3",{className:"title"},"\u96f6\u552e\u5c0f\u7a0b\u5e8f\u7248\u672c\u8bb0\u5f55"),n.length?r.a.createElement("main",null,r.a.createElement(f.a,null,n.map(function(e,t){return r.a.createElement(f.a.Item,{color:"green",key:e.id,dot:!e.due||e.dueComplete?G:$(e.due)},r.a.createElement(P,{name:e.name,desc:e.desc,fields:e.fields,labels:e.labels,due:e.due,dueComplete:e.dueComplete,process:e.process,visible:m[t],toggleDetail:function(){return p(t)},onCloseDrawer:function(){return h(t)},showStep:0===t}))}),!!n.length&&r.a.createElement(f.a.Item,{dot:r.a.createElement(b.a,{type:"frown",theme:"twoTone"})},"\u6d88\u5931\u5728\u5386\u53f2\u957f\u6cb3\u4e2d\u7684\u7248\u672c\u8bb0\u5f55"))):r.a.createElement(k.a,{size:"large"})))};n(313),n(314),n(315),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(U,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[133,1,2]]]);
//# sourceMappingURL=main.97fea47e.chunk.js.map