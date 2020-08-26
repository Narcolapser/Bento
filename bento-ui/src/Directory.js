import React from "react";
import axios from 'axios'

export class Directory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {'folders': ['/'], 'documents': []};
	}

	render() {
		let items = [];
		for(let i = 0; i < this.state.folders.length; i++)
			items.push(<Item type='folder' name='/' id="1"></Item>);
		for(let i = 0; i < this.state.documents.length; i++)
			items.push(<Item type={this.state.documents[i].doc_type}
							 name={this.state.documents[i].name}
							 id={this.state.documents[i].id}></Item>);
		
		return (
			<div>
				<h2>Current path: {this.props.folder}</h2>
				<div style={{textAlign: 'left', maxWidth: '50%', margin: 'auto'}}>
					{ items }
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
