import React from "react";
import { GridView } from "./GridView.js";

export class ViewManager extends React.Component {
	constructor(props) {
		super(props);
		this.state = {view:"Grid"}
	}

	render() {
		let view = (<p>loading...</p>);
		if (this.state.view === 'Grid')
			view = (<GridView folders={this.props.folders} documents={this.props.documents}></GridView>);
		return (
			<div>
				{view}
			</div>
		);
	}
}
