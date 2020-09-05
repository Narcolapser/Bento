(this["webpackJsonpbento-ui"]=this["webpackJsonpbento-ui"]||[]).push([[0],{25:function(t,e,n){t.exports=n(65)},30:function(t,e,n){},31:function(t,e,n){},61:function(t,e){},65:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),s=n(23),i=n.n(s),r=(n(30),n(31),n(8)),c=n.n(r),l=n(9),u=n(4),h=n(5),d=n(7),f=n(6),p=n(3),m=n.n(p),v=function(t){Object(d.a)(n,t);var e=Object(f.a)(n);function n(t){return Object(u.a)(this,n),e.call(this,t)}return Object(h.a)(n,[{key:"render",value:function(){var t=[];console.log(this.props);for(var e=0;e<this.props.folders.length;e++)t.push(o.a.createElement(g,{type:"folder",name:"/",id:"1"}));if(this.props.documents)for(var n=0;n<this.props.documents.length;n++)t.push(o.a.createElement(g,{type:this.props.documents[n].doc_type,name:this.props.documents[n].name,id:this.props.documents[n].id}));return o.a.createElement("div",null,o.a.createElement("h2",null,"Current path: ",this.props.folder),o.a.createElement("div",{style:{textAlign:"left",maxWidth:"50%",margin:"auto"}},t))}}]),n}(o.a.Component),g=function(t){Object(d.a)(n,t);var e=Object(f.a)(n);function n(t){var a;return Object(u.a)(this,n),a=e.call(this,t),console.log(JSON.stringify(t)),a}return Object(h.a)(n,[{key:"render",value:function(){var t="\u2049";return"folder"===this.props.type?t="\ud83d\udcc1":"text"===this.props.type&&(t="\u2403"),o.a.createElement("div",null,o.a.createElement("a",{href:"/doc/"+this.props.id},o.a.createElement("h3",null,t," ",this.props.name)))}}]),n}(o.a.Component),k=function(t){Object(d.a)(n,t);var e=Object(f.a)(n);function n(t){var a;return Object(u.a)(this,n),(a=e.call(this,t)).state={folders:["/"],documents:[]},a}return Object(h.a)(n,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"Bento!"),o.a.createElement("button",{onClick:b},"New"),o.a.createElement("h2",null,"Current path: ",this.props.folder),o.a.createElement(v,{folders:this.state.folders,documents:this.state.documents}))}},{key:"componentDidMount",value:function(){var t=this;"folder"in this.props?m.a.get("/api/folder/"+this.props.folder).then((function(e){return t.setState(e.data)})):m.a.get("/api/folder/1").then((function(e){return t.setState(e.data)}))}}]),n}(o.a.Component);o.a.Component;function b(){return y.apply(this,arguments)}function y(){return(y=Object(l.a)(c.a.mark((function t(){var e;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=prompt("Name of new document: ","Untitled"),console.log(e),t.next=4,fetch("/api/doc/",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,author:"Toben",path:"/"})}).then((function(t){return console.log("resp: "),console.log(t),t.json()})).then((function(t){console.log(t);var e="/doc/"+t.id;console.log(e),window.location=e}));case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var w=n(10),_=n(24),E=n.n(_),O=(n(63),n(64)),j=function(t){Object(d.a)(n,t);var e=Object(f.a)(n);function n(t){var a;Object(u.a)(this,n),a=e.call(this,t);var o=(new Date).getTime();return a.state={content:"",old_content:"loading...",hash:0,timestamp:o,diff_stack:[],checking:!1},a.updateContent=a.updateContent.bind(Object(w.a)(a)),a}return Object(h.a)(n,[{key:"hashCode",value:function(t){return t.split("").reduce((function(t,e){return(t<<5)-t+e.charCodeAt(0)|0}),0)}},{key:"postData",value:function(){var t=Object(l.a)(c.a.mark((function t(){var e,n,a,o,s,i=this;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.state.content!==this.state.old_content&&(console.log("Start"),console.log(this.state.old_content),console.log(this.state.content),console.log(this.state.diff_stack),console.log("end"),e=O.createPatch("doc",this.state.old_content,this.state.content,"old header","new header",{context:0}),(n=e.split("\n")).splice(0,4),e=n.join("\n"),console.log(e),console.log("Posting diff"),a={time:(new Date).getTime(),content:e,author:"toben",document:this.props.document,parent:this.state.diff_stack[this.state.diff_stack.length-1].diff_hash},o=this.hashCode(JSON.stringify(a)),a.diff_hash=o,(s=this.state.diff_stack).push(a),this.setState({hash:o,timestamp:(new Date).getTime(),old_content:this.state.content,diff_stack:s}),m.a.post("/api/diff/"+this.props.document,a).then((function(t){"failure"===t.data.status&&"The diff provided as parent did not exist."===t.data.reason&&i.postStack()})));case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"postStack",value:function(){var t=Object(l.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:m.a.post("/api/diffs/"+this.props.document,this.state.diff_stack).then((function(t){console.log("Stack posted"),console.log(t)}));case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"updateContent",value:function(t){this.setState({content:t})}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h2",null,this.props.name),o.a.createElement("br",null),o.a.createElement(E.a,{id:"editor",name:"editor",style:{textAlign:"left"},onChange:this.updateContent,value:this.state.content}),o.a.createElement("br",null),o.a.createElement("a",{href:"/"},"Back"))}},{key:"fillContent",value:function(t){var e=this;console.log(t);var n=t[0].head;null==n&&(n=""),this.setState({content:n,old_content:n,diff_stack:[t[1]]}),setInterval((function(){e.check()}),2e3)}},{key:"componentDidMount",value:function(){var t=this;m.a.get("/api/doc/"+this.props.document).then((function(e){return t.fillContent(e.data)}))}},{key:"pullData",value:function(){var t=this;m.a.get("/api/diff/"+this.props.document).then((function(e){if(e.data.diff_hash!==t.state.diff_stack[t.state.diff_stack.length-1].diff_hash){for(var n=[],a=0;a<t.state.diff_stack.length;a++)n.push(t.state.diff_stack[a].diff_hash);n.includes(e.data.diff_hash)||m.a.get("/api/doc/"+t.props.document).then((function(e){return t.fillContent(e.data)}))}}))}},{key:"check",value:function(){try{if(this.state.checking)return!1;this.setState({checking:!0}),this.postData(),this.pullData(),this.setState({checking:!1})}catch(t){console.error(t)}}}]),n}(o.a.Component);var C=function(){var t="";return t="folder"===window.bento_type?o.a.createElement(k,{folder:window.bento_id,name:window.bento_name}):o.a.createElement(j,{document:window.bento_id,name:window.bento_name}),o.a.createElement("div",{className:"App"},t)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[25,1,2]]]);
//# sourceMappingURL=main.js.map