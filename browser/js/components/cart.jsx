import React from 'react';
import {Link} from 'react-router';

const cart = React.createClass({

	contextTypes: {
    	router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			items: {},
			price: 0
		};
	},

	handler: StripeCheckout.configure({
		key: 'pk_test_6RlcJ6p8tRTTQpkAIEIxEOCV',
		locale: 'auto',
		token: function(token) {
			// You can access the token ID with `token.id`.
			// Get the token ID to your server-side code for use.
			this.serverRequest = $.post(window.location.origin + '/api/cart/purchase', token);
		}
	}),

	handlePayment: function(e){
		e.preventDefault();
		this.handler.open({
			name: 'LP e-commerce',
			description: 'Vinyl online store',
			zipCode: true,
			amount: this.state.price * 100,
			shippingAddress: true,
			billingAddress: true
		});
		this.componentWillMount();
		this.context.router.push('/');
	},

	componentWillMount: function() {
		this.serverRequest = $.get(window.location.origin + '/api/item', function (result) {
			let currentPrice = 0;
			Object.keys(result).forEach(key => {
				currentPrice += result[key].price * result[key].quantity;
			});
			this.setState({
				items: result,
				price: currentPrice
			});
		}.bind(this));
	},

	componentWillUnmount: function () {
		this.serverRequest.abort();
		// this.handler.close();
	},

	addItem: function(id) {
		this.serverRequest = $.post(window.location.origin + '/api/item/add/' + id, function (result) {
			if(result) {
				let currentPrice = 0;
				Object.keys(result).forEach(key => {
					currentPrice += result[key].price * result[key].quantity;
				});
				this.setState({items: result, price: currentPrice});
			}
		}.bind(this));
		//animation to sinalize product was added to cart
		$('.glyphicon').animate({  borderSpacing: -360 }, {
			step: function(now,fx) {
				$(this).css('-webkit-transform','rotate('+now+'deg)'); 
				$(this).css('-moz-transform','rotate('+now+'deg)');
				$(this).css('transform','rotate('+now+'deg)');
			},
			duration:'slow'
		},'linear');
		$('.glyphicon').animate({  borderSpacing: 360 }, {
			step: function(now,fx) {
				$(this).css('-webkit-transform','rotate('+now+'deg)'); 
				$(this).css('-moz-transform','rotate('+now+'deg)');
				$(this).css('transform','rotate('+now+'deg)');
			},
			duration:'slow'
		},'linear');
	},

	removeItem: function(id) {
		this.serverRequest = $.post(window.location.origin + '/api/item/remove/' + id, function (result) {
			let currentPrice = 0;
			Object.keys(result).forEach(key => {
				currentPrice += result[key].price * result[key].quantity;
			});
			this.setState({items: result, price: currentPrice});
		}.bind(this));
		//animation to sinalize product was removed from cart
		$('.glyphicon').animate({  borderSpacing: -360 }, {
			step: function(now,fx) {
				$(this).css('-webkit-transform','rotate('+now+'deg)'); 
				$(this).css('-moz-transform','rotate('+now+'deg)');
				$(this).css('transform','rotate('+now+'deg)');
			},
			duration:'slow'
		},'linear');
		$('.glyphicon').animate({  borderSpacing: 360 }, {
			step: function(now,fx) {
				$(this).css('-webkit-transform','rotate('+now+'deg)'); 
				$(this).css('-moz-transform','rotate('+now+'deg)');
				$(this).css('transform','rotate('+now+'deg)');
			},
			duration:'slow'
		},'linear');
	},

	render: function() {
		let items = [];
		Object.keys(this.state.items).forEach(key => {
			const pathId = '/products/' + key;
			items.push(
				<div key={key} className="product">
					<Link to={pathId}>
						<h3>{this.state.items[key].title}: {this.state.items[key].quantity}</h3>
						<img src={this.state.items[key].image_url}></img>
					</Link>
					<input type="submit" value="+" onClick={() => this.addItem(key)}></input><input type="submit" value="-" onClick={() => this.removeItem(key)}></input>
					<h4 className="inStock">in stock: {this.state.items[key].inStock}</h4>
				</div>)
		});

		let price = null;

		if(this.state.price) {
			price = <h1>Total price: ${this.state.price}</h1>;
		}

		return (
			<div className="products">
				<div className="total-price">
					{price}
					{!items.length ? null : <button id="customButton" onClick={this.handlePayment}>Purchase</button>}
				</div>
				{items}
			</div>
		)
	}
})

export default cart;