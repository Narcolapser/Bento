import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class BentoButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {hover: false}
		this.toggleHover = this.toggleHover.bind(this);
	}

	toggleHover() {
		this.setState({hover: !this.state.hover});
	}

	render() {
		let style = {width:"50px",float:this.props.float}

		if (this.state.hover)
			style['backgroundColor'] = '#ba5739'

		return (
			<div style={style} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={this.props.onClick}>
				<FontAwesomeIcon icon={this.props.icon} size="3x"/>
			</div>
		);
	}
}
