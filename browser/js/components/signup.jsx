import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

const signup = React.createClass({

	contextTypes: {
    	router: React.PropTypes.object.isRequired
	},
	
	handleSubmit: function(event) {
		event.preventDefault(); //doesn't reload page
	    this.sendFormData();
	},

	sendFormData: function(transition){
		let formData = {
			name: ReactDOM.findDOMNode(this.refs.name).value,
			email: ReactDOM.findDOMNode(this.refs.email).value,
			password: ReactDOM.findDOMNode(this.refs.password).value
		}
		let signup = this;
		if (formData.name && formData.email && formData.password){
			this.serverRequest = $.post(window.location.origin + '/signup', formData, function(response){
				if(response) signup.context.router.push('/'); //this will redirect to main page after successful login
			});
		}
	},

	handleGoogleLogin: function(event) {
		this.googleLogin();
	},

	googleLogin: function(){
		window.location = window.location.origin + '/auth/google';
		this.serverRequest = $.get(window.location.origin + '/logged', function (result) {
			if(result) login.context.router.push('/'); //this will redirect to main page after successful login
		}.bind(this));
	},

	handleFacebookLogin: function(event) {
		// event.preventDefault();
		this.facebookLogin();
	},

	facebookLogin: function(){
		// this.serverRequest = $.get(window.location.origin + '/auth/google');
		window.location = window.location.origin + '/auth/facebook';
		this.serverRequest = $.get(window.location.origin + '/logged', function (result) {
			if(result) login.context.router.push('/'); //this will redirect to main page after successful login
		}.bind(this));
	},

	render: function() {
		return (
			<div id="signup">
				<div className="nav">
					<Link to='/cart'>Cart</Link>
					<Link to='/products'>Products</Link>
					<Link to='/profile'>Profile</Link>
				</div>
				<div className="signin">
					<Link to='/login'>Login</Link>
				</div>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">name *</label>
						<input className="form-control" name="name" ref="name" required type="text" />
						<label htmlFor="email">email *</label>
						<input className="form-control" name="email" ref="email" required type="text" />
						<label htmlFor="password">password *</label>
						<input className="form-control" name="password" ref="password" required type="password" />
						<br />
						<a onClick={this.handleSubmit} className="btn btn-block btn-social btn-github" type="submit"><span className="fa"></span>Sign up</a>
					</div>
				</form>
				<div className="social-buttons">
					<a onClick={this.handleGoogleLogin} className="btn btn-block btn-social btn-google" type="submit"><span className="fa fa-google"></span>Sign up with Google</a>
					<a onClick={this.handleFacebookLogin} className="btn btn-block btn-social btn-facebook" type="submit"><span className="fa fa-facebook"></span>Sign up with Facebook</a>
				</div>
			</div>
		)
	}
});

export default signup;