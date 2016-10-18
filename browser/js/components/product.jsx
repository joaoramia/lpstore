import React from 'react';
import {Link} from 'react-router';
import Video from './video.jsx';

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
		return (
			<div className='single-product'>
				<div className='item'>
					<h3>{this.state.indents.title} | ${this.state.indents.price}</h3>
					<img src={this.state.indents.image_url} ></img>
					<input type="submit" value="Add to cart" onClick={this.addItem}></input>
				</div>
				<div className='product-description'>
					<p>{this.state.indents.description}</p>
					<Video videourl={this.state.indents.video_url} />
				</div>
			</div>
		)
	}
});

export default product;