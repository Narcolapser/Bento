import React from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHome, faSearch } from '@fortawesome/free-solid-svg-icons'

export class MainMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let items = [];
		console.log(this.state);
		//<button onClick={new_doc}>New</button>
		//<h2>Current path: {this.props.folder}</h2>
		return (
			<div style={{width:"100%", backgroundColor:"#a0300e", height:"50px"}}>
				<div style={{width:"50px",float:"left"}}>
					<FontAwesomeIcon icon={faBars} size="3x"/>
				</div>
				<div style={{width:"50px",float:"left"}}>
					<FontAwesomeIcon icon={faHome} size="3x"/>
				</div>
				<div style={{float:"left", marginLeft:"25px", fontSize:"40px"}}>
					Home
				</div>
				<div style={{width:"50px",float:"right",marginTop:"1px"}}>
					<FontAwesomeIcon icon={faSearch} size="3x"/>
				</div>
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
