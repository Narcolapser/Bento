(this["webpackJsonpbento-ui"]=this["webpackJsonpbento-ui"]||[]).push([[0],{29:function(t,e,n){t.exports=n(70)},34:function(t,e,n){},36:function(t,e,n){t.exports=n.p+"5d5d9eefa31e5e13a6610d9fa7a283bb.svg"},37:function(t,e,n){},66:function(t,e){},70:function(t,e,n){"use strict";n.r(e);var o=n(0),a=n.n(o),c=n(23),i=n.n(c),r=(n(34),n(3)),s=n.n(r),l=n(5),u=(n(36),n(37),n(7)),h=n(8),d=n(9),f=n(10),p=n(4),m=n.n(p),v=function(t){Object(f.a)(n,t);var e=Object(d.a)(n);function n(t){var o;return Object(u.a)(this,n),(o=e.call(this,t)).state={folders:["/"],documents:[]},o}return Object(h.a)(n,[{key:"render",value:function(){for(var t=[],e=0;e<this.state.folders.length;e++)t.push(a.a.createElement(g,{type:"folder",name:"/",id:"1"}));for(var n=0;n<this.state.documents.length;n++)t.push(a.a.createElement(g,{type:this.state.documents[n].doc_type,name:this.state.documents[n].name,id:this.state.documents[n].id}));return a.a.createElement("div",null,a.a.createElement("h2",null,"Current path: ",this.props.folder),a.a.createElement("div",{style:{textAlign:"left",maxWidth:"50%",margin:"auto"}},t))}},{key:"componentDidMount",value:function(){var t=this;"folder"in this.props?m.a.get("/api/folder/"+this.props.folder).then((function(e){return t.setState(e.data)})):m.a.get("/api/folder/1").then((function(e){return t.setState(e.data)}))}}]),n}(a.a.Component),g=function(t){Object(f.a)(n,t);var e=Object(d.a)(n);function n(t){var o;return Object(u.a)(this,n),o=e.call(this,t),console.log(JSON.stringify(t)),o}return Object(h.a)(n,[{key:"render",value:function(){var t="\u2049";return"folder"==this.props.type?t="\ud83d\udcc1":"text"==this.props.type&&(t="\u2403"),a.a.createElement("div",null,a.a.createElement("a",{href:"/doc/"+this.props.id},a.a.createElement("h3",null,t," ",this.props.name)))}}]),n}(a.a.Component),k=n(24),b=n(25),w=n(6),y=n(28),E=n(27),_=n(26),O=n.n(_),j=(n(68),n(69)),C=function(t){Object(y.a)(n,t);var e=Object(E.a)(n);function n(t){var o;Object(k.a)(this,n),o=e.call(this,t);var a=(new Date).getTime();return o.state={content:"",old_content:"loading...",hash:0,timestamp:a,diff_stack:[]},o.updateContent=o.updateContent.bind(Object(w.a)(o)),o}return Object(b.a)(n,[{key:"hashCode",value:function(t){return t.split("").reduce((function(t,e){return(t<<5)-t+e.charCodeAt(0)|0}),0)}},{key:"postData",value:function(){var t=Object(l.a)(s.a.mark((function t(){var e,n,o,a,c,i=this;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.state.content!==this.state.old_content&&(console.log("Start"),console.log(this.state.old_content),console.log(this.state.content),console.log("end"),e=j.createPatch("doc",this.state.old_content,this.state.content,"old header","new header",{context:0}),(n=e.split("\n")).splice(0,4),e=n.join("\n"),console.log(e),console.log("Posting diff"),o={time:(new Date).getTime(),content:e,author:"toben",document:this.props.document,parent:this.state.diff_stack[this.state.diff_stack.length-1].diff_hash},a=this.hashCode(JSON.stringify(o)),o.diff_hash=a,(c=this.state.diff_stack).push(o),this.setState({hash:a,timestamp:(new Date).getTime(),old_content:this.state.content,diff_stack:c}),m.a.post("/api/diff/"+this.props.document,o).then((function(t){"failure"===t.data.status&&"The diff provided as parent did not exist."===t.data.reason&&i.postStack()})));case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"postStack",value:function(){var t=Object(l.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:m.a.post("/api/diffs/"+this.props.document,this.state.diff_stack).then((function(t){console.log("Stack posted"),console.log(t)}));case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"updateContent",value:function(t){this.setState({content:t})}},{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("h2",null,this.props.name),a.a.createElement("br",null),a.a.createElement(O.a,{id:"editor",name:"editor",style:{textAlign:"left"},onChange:this.updateContent,value:this.state.content}),a.a.createElement("br",null),a.a.createElement("a",{href:"/"},"Back"))}},{key:"fillContent",value:function(t){var e=this;console.log(t);var n=t[0].head;null==n&&(n=""),this.setState({content:n,old_content:n,diff_stack:[t[1]]}),this.checking=!1,setInterval((function(){e.check()}),2e3)}},{key:"componentDidMount",value:function(){var t=this;m.a.get("/api/doc/"+this.props.document).then((function(e){return t.fillContent(e.data)}))}},{key:"check",value:function(){try{if(this.checking)return!1;this.checking=!0,console.log("check running"),console.log(this),this.postData(),this.checking=!1}catch(t){console.error(t)}}}]),n}(a.a.Component);function S(){return x.apply(this,arguments)}function x(){return(x=Object(l.a)(s.a.mark((function t(){var e;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=prompt("Name of new document: ","Untitled"),console.log(e),t.next=4,fetch("/api/doc/",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,author:"Toben",path:"/"})}).then((function(t){return console.log("resp: "),console.log(t),t.json()})).then((function(t){console.log(t);var e="/doc/"+t.id;console.log(e),window.location=e}));case 4:t.sent;case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var D=function(){var t="";return t="folder"==window.bento_type?a.a.createElement(v,{folder:window.bento_id,name:window.bento_name}):a.a.createElement(C,{document:window.bento_id,name:window.bento_name}),a.a.createElement("div",{className:"App"},a.a.createElement("h1",null,"Bento!"),a.a.createElement("button",{onClick:S},"New"),t)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[29,1,2]]]);
//# sourceMappingURL=main.js.map