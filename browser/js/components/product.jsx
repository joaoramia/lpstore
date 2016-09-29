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

	addItem: function() {
		this.serverRequest = $.post(window.location.origin + '/api/item/add/' + this.props.params.id, function (result) {
		}.bind(this));
		$('.tohide').animate({opacity: '0.0'}, 'fast');
		$('.glyphicon').animate({opacity: '0.0', 'font-size': '35px'}, "slow");
		$('.glyphicon').animate({opacity: '1.0', 'font-size': '20px'}, "slow", ()=>{
			$('.tohide').animate({opacity: '1.0'}, 'slow');
		});
	},

	render: function() {
		return (
			<div className='single-product'>
				<div className='item'>
					<h3>{this.state.indents.title} | ${this.state.indents.price}</h3>
					<img src={this.state.indents.image_url} ></img>
					<input type="submit" value="Add to cart" onClick={this.addItem}></input>
				</div>
				<div className='product-description'>
					<p>{this.state.indents.description}</p>
				</div>
			</div>
		)
	}
});

export default product;