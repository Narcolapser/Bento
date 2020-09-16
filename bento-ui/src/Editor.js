import React from 'react';
import axios from 'axios';
//import Diff from 'diff';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
let Diff = require('diff');


export class Editor extends React.Component {
	constructor(props) {
		super(props);
		let time = new Date().getTime();
		this.state = {content: '', old_content: 'loading...', hash: 0, timestamp: time, diff_stack: [], checking:false}
		this.updateContent = this.updateContent.bind(this);
	}
	
	hashCode(str) {
		return str.split('').reduce((prevHash, currVal) =>
			(((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
	}
	

	async postData ()
	{
		if (this.state.content !== this.state.old_content)
		{
			console.log('Start');
			console.log(this.state.old_content);
			console.log(this.state.content);
			console.log(this.state.diff_stack);
			console.log('end');
			let patch = Diff.createPatch('doc',this.state.old_content, this.state.content, 'old header','new header', {context:0});

			// Trim extra lines out of the patch.
			let patch_lines = patch.split('\n');
			patch_lines.splice(0,4);
			patch = patch_lines.join('\n');
			
			console.log(patch);
			console.log('Posting diff');
			let diff = {
				'time':new Date().getTime(),
				'content':patch,
				'author':'toben',
				'document':this.props.document,
				'parent':this.state.diff_stack[this.state.diff_stack.length-1].diff_hash
			}
			let hash = this.hashCode(JSON.stringify(diff));
			diff['diff_hash'] = hash;
			
			let diff_stack = this.state.diff_stack;
			diff_stack.push(diff)
			this.setState({hash: hash, timestamp:new Date().getTime(), old_content: this.state.content, diff_stack: diff_stack});
			
			axios.post('/api/diff/' + this.props.document, diff)
			.then((response) => {
				if (response.data.status === 'failure')
				{
					if (response.data.reason === 'The diff provided as parent did not exist.')
						this.postStack();
				}
			});
		}
	}
	
	async postStack()
	{
		axios.post('/api/diffs/' + this.props.document, this.state.diff_stack)
		.then((response) => {console.log("Stack posted"); console.log(response);});
	}
	updateContent(value)
	{
//		console.log(value);
//		console.log(this.state.diff_stack);
//		let time = (new Date().getTime() - this.state.timestamp) / 1000;
//		console.log(time);
//		if (time > 2) // increase this value to decrease refresh rate. 
//			this.postData(value);
		this.setState({content: value});
	}

	render() {
		return (
			<div>
				<h2>{this.props.name}</h2>
				<br/>
				<SimpleMDE id="editor" name="editor" style={{textAlign:'left'}}
					onChange={this.updateContent} value={this.state.content} spellChecker="false"/>
				<br/>
				<a href="/">Back</a>
			</div>
		);
	}
	
	fillContent(data)
	{
		console.log(data);
		let c = data[0].head;
		if (c == null)
			c = '';
		this.setState({content:c,old_content:c,diff_stack:[data[1]]});
		setInterval(() => {this.check()},2000);
	}

	componentDidMount()
	{
		axios.get('/api/doc/' + this.props.document)
		.then(response => this.fillContent(response.data));
	}
	
	pullData()
	{
		axios.get('/api/diff/' + this.props.document)
		.then(response => {
			if (response.data.diff_hash !== this.state.diff_stack[this.state.diff_stack.length-1].diff_hash)
			{
				let hashes = [];
				for(let i = 0; i < this.state.diff_stack.length; i++)
					hashes.push(this.state.diff_stack[i].diff_hash);
				//The remote document has changed!
				if (!hashes.includes(response.data.diff_hash))
					axios.get('/api/doc/' + this.props.document)
					.then(response => this.fillContent(response.data));
			}
		});
	}
	
	check()
	{
		try
		{
			// Don't run if the previous check method is still running.
			if (this.state.checking)
				return false

			this.setState({checking:true});
			// Post current data
			this.postData();
			
			// Check for updates from the server
			this.pullData();
			
			this.setState({checking:false});
		}
		catch (error)
		{
			console.error(error);
		}
	}
}
