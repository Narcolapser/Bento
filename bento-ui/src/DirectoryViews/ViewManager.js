import React from "react";

export class ViewManager extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let items = [];
		console.log(this.props);
		for(let i = 0; i < this.props.folders.length; i++)
			items.push(<Item type='folder' name='/' id="1"></Item>);
		if (this.props.documents)
			for(let i = 0; i < this.props.documents.length; i++)
				items.push(<Item type={this.props.documents[i].doc_type}
								 name={this.props.documents[i].name}
								 id={this.props.documents[i].id}></Item>);
		
		return (
			<div>
				<div style={{textAlign: 'left', maxWidth: '50%', margin: 'auto'}}>
					{ items }
				</div>
			</div>
		);
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
