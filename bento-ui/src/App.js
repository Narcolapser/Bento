import React from 'react';
import logo from './logo.svg';
import './App.css';

let postData = async () => 
{
	console.log('Posting diff');
	const response = await fetch('http://localhost:5000/doc1', {
		method: 'POST',
		mode: 'no-cors',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({"diff":"Content"})
	});
	console.log(response);
	return response;
}

function App() {
	return (
		<div className="App">
			<h1>Bento!</h1>
			<label>Editor</label>
			<br/>
			<textarea id="editor" name="editor" rows="10" cols="50"></textarea>
			<button onClick={postData}>Save</button>
			<br/>
		</div>
	);
}

export default App;
