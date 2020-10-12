(this["webpackJsonpbento-ui"]=this["webpackJsonpbento-ui"]||[]).push([[0],{31:function(t,e,n){t.exports=n(74)},36:function(t,e,n){},37:function(t,e,n){},70:function(t,e){},74:function(t,e,n){"use strict";n.r(e);var o=n(0),a=n.n(o),i=n(29),r=n.n(i),s=(n(36),n(37),n(9)),c=n.n(s),l=n(13),u=n(2),h=n(3),d=n(11),p=n(5),f=n(4),m=n(8),v=n.n(m),g=n(12),k=n(10),b=function(t){Object(p.a)(n,t);var e=Object(f.a)(n);function n(){return Object(u.a)(this,n),e.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){for(var t=[],e=0;e<this.props.folders.length;e++)t.push(a.a.createElement(y,{type:"folder",name:this.props.folders[e].path,id:this.props.folders[e].id}));if(this.props.documents)for(var n=0;n<this.props.documents.length;n++)t.push(a.a.createElement(y,{type:this.props.documents[n].doc_type,name:this.props.documents[n].name,id:this.props.documents[n].id}));return a.a.createElement("div",null,a.a.createElement("div",{style:{textAlign:"left",maxWidth:"50%",margin:"auto",display:"grid",gridTemplateColumns:"auto auto auto"}},t))}}]),n}(a.a.Component),y=function(t){Object(p.a)(n,t);var e=Object(f.a)(n);function n(){return Object(u.a)(this,n),e.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var t,e=null,n=null,o=null;if("folder"===this.props.type){var i=this.props.name.split("/");e="/folder/"+this.props.id,n=a.a.createElement(g.a,{icon:k.d,size:"6x"}),o=i[i.length-2]}else"text"===this.props.type&&(e="/doc/"+this.props.id,n=a.a.createElement(g.a,{icon:k.c,size:"6x"}),o=this.props.name);return t=a.a.createElement("a",{href:e,style:{color:"white",textDecoration:"none"}},a.a.createElement("div",null,n),a.a.createElement("div",null,a.a.createElement("h3",null," ",o))),a.a.createElement("div",null,a.a.createElement("center",null,t))}}]),n}(a.a.Component),w=function(t){Object(p.a)(n,t);var e=Object(f.a)(n);function n(t){var o;return Object(u.a)(this,n),(o=e.call(this,t)).state={view:"Grid"},o}return Object(h.a)(n,[{key:"render",value:function(){var t=a.a.createElement("p",null,"loading...");return"Grid"===this.state.view&&(t=a.a.createElement(b,{folders:this.props.folders,documents:this.props.documents})),a.a.createElement("div",null,t)}}]),n}(a.a.Component),E=function(t){Object(p.a)(n,t);var e=Object(f.a)(n);function n(t){var o;return Object(u.a)(this,n),(o=e.call(this,t)).state={hover:!1},o.toggleHover=o.toggleHover.bind(Object(d.a)(o)),o}return Object(h.a)(n,[{key:"toggleHover",value:function(){this.setState({hover:!this.state.hover})}},{key:"render",value:function(){var t={width:"50px",float:this.props.float};return this.state.hover&&(t.backgroundColor="#ba5739"),a.a.createElement("div",{style:t,onMouseEnter:this.toggleHover,onMouseLeave:this.toggleHover,onClick:this.props.onClick},a.a.createElement(g.a,{icon:this.props.icon,size:"3x"}))}}]),n}(a.a.Component),j=function(t){Object(p.a)(n,t);var e=Object(f.a)(n);function n(t){return Object(u.a)(this,n),e.call(this,t)}return Object(h.a)(n,[{key:"go_home",value:function(){window.location.href="/"}},{key:"render",value:function(){return console.log(this.state),a.a.createElement("div",{style:{width:"100%",backgroundColor:"#a0300e",height:"50px"}},a.a.createElement(E,{icon:k.a,float:"left",onClick:this.props.open_menu}," "),a.a.createElement(E,{icon:k.f,float:"left",onClick:this.go_home}," "),a.a.createElement("div",{style:{float:"left",marginLeft:"25px",fontSize:"40px"}},"Home"))}},{key:"componentDidMount",value:function(){var t=this;"folder"in this.props?v.a.get("/api/folder/"+this.props.folder).then((function(e){return t.setState(e.data)})):v.a.get("/api/folder/1").then((function(e){return t.setState(e.data)}))}}]),n}(a.a.Component);var O=function(t){Object(p.a)(n,t);var e=Object(f.a)(n);function n(){return Object(u.a)(this,n),e.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var t={width:"300px",position:"absolute",height:"100%",backgroundColor:"#ba5739"};this.props.show?t.display="block":t.display="none",console.log("rendering items");for(var e=[],n=0;n<this.props.links.length;n++)e.push(a.a.createElement("div",{style:{display:"flex"},onClick:this.props.links[n].action},a.a.createElement(g.a,{icon:this.props.links[n].icon,size:"3x",style:{flex:1}}),a.a.createElement("span",{style:{flex:3,fontSize:"40px"}},this.props.links[n].text)));return console.log(e),a.a.createElement("div",{style:t},e)}}]),n}(a.a.Component),_=function(t){Object(p.a)(n,t);var e=Object(f.a)(n);function n(t){var o;return Object(u.a)(this,n),(o=e.call(this,t)).state={folders:[],documents:[],show:!1},o.open_menu=o.open_menu.bind(Object(d.a)(o)),o}return Object(h.a)(n,[{key:"open_menu",value:function(){console.log("opening menu"),console.log(this.state),this.setState({show:!this.state.show})}},{key:"render",value:function(){var t=[{icon:k.g,text:"New File",action:C},{icon:k.e,text:"New Folder",action:function(){alert("Coming soon!")}},{icon:k.b,text:"Settings",action:function(){alert("Coming soon!")}}];return a.a.createElement("div",null,a.a.createElement("div",null,a.a.createElement("h1",{style:{width:"100%",backgroundColor:"#a0300e",margin:"0px"}},"Bento!"),a.a.createElement(j,{path:this.props.folder,open_menu:this.open_menu})),a.a.createElement("div",null,a.a.createElement(O,{show:this.state.show,links:t}),a.a.createElement("br",null),a.a.createElement(w,{folders:this.state.folders,documents:this.state.documents})))}},{key:"componentDidMount",value:function(){var t=this;"folder"in this.props?v.a.get("/api/folder/"+this.props.folder).then((function(e){return t.setState(e.data)})):v.a.get("/api/folder/1").then((function(e){return t.setState(e.data)}))}}]),n}(a.a.Component);function C(){return x.apply(this,arguments)}function x(){return(x=Object(l.a)(c.a.mark((function t(){var e;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=prompt("Name of new document: ","Untitled"),console.log(e),t.next=4,fetch("/api/doc/",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,author:"Toben",path:"/"})}).then((function(t){return console.log("resp: "),console.log(t),t.json()})).then((function(t){console.log(t);var e="/doc/"+t.id;console.log(e),window.location=e}));case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var S=n(30),D=n.n(S),T=(n(72),n(73)),z=function(t){Object(p.a)(n,t);var e=Object(f.a)(n);function n(t){var o;Object(u.a)(this,n),o=e.call(this,t);var a=(new Date).getTime();return o.state={content:"",old_content:"loading...",hash:0,timestamp:a,diff_stack:[],checking:!1},o.updateContent=o.updateContent.bind(Object(d.a)(o)),o}return Object(h.a)(n,[{key:"hashCode",value:function(t){return t.split("").reduce((function(t,e){return(t<<5)-t+e.charCodeAt(0)|0}),0)}},{key:"postData",value:function(){var t=Object(l.a)(c.a.mark((function t(){var e,n,o,a,i,r=this;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.state.content!==this.state.old_content&&(console.log("Start"),console.log(this.state.old_content),console.log(this.state.content),console.log(this.state.diff_stack),console.log("end"),e=T.createPatch("doc",this.state.old_content,this.state.content,"old header","new header",{context:0}),(n=e.split("\n")).splice(0,4),e=n.join("\n"),console.log(e),console.log("Posting diff"),o={time:(new Date).getTime(),content:e,author:"toben",document:this.props.document,parent:this.state.diff_stack[this.state.diff_stack.length-1].diff_hash},a=this.hashCode(JSON.stringify(o)),o.diff_hash=a,(i=this.state.diff_stack).push(o),this.setState({hash:a,timestamp:(new Date).getTime(),old_content:this.state.content,diff_stack:i}),v.a.post("/api/diff/"+this.props.document,o).then((function(t){"failure"===t.data.status&&"The diff provided as parent did not exist."===t.data.reason&&r.postStack()})));case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"postStack",value:function(){var t=Object(l.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:v.a.post("/api/diffs/"+this.props.document,this.state.diff_stack).then((function(t){console.log("Stack posted"),console.log(t)}));case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"updateContent",value:function(t){this.setState({content:t})}},{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("h2",null,this.props.name),a.a.createElement("br",null),a.a.createElement(D.a,{id:"editor",name:"editor",style:{textAlign:"left"},onChange:this.updateContent,value:this.state.content,spellChecker:"false"}),a.a.createElement("br",null),a.a.createElement("a",{href:"/"},"Back"))}},{key:"fillContent",value:function(t){var e=this;console.log(t);var n=t[0].head;null==n&&(n=""),this.setState({content:n,old_content:n,diff_stack:[t[1]]}),setInterval((function(){e.check()}),2e3)}},{key:"componentDidMount",value:function(){var t=this;v.a.get("/api/doc/"+this.props.document).then((function(e){return t.fillContent(e.data)}))}},{key:"pullData",value:function(){var t=this;v.a.get("/api/diff/"+this.props.document).then((function(e){if(e.data.diff_hash!==t.state.diff_stack[t.state.diff_stack.length-1].diff_hash){for(var n=[],o=0;o<t.state.diff_stack.length;o++)n.push(t.state.diff_stack[o].diff_hash);n.includes(e.data.diff_hash)||v.a.get("/api/doc/"+t.props.document).then((function(e){return t.fillContent(e.data)}))}}))}},{key:"check",value:function(){try{if(this.state.checking)return!1;this.setState({checking:!0}),this.postData(),this.pullData(),this.setState({checking:!1})}catch(t){console.error(t)}}}]),n}(a.a.Component);var H=function(){var t="";return t="folder"===window.bento_type?a.a.createElement(_,{folder:window.bento_id,name:window.bento_name}):a.a.createElement(z,{document:window.bento_id,name:window.bento_name}),a.a.createElement("div",{className:"App"},t)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(H,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[31,1,2]]]);
//# sourceMappingURL=main.js.map