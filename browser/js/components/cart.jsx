import React from 'react';
import {Link} from 'react-router';

const cart = React.createClass({

	getInitialState: function() {
		return {
			items: {}
		};
	},

	componentWillMount: function() {
		this.serverRequest = $.get(window.location.origin + '/api/item', function (result) {
			this.setState({
				items: result
			});
		}.bind(this));
	},

	componentWillUnmount: function () {
		this.serverRequest.abort();
	},

	addItem: function(id) {
		this.serverRequest = $.post(window.location.origin + '/api/item/add/' + id, function (result) {
			if(result) this.setState({items: result});
		}.bind(this));
	},

	removeItem: function(id) {
		this.serverRequest = $.post(window.location.origin + '/api/item/remove/' + id, function (result) {
			this.setState({items: result});
		}.bind(this));
	},

	render: function() {
		const items = [];
		Object.keys(this.state.items).forEach(key => {
			const pathId = '/products/' + key;
			items.push(
				<div key={key} className="product">
					<Link to={pathId}>
						<h3>{this.state.items[key].title}: {this.state.items[key].quantity}</h3>
						<img src={this.state.items[key].image_url}></img>
					</Link>
					<input type="submit" value="+" onClick={() => this.addItem(key)}></input><input type="submit" value="-" onClick={() => this.removeItem(key)}></input>
					<h4>in stock: {this.state.items[key].inStock}</h4>
				</div>)
		});

		return (
			<div className="products">
				{items}
			</div>
		)
	}
})

export default cart;