import React from 'react';
import {Link} from 'react-router';

const product = React.createClass({
	getInitialState: function() {
		return {
			indents: {}
		};
	},

	componentDidMount: function() {
		this.serverRequest = $.get(window.location.origin + '/api/inventory/' + this.props.params.id, function (result) {
			this.setState({
				indents: result
			});
		}.bind(this));
	},

	componentWillUnmount: function () {
		this.serverRequest.abort();
	},

	render: function() {
		return (
			<div className='product'>
				<h3>{this.state.indents.title} ${this.state.indents.price}</h3>
				<img src={this.state.indents.image_url} ></img>
				<p>{this.state.indents.description}</p>
				<input type="submit" value="Add to cart"></input>
			</div>
		)
	}
});

export default product;