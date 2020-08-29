import React from 'react';
import './App.css';
import { Directory } from './Directory.js';
import { Editor } from './Editor.js';



async function new_doc() 
{ 
	let name = prompt("Name of new document: ","Untitled"); 
	console.log(name); 
	await fetch('/api/doc/', { 
		method: 'POST', 
		mode: 'cors', 
		headers: {'Content-Type': 'application/json'}, 
		body: JSON.stringify({name:name, author:'Toben', path:'/'})}) 
		.then(function(resp) { 
			console.log('resp: '); 
			console.log(resp); 
			return resp.json(); 
		}).then(function(data) { 
			console.log(data); 
			let url = '/doc/' + data['id']; 
			console.log(url); 
			window.location = url; 
		}); 
} 

//function load_doc() 
//{ 
//	let l = document.getElementById("doc_list"); 
//	let url = "/doc/" + l.options[l.selectedIndex].value; 
//	console.log(url); 
//	window.location = url; 
//}

function App() {
	let disp = '';
	if (window.bento_type === 'folder')
		disp = (<Directory folder={window.bento_id} name={window.bento_name}></Directory>)
	else
		disp = (<Editor document={window.bento_id} name={window.bento_name}></Editor>)
	return (
		<div className="App">
		<h1>Bento!</h1> 
		<button onClick={new_doc}>New</button>
		{ disp }
		</div>
	);
}

export default App;
