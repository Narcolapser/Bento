import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFileAlt } from '@fortawesome/free-solid-svg-icons'

export class GridView extends React.Component {
//	constructor(props) {
//		super(props);
//	}

	render() {
		let items = [];
		for(let i = 0; i < this.props.folders.length; i++)
			items.push(<Item type='folder' 
							name={this.props.folders[i].path}
							id={this.props.folders[i].id}></Item>);
		if (this.props.documents)
			for(let i = 0; i < this.props.documents.length; i++)
				items.push(<Item type={this.props.documents[i].doc_type}
								 name={this.props.documents[i].name}
								 id={this.props.documents[i].id}></Item>);
		
		return (
			<div>
				<div style={{textAlign: 'left', maxWidth: '50%', margin: 'auto', display: 'grid', gridTemplateColumns:'auto auto auto'}}>
					{ items }
				</div>
			</div>
		);
	}
}

export class Item extends React.Component {
	constructor(props) {
		super(props)
		this.state = {hover: false, menu_hover: false}
		this.hover_on = this.hover_on.bind(this);
		this.hover_off = this.hover_off.bind(this);
		this.toggleMenuHover = this.toggleMenuHover.bind(this);
		this.on_rename = this.on_rename.bind(this);
		this.move_document = this.move_document.bind(this);
		this.delete_document = this.delete_document.bind(this);
	}

	hover_on() {
		this.setState({hover: true});
	}
	
	hover_off() {
		this.setState({hover: false});
	}
	
	toggleMenuHover(){
		this.setState({menu_hover: !this.state.menu_hover});
		this.setState({hover: !this.state.hover});
	}
	
	onClick(href)
	{
		window.location = href
	}
	
	menu(event)
	{
		event.stopPropagation();
		console.log('Menu clicked');
	}
	
	on_rename(event)
	{
		console.log('renaming ' + this.props.id);
	}
	
	move_document(event)
	{
		console.log('moving ' + this.props.id);
	}
	
	delete_document(event)
	{
		console.log('deleting ' + this.props.id);
	}
	
	render() {
		let symbol = '⁉';
		let link = <p>loading...</p>;
		let href = null;
		let icon = null;
		let name = null;
		if (this.props.type === 'folder')
		{
			let pieces = this.props.name.split('/');
			href = '/folder/' + this.props.id
			icon = <FontAwesomeIcon icon={faFolder} size="6x"/>
			name = pieces[pieces.length -2]
		}
		else if (this.props.type === 'text')
		{
			href = '/doc/' + this.props.id
			icon = <FontAwesomeIcon icon={faFileAlt} size="6x"/>
			name = this.props.name
		}
		
		
		let menu_style_button = {flex:1, borderRadius: '8px'}
		if (this.state.menu_hover)
			menu_style_button['backgroundColor'] = '#606060';
		
		link = (<div onClick={() => this.onClick(href)} onMouseEnter={this.hover_on} onMouseLeave={this.hover_off}>
			<div>
				{icon}
			</div>
			<div >
				<div style={{display:'flex'}}>
					<div onClick={this.menu} onMouseEnter={this.toggleMenuHover} onMouseLeave={this.toggleMenuHover} style={menu_style_button} > <h3> ⋮ </h3></div>
					<h3 style={{flex:6}}> {name}</h3>
					<h3 style={{flex:1}}></h3>
				</div>
			</div></div>)

		let style = {
						borderStyle: "solid",
						paddingTop: "17px",
						borderRadius: "10px",
						color: 'white',
						borderColor: 'black'
					}

		if (this.state.hover)
			style['backgroundColor'] = '#505050'
		
		let menu_style = {
			position: "absolute",
			backgroundColor:'#505050',
			border: "solid 1px #ccc",
			fontSize: "12px",
			margin: "5px"}
		
		let menu_item = {
			borderBottom: "dotted 1px #ccc",
			padding: "5px 25px"
		}

		return (
			<div style={style}>
				<center>
					{link}
				</center>
				<div style={menu_style}>
					<div onclick={this.move_document} style={menu_item}>Move</div>
					<div onClick={this.on_rename} style={menu_item}>Rename</div>
					<div onclick={this.delete_document} style={menu_item}>Delete</div>
				</div>
			</div>
		);
	}
}
