import React from 'react';
import axios from 'axios';

export class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {content: '', hash: 0}
	}
	
	hashCode(str) {
		return str.split('').reduce((prevHash, currVal) =>
			(((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
	}

	async postData (content)
	{
		if (content != this.state.content)
		{
			console.log('Posting diff');
			let diff = {
				'time':new Date().getTime(),
				'content':content,
				'author':'toben',
				'document':this.props.document,
				'parent':this.state.hash
			}
			let hash = this.hashCode(JSON.stringify(diff));
			diff['hash'] = hash;
			const response = await fetch('/api/diff/' + this.props.document, {
				method: 'POST',
				mode: 'cors',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(diff)
			});
			
			this.state = {content: content, hash: hash};
		}
	}

	render() {
		return (
			<div>
				<h2>{this.props.name}</h2>
				<label for="editor">Editor</label>
				<br/>
				<textarea id="editor" name="editor" rows="10" cols="50">{this.state.content}</textarea>
				<br/>
				<a href="/">Back</a>
			</div>
		);
	}

	componentDidMount()
	{
		axios.get('/api/doc/' + this.props.document)
		.then(response => this.setState({content:response.data.head}));
	}
}