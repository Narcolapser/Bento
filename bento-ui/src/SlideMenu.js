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
		let items = []
		for (let i = 0; i < this.props.links.length; i++)
		{
			items.push(<div style={{display:"flex"}} onClick={this.props.links[i].action}>
				<FontAwesomeIcon icon={this.props.links[i].icon} size="3x" style={{flex:1}}/>
				<span style={{flex:3, fontSize:"40px"}}>{this.props.links[i].text}</span>
			</div>)
		}
		console.log(items);
		return (
			<div style={style}>
				{ items }
			</div>
		);
	}
}
