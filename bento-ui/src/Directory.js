import React from "react";
import axios from 'axios';
import { ViewManager } from './DirectoryViews/ViewManager.js'
import { MainMenu } from './MainMenu.js'
import { SlideMenu } from './SlideMenu.js'
import { faPlus, faFolderPlus, faCog } from '@fortawesome/free-solid-svg-icons'

export class Directory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {'folders': [], 'documents': [], 'show':false}
		this.open_menu = this.open_menu.bind(this);
	}
	
	open_menu()
	{
		console.log('opening menu');
		console.log(this.state);
		this.setState({show: !this.state.show});
	}

	
	render() {
		let items = [{icon:faPlus,text:'New File',action:new_doc},
					{icon:faFolderPlus,text:'New Folder',action:() => {alert('Coming soon!')}},
					{icon:faCog,text:'Settings',action:() => {alert('Coming soon!')}}];
		
		return (
			<div>
				<div>
					<h1 style={{width:"100%", backgroundColor:"#a0300e", margin:"0px"}}>Bento!</h1> 
					<MainMenu path={this.props.folder} open_menu={this.open_menu}></MainMenu>
				</div>
				<div>
					<SlideMenu show={this.state.show} links={items}></SlideMenu>
					<br/>
					<ViewManager folders={this.state.folders} documents={this.state.documents}></ViewManager>
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
