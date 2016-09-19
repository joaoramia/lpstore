import React from 'react';
import {Link} from 'react-router';

const addButton = React.createClass({

	render: function() {
		return (
			<div className='addButton'>
				<input type="submit" value="Add to cart"></input>
			</div>
		)
	}
});

class cart extends React.Component {
	render() {
		return (
			<div className="cart">
			<h3>Welcome to the</h3><h3>Donor Finder App!</h3>
			</div>
		)
	}
}

export default {cart: cart, addButton: addButton};