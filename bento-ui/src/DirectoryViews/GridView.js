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
		let anchor = <p>loading...</p>;
		if (this.props.type === 'folder')
		{
			let pieces = this.props.name.split('/');
			anchor = (<a href={'/folder/' + this.props.id}><h3><FontAwesomeIcon icon={faFolder} /> {pieces[pieces.length -2]}</h3></a>)
		}
		else if (this.props.type === 'text')
			anchor = (<a href={'/doc/' + this.props.id}><h3><FontAwesomeIcon icon={faFileAlt} /> {this.props.name}</h3></a>)

		return (
			<div style={{height: '200px'}}>
				{anchor}
			</div>
		);
	}
}
