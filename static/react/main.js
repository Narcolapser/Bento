(this["webpackJsonpbento-ui"]=this["webpackJsonpbento-ui"]||[]).push([[0],{27:function(e,t,n){e.exports=n(53)},32:function(e,t,n){},33:function(e,t,n){e.exports=n.p+"5d5d9eefa31e5e13a6610d9fa7a283bb.svg"},34:function(e,t,n){},53:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(20),i=n.n(r),s=(n(32),n(4),n(21),n(33),n(34),n(5)),c=n(6),l=n(8),u=n(9),d=n(2),h=n.n(d),m=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).state={folders:["/"],documents:[]},a}return Object(c.a)(n,[{key:"render",value:function(){for(var e=[],t=0;t<this.state.folders.length;t++)e.push(o.a.createElement(p,{type:"folder",name:"/",id:"1"}));for(var n=0;n<this.state.documents.length;n++)e.push(o.a.createElement(p,{type:this.state.documents[n].doc_type,name:this.state.documents[n].name,id:this.state.documents[n].id}));return o.a.createElement("div",null,o.a.createElement("h2",null,"Current path: ",this.props.folder),o.a.createElement("div",{style:{textAlign:"left",maxWidth:"50%",margin:"auto"}},e))}},{key:"componentDidMount",value:function(){var e=this;"folder"in this.props?h.a.get("/api/folder/"+this.props.folder).then((function(t){return e.setState(t.data)})):h.a.get("/api/folder/1").then((function(t){return e.setState(t.data)}))}}]),n}(o.a.Component),p=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(s.a)(this,n),a=t.call(this,e),console.log(JSON.stringify(e)),a}return Object(c.a)(n,[{key:"render",value:function(){var e="\u2049";return"folder"==this.props.type?e="\ud83d\udcc1":"text"==this.props.type&&(e="\u2403"),o.a.createElement("div",null,o.a.createElement("a",{href:"/doc/"+this.props.id},o.a.createElement("h3",null,e," ",this.props.name)))}}]),n}(o.a.Component),f=n(7),v=n.n(f),b=n(22),g=n(23),w=n(24),y=n(3),E=n(26),O=n(25),j=n(52);console.log("====================================================================================="),console.log(j);var k=function(e){Object(E.a)(n,e);var t=Object(O.a)(n);function n(e){var a;Object(g.a)(this,n),a=t.call(this,e);var o=(new Date).getTime();return a.state={content:"",old_content:"",hash:0,timestamp:o},a.updateContent=a.updateContent.bind(Object(y.a)(a)),a}return Object(w.a)(n,[{key:"hashCode",value:function(e){return e.split("").reduce((function(e,t){return(e<<5)-e+t.charCodeAt(0)|0}),0)}},{key:"postData",value:function(){var e=Object(b.a)(v.a.mark((function e(t){var n,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t==this.state.old_content){e.next=10;break}return console.log(j.createPatch("doc",this.state.old_content,t,"old header","new header",{})),console.log("Posting diff"),n={time:(new Date).getTime(),content:t,author:"toben",document:this.props.document,parent:this.state.hash},a=this.hashCode(JSON.stringify(n)),n.hash=a,e.next=8,fetch("/api/diff/"+this.props.document,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});case 8:e.sent,this.setState({content:t,hash:a,timestamp:(new Date).getTime()});case 10:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"updateContent",value:function(e){console.log(e.target.value);var t=((new Date).getTime()-this.state.timestamp)/1e3;console.log(t),t>2&&this.postData(e.target.value),this.setState({content:e.target.value})}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h2",null,this.props.name),o.a.createElement("label",{for:"editor"},"Editor"),o.a.createElement("br",null),o.a.createElement("textarea",{id:"editor",name:"editor",rows:"10",cols:"50",onChange:this.updateContent,value:this.state.content}),o.a.createElement("br",null),o.a.createElement("a",{href:"/"},"Back"))}},{key:"componentDidMount",value:function(){var e=this;h.a.get("/api/doc/"+this.props.document).then((function(t){return e.setState({content:t.data.head,old_content:t.data.head})}))}}]),n}(o.a.Component);var C=function(){var e="";return e="folder"==window.bento_type?o.a.createElement(m,{folder:window.bento_id,name:window.bento_name}):o.a.createElement(k,{document:window.bento_id,name:window.bento_name}),o.a.createElement("div",{className:"App"},o.a.createElement("h1",null,"Bento!"),e)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[27,1,2]]]);
//# sourceMappingURL=main.js.map