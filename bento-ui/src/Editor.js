import React from 'react';
import axios from 'axios';
//import Diff from 'diff';
let Diff = require('diff');

export class Editor extends React.Component {
	constructor(props) {
		super(props);
		let time = new Date().getTime();
		this.state = {content: '', old_content: '', hash: 0, timestamp: time}
		this.updateContent = this.updateContent.bind(this);
	}
	
	hashCode(str) {
		return str.split('').reduce((prevHash, currVal) =>
			(((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
	}
	

	async postData (content)
	{
		if (content != this.state.old_content)
		{
			let patch = Diff.createPatch('doc',this.state.old_content, content, 'old header','new header', {context:1});

			// Trim extra lines out of the patch.
			let patch_lines = patch.split('\n');
			patch_lines.splice(0,2);
			patch = patch_lines.join('\n');
			
			console.log(patch);
			console.log('Posting diff');
			let diff = {
				'time':new Date().getTime(),
				'content':patch,
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
			
			this.setState({content: content, hash: hash, timestamp:new Date().getTime(), old_content: content});
		}
	}
	updateContent(event)
	{
		console.log(event.target.value);
		let time = (new Date().getTime() - this.state.timestamp) / 1000;
		console.log(time);
		if (time > 2) // increase this value to decrease refresh rate. 
			this.postData(event.target.value);
		this.setState({content: event.target.value});
	}

	render() {
		return (
			<div>
				<h2>{this.props.name}</h2>
				<label for="editor">Editor</label>
				<br/>
				<textarea id="editor" name="editor" rows="10" cols="50"
					onChange={this.updateContent} value={this.state.content} />
				<br/>
				<a href="/">Back</a>
			</div>
		);
	}

	componentDidMount()
	{
		axios.get('/api/doc/' + this.props.document)
		.then(response => this.setState({content:response.data.head,old_content:response.data.head}));
	}
}
