import React from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHome, faSearch } from '@fortawesome/free-solid-svg-icons'
import { BentoButton } from './BentoButton.js'

export class MainMenu extends React.Component {
	constructor(props) {
		super(props);
	}
	
	go_home()
	{
		console.log('Going home!');
		window.location.href="/";
	}

	render() {
		let items = [];
		console.log(this.state);
		//<button onClick={new_doc}>New</button>
		//<h2>Current path: {this.props.folder}</h2>
		return (
			<div style={{width:"100%", backgroundColor:"#a0300e", height:"50px"}}>
				<BentoButton icon={faBars} float="left"> </BentoButton>
				<BentoButton icon={faHome} float="left" onClick={this.go_home}> </BentoButton>
				<div style={{float:"left", marginLeft:"25px", fontSize:"40px"}}>
					Home
				</div>
				<BentoButton icon={faSearch} float="right"> </BentoButton>
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
