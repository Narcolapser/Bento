import React from 'react';
import './App.css';
import { Directory } from './Directory.js';
import { Editor } from './Editor.js';



function App() {
	let disp = '';
	if (window.bento_type === 'folder')
		disp = (<Directory folder={window.bento_id} name={window.bento_name}></Directory>)
	else
		disp = (<Editor document={window.bento_id} name={window.bento_name}></Editor>)
	return (
		<div className="App">
		{ disp }
		</div>
	);
}

export default App;
