import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Content extends Component {

	render(){

		return (
			<div>

				{this.props.children}
			</div>
		);
	}

}

export default Content;