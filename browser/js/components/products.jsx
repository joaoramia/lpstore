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

	componentWillMount: function() {
		this.serverRequest = $.get(window.location.origin + '/api/inventory', function (result) {
			this.setState({
				indents: result
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

	render: function() {
		let indents = [];

		this.state.indents.forEach(item => {
			if (item.quantity >= 1){
				let pathId = '/products/' + item.id;
				indents.push(
					<div className='product' key={item.id}>
						<Link to={pathId}>
							<img src={item.image_url}></img>
							<div className='description'><p>{item.title}</p><p>${item.price}</p></div>
						</Link>
						<input type="submit" value="add to cart" onClick={() => this.addItem(item.id)}></input>
					</div>)
			}
		});

		return (
			<div className="products">
				{indents}
			</div>
		)
	}
});

export default products;