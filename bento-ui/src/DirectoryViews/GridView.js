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
//	constructor(props) {
//		super(props);
//	}
	
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
			
		link = (<a href={href} style={{'color':'white',textDecoration:'none'}}>
			<div >
				{icon}
			</div>
			<div >
				<div style={{display:'flex'}}>
					<h3 style={{flex:1}}></h3>
					<h3 style={{flex:8}}> {name}</h3>
					<h3 style={{flex:1}}> ⋮ </h3>
				</div>
			</div></a>)

		return (
			<div style={{borderStyle: "solid",paddingTop: "17px", borderRadius: "10px"}}>
				<center>
					{link}
				</center>
			</div>
		);
	}
}
