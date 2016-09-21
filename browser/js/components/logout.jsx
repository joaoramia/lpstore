import React from 'react';
import {Link} from 'react-router';
import product from './product';
import {Route} from 'react-router';
import main from './main';

const logout = React.createClass({

	handleSubmit: function(event) {
		event.preventDefault();
		this.sendLogout();
	},

	sendLogout: function(){
		this.serverRequest = $.get(window.location.origin + '/logout', function(response){
			console.log('auth: ', main.auth);
			// console.log(response);
		});
	},

	render: function() {
		return (
			<div className="logout">
				<button onClick={this.handleSubmit} className="btn btn-primary" type="submit">logout</button>
			</div>
		)
	}
});

export default logout;