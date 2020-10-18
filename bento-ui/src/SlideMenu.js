import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class SlideMenu extends React.Component {

	render() {
		
		let style = {width:"300px",position:"absolute",height:"100%",backgroundColor:"#ba5739"}
		if (this.props.show)
			style['display'] = 'block'
		else
			style['display'] = 'none'
		console.log('rendering items');
		console.log(this.props.links);
		let items = []
		for (let i = 0; i < this.props.links.length; i++)
		{
			items.push(
			<MenuItem action={this.props.links[i].action} icon={this.props.links[i].icon}
				text={this.props.links[i].text}></MenuItem>)
		}
		console.log(items);
		return (
			<div style={style}>
				{ items }
			</div>
		);
	}
}

class MenuItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {hover: false}
		this.toggleHover = this.toggleHover.bind(this);
	}

	toggleHover() {
		this.setState({hover: !this.state.hover});
	}
	
	render() {
		let style = {display:"flex"}

		if (this.state.hover)
			style['backgroundColor'] = '#b7806f'

		return (
			<div style={style} onClick={this.props.action} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
				<FontAwesomeIcon icon={this.props.icon} size="3x" style={{flex:1}}/>
				<span style={{flex:3, fontSize:"40px"}}>{this.props.text}</span>
			</div>
		);
	}
}
