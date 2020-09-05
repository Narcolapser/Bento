import React from "react";
import axios from 'axios';
import { ViewManager } from './DirectoryViews/ViewManager.js'

export class Directory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {'folders': ['/'], 'documents': []};
	}

	render() {
		let items = [];
		
		return (
			<div>
				<h1>Bento!</h1> 
				<button onClick={new_doc}>New</button>
				<h2>Current path: {this.props.folder}</h2>
				<ViewManager folders={this.state.folders} documents={this.state.documents}></ViewManager>
			</div>
		);
	}

	componentDidMount()
	{
		if('folder' in this.props)
			axios.get('/api/folder/' + this.props.folder)
			.then(response => this.setState(response.data));
		else
			axios.get('/api/folder/1')
			.then(response => this.setState(response.data));
	}
}

export class Item extends React.Component {
	constructor(props) {
		super(props);
		console.log(JSON.stringify(props))
	}
	
	render() {
		let symbol = '⁉';
		if (this.props.type === 'folder')
			symbol = '📁';
		else if (this.props.type === 'text')
			symbol = '␃';

		return (
			<div>
				<a href={'/doc/' + this.props.id}><h3>{symbol} {this.props.name}</h3></a>
			</div>
		);
	}
}

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
