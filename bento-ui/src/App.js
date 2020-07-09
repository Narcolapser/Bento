import React from 'react';
import logo from './logo.svg';
import './App.css';

let postData = async () => 
{
	console.log('Posting diff');
	const response = await fetch('http://localhost:5000/doc1', {
		method: 'POST',
		mode: 'no-cors',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({"diff":"Content"})
	});
	console.log(response);
	return response;
}

async function new_doc() 
{ 
	let name = prompt("Name of new document: ","Untitled"); 
	console.log(name); 
	const response = await fetch('/api/doc/', { 
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

function load_doc() 
{ 
	let l = document.getElementById("doc_list"); 
	let url = "/doc/" + l.options[l.selectedIndex].value; 
	console.log(url); 
	window.location = url; 
}

function App() {
	return (
		<div className="App">
		<h1>Bento!</h1> 
		<button  onclick="new_doc()">New</button> 
		<button onclick="load_doc()">Load</button>
		
		</div>
	);
}

export default App;
