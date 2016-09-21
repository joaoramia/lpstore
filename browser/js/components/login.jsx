/* ===== ./src/views/Main/Login/Login.js ===== */
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import main from './main';

const login = React.createClass({

	contextTypes: {
    	router: React.PropTypes.object.isRequired
	},

	handleSubmit: function(event) {
		event.preventDefault(); //doesn't reload page
	    this.sendFormData();
	},

	sendFormData: function(transition){
		let formData = {
			email: ReactDOM.findDOMNode(this.refs.email).value,
			password: ReactDOM.findDOMNode(this.refs.password).value
		}
		let login = this;
		this.serverRequest = $.post(window.location.origin + '/login', formData, function(response){
			if(response) login.context.router.push('/'); //this will redirect to main page after successful login
		});
	},

	render: function() {
		return (
			<div>
				<button><Link to='/cart'>Cart</Link></button>
				<button><Link to='/products'>Products</Link></button>
				<button><Link to='/profile'>Profile</Link></button>
				<button><Link to='/signup'>Signup</Link></button>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="email">email *</label>
						<input className="form-control" name="email" ref="email" required type="text" />
					</div>
					<div className="form-group">
						<label htmlFor="password">password *</label>
						<input className="form-control" name="password" ref="password" required type="text" />
					</div>
					<div className="form-group">
						<button className="btn btn-primary" type="submit">Log in</button>
					</div>
				</form>
			</div>
			)
	}
});

export default login;