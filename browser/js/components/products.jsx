import React from 'react';
import {Link} from 'react-router';
import product from './product';
import {Route} from 'react-router';

const products = React.createClass({
	getInitialState: function() {
		return {
			indents: []
		};
	},

	componentDidMount: function() {
		this.serverRequest = $.get(window.location.origin + '/api/inventory', function (result) {
			this.setState({
				indents: result
			});
		}.bind(this));
	},

	componentWillUnmount: function () {
		this.serverRequest.abort();
	},

	render: function() {
		let indents = [];

		this.state.indents.forEach(item => {
			let pathId = '/products/' + item.id;
			indents.push(
				<div className='products' key={item.title}>
					<Link to={pathId}>
						<h3>{item.title} ${item.price}</h3>
						<img src={item.image_url}></img>
					</Link>
				</div>)
		});

		return (
			<div className="productsWrapper">
				{indents}
			</div>
		)
	}
});

export default products;