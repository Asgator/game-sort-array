(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{32:function(e,t,a){e.exports=a.p+"static/media/finger.af9530c9.png"},35:function(e,t,a){e.exports=a(81)},40:function(e,t,a){},80:function(e,t,a){},81:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(24),i=a.n(s),o=(a(40),a(25)),c=a(26),l=a(33),u=a(27),m=a(34),d=a(28),h=a.n(d),f=a(29),v=a.n(f),g=a(30),p=a.n(g),b=a(31),y=a.n(b),N=a(10),O=a.n(N),w=a(32),E=a.n(w),S=(a(80),Number(localStorage.getItem("savedLength"))||1),I=localStorage.getItem("savedNumbers")?JSON.parse(localStorage.getItem("savedNumbers")):{},k=function(e){return Array(e).fill(e).map(function(e,t){return t})},T=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),j=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).handleToggle=function(){e.checkArray()},e.shuffle=function(e,t){var a=k(e),n=a.filter(function(e){return!t[e]});return n=y()(p()(n,6).map(function(e){return v()(e)})),a.map(function(e){return t[e]?e:n.shift()})},e.handleOnDown=function(t){t.currentTarget.classList.add("press-finger");var a=k(e.state.length),n={},r=Object.keys(e.state.savedNumbers).length;clearInterval(e.timer);var s=e.state.array.every(function(e,t){var s=e===a[t];return s?(n[e]=!0,s):(r===t&&(n={}),s)}),i=e.state.length;s?(n={},i++):O()(n)&&O()(e.state.savedNumbers)&&i--,localStorage.setItem("savedLength",i),localStorage.setItem("savedNumbers",JSON.stringify(n)),e.setState({array:e.shuffle(i,n),length:i,savedNumbers:n}),e.startTimer(i)},e.handleOnUp=function(e){return e.currentTarget.classList.remove("press-finger")},e.renderItem=function(t){return r.a.createElement("div",{key:t,className:h()("item",{active:e.state.savedNumbers[t]})},t)},e.state={array:e.shuffle(S,I),length:S,savedNumbers:I},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.startTimer(this.state.length)}},{key:"startTimer",value:function(e){var t=this,a=800-15*e;this.timer=setInterval(function(){t.setState({array:t.shuffle(t.state.length,t.state.savedNumbers)})},a<350?350:a)}},{key:"render",value:function(){var e=this.state.array;return r.a.createElement("div",{className:"wrapper"},r.a.createElement("div",{className:"title"},"Easy sort array"),r.a.createElement("div",{className:"sub-title"},"level:",r.a.createElement("div",{className:"points"}," ",this.state.length-1)),r.a.createElement("div",{className:"array"},e.map(this.renderItem)),r.a.createElement("img",{src:E.a,alt:"finger",onMouseDown:T?void 0:this.handleOnDown,onMouseUp:T?void 0:this.handleOnUp,onTouchStart:T?this.handleOnDown:void 0,onTouchEnd:T?this.handleOnUp:void 0,className:"finger"}))}}]),t}(r.a.Component);i.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[35,1,2]]]);
//# sourceMappingURL=main.553ac08b.chunk.js.map