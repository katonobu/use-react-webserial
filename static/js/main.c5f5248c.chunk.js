(this["webpackJsonpuse-react-webserial-example"]=this["webpackJsonpuse-react-webserial-example"]||[]).push([[0],{10:function(e,n,t){},17:function(e,n,t){"use strict";t.r(n);t(10);var r=t(0),o=t.n(r),a=t(5),i=t.n(a),c=Object(r.createContext)(),s=function(){function e(){}return e.prototype.then=function(n,t){var r=new e,o=this.s;if(o){var a=1&o?n:t;if(a){try{u(r,1,a(this.v))}catch(i){u(r,2,i)}return r}return this}return this.o=function(e){try{var o=e.v;1&e.s?u(r,1,n?n(o):o):t?u(r,1,t(o)):u(r,2,o)}catch(i){u(r,2,i)}},r},e}();function u(e,n,t){if(!e.s){if(t instanceof s){if(!t.s)return void(t.o=u.bind(null,e,n));1&n&&(n=t.s),t=t.v}if(t&&t.then)return void t.then(u.bind(null,e,n),u.bind(null,e,2));e.s=n,e.v=t;var r=e.o;r&&r(e)}}function l(e){return e instanceof s&&1&e.s}"undefined"!==typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!==typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));function f(e,n,t){for(var r;;){var o=e();if(l(o)&&(o=o.v),!o)return a;if(o.then){r=0;break}var a=t();if(a&&a.then){if(!l(a)){r=1;break}a=a.s}if(n){var i=n();if(i&&i.then&&!l(i)){r=2;break}}}var c=new s,f=u.bind(null,c,2);return(0===r?o.then(v):1===r?a.then(d):i.then(h)).then(void 0,f),c;function d(r){a=r;do{if(n&&(i=n())&&i.then&&!l(i))return void i.then(h).then(void 0,f);if(!(o=e())||l(o)&&!o.v)return void u(c,1,a);if(o.then)return void o.then(v).then(void 0,f);l(a=t())&&(a=a.v)}while(!a||!a.then);a.then(d).then(void 0,f)}function v(e){e?(a=t())&&a.then?a.then(d).then(void 0,f):d(a):u(c,1,a)}function h(){(o=e())?o.then?o.then(v).then(void 0,f):v(o):u(c,1,a)}}function d(e,n){try{var t=e()}catch(r){return n(r)}return t&&t.then?t.then(void 0,n):t}var v=function(){var e,n;return function(){var t=function(){console.log("OnOpen()")},r=function(){console.log("OnClose()")},o=function(e){console.log("OnMessage(",e,")")},a=function(e){console.log(e)};console.log("webSerialIo() is called");var i=function(){e=void 0,r()};return{openPort:function(r,c){try{var s=r||[];return Promise.resolve(d((function(){return Promise.resolve(navigator.serial.requestPort({filters:s})).then((function(r){var s=c||{baudRate:115200,dataBits:8,stopBits:1,parity:"none",bufferSize:255,flowControl:"none"};return d((function(){return Promise.resolve(r.open(s)).then((function(){var c=!1;function s(){var n=function(){if(e){var n=d((function(){return Promise.resolve(e.close()).then((function(){i()}))}),(function(e){a(e)}));if(n&&n.then)return n.then((function(){}))}}();if(n&&n.then)return n.then((function(){}))}e=r,t();var u=f((function(){var n;return!(_interrupt||c)&&!(null===(n=e)||void 0===n||!n.readable)}),void 0,(function(){var t=d((function(){var t=!1;function r(){n.releaseLock(),n=void 0}n=e.readable.getReader();var a=f((function(){return!t}),void 0,(function(){return Promise.resolve(n.read()).then((function(e){var n=e.value,r=e.done;n&&o(n),r&&(t=!0)}))}));return a&&a.then?a.then(r):r()}),(function(e){a(e),c=!0}));if(t&&t.then)return t.then((function(){}))}));return u&&u.then?u.then(s):s()}))}),(function(e){a(e)}))}))}),(function(e){a(e)})))}catch(u){return Promise.reject(u)}},closePort:function(){try{var t=function(){var e=function(){if(r){var e=d((function(){return Promise.resolve(r.close()).then((function(){i()}))}),(function(e){a(e)}));if(e&&e.then)return e.then((function(){}))}}();if(e&&e.then)return e.then((function(){}))},r=e;e=void 0;var o=function(){if(n)return Promise.resolve(n.cancel()).then((function(){}))}();return Promise.resolve(o&&o.then?o.then(t):t())}catch(c){return Promise.reject(c)}},sendMessage:function(n){var t;if(null!==(t=e)&&void 0!==t&&t.writable)try{var r=e.writable.getWriter();r.write(n),r.releaseLock()}catch(o){a(o)}else a(new Error("Can't send message, serial pot may not open."))},updateCallbacks:function(e){var n=e.onOpen,i=e.onClose,c=e.onMessage,s=e.onError;n&&(t=n),i&&(r=i),c&&(o=c),s&&(a=s)}}}}()(),h=v.openPort,b=v.closePort,p=v.sendMessage,m=v.updateCallbacks,P=function(e){var n=e.children,t=e.parserMethod;return o.a.createElement(c.Provider,{value:{openPort:h,closePort:b,sendMessage:p,parserMethod:t,updateCallbacks:m}},n)},g=t(1),S=t(3),E=t.n(S),y=t(6),O=function(e){var n=e.serialAvailable,t=e.isConnected,r=e.openPort,a=e.closePort,i=e.onError,c=e.requestPortFilters,s=e.openOptions;return o.a.createElement("button",{disabled:!n,onClick:Object(y.a)(E.a.mark((function e(){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=11;break}return e.prev=1,e.next=4,a();case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),i(e.t0);case 9:e.next=12;break;case 11:try{r(c,s)}catch(n){i(n)}case 12:case"end":return e.stop()}}),e,null,[[1,6]])})))},t?"CLOSE":"OPEN")},C=function(e){var n=e.disabled,t=e.sendMessage,r=e.cmdStr,a=e.dispStr;return o.a.createElement("button",{disabled:n,onClick:function(){t((new TextEncoder).encode(r+"\r\n"))}},a)},w=function(e){var n=e.serialAvailable,t=e.isConnected,r=e.openPort,a=e.closePort,i=e.onError,c=e.sendMessage;return o.a.createElement(o.a.Fragment,null,o.a.createElement(O,{serialAvailable:n,isConnected:t,openPort:r,closePort:a,onError:i}),o.a.createElement(C,{disabled:!n||!t,sendMessage:c,cmdStr:"< TEST RSP 1000",dispStr:"1000sec"}),o.a.createElement(C,{disabled:!n||!t,sendMessage:c,cmdStr:"< TEST RSP 500",dispStr:"500sec"}),o.a.createElement(C,{disabled:!n||!t,sendMessage:c,cmdStr:"< TEST RSP 100",dispStr:"100sec"}))},k=t(8),M=Object(k.a)((function(){return Promise.all([t.e(4),t.e(3)]).then(t.bind(null,19))})),j=function(){var e=function(){var e=Object(r.useContext)(c);return{openPort:e.openPort,closePort:e.closePort,sendMessage:e.sendMessage,parserMethod:e.parserMethod,updateCallbacks:e.updateCallbacks}}(),n=e.openPort,t=e.closePort,a=e.sendMessage,i=e.updateCallbacks,s=Object(r.useCallback)((function(e){console.log(e)}),[]),u=Object(r.useState)(!0),l=Object(g.a)(u,2),f=l[0],d=l[1],v=Object(r.useState)(!1),h=Object(g.a)(v,2),b=h[0],p=h[1];Object(r.useEffect)((function(){i({onOpen:function(){console.log("onOpen()"),p(!0);var e=new TextEncoder;a(e.encode("< TEST EVT 0,100,10\r\n"))},onClose:function(){console.log("onClose()"),p(!1)},onMessage:function(e){var n=(new TextDecoder).decode(e);console.log(n),E((new Date).toLocaleString()+":"+n)},onError:s}),d("serial"in navigator)}),[i,s,a]);var m=Object(r.useState)(""),P=Object(g.a)(m,2),S=P[0],E=P[1];return Object(r.useEffect)((function(){return E("Start at "+(new Date).toLocaleString()),function(){E("End at "+(new Date).toLocaleString())}}),[]),o.a.createElement(o.a.Fragment,null,o.a.createElement(w,{serialAvailable:f,isConnected:b,openPort:n,closePort:t,onError:s,sendMessage:a}),o.a.createElement(M,{message:S}))},x=function(){return o.a.createElement(P,null,o.a.createElement(j,null))};i.a.render(o.a.createElement(x,null),document.getElementById("root"))},9:function(e,n,t){e.exports=t(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.c5f5248c.chunk.js.map