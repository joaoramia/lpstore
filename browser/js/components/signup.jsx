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
					<button><Link to='/cart'>Cart</Link></button>
					<button><Link to='/products'>Products</Link></button>
					<button><Link to='/profile'>Profile</Link></button>
				</div>
				<div className="signin">
					<button><Link to='/login'>Login</Link></button>
				</div>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">name *</label>
						<input className="form-control" name="name" ref="name" required type="text" />
					</div>
					<div className="form-group">
						<label htmlFor="email">email *</label>
						<input className="form-control" name="email" ref="email" required type="text" />
					</div>
					<div className="form-group">
						<label htmlFor="password">password *</label>
						<input className="form-control" name="password" ref="password" required type="text" />
					</div>
					<a onClick={this.handleSubmit} className="btn btn-block btn-social btn-github" type="submit"><span className="fa"></span>Sign up</a>
				</form>
				<a onClick={this.handleGoogleLogin} className="btn btn-block btn-social btn-google" type="submit"><span className="fa fa-google"></span>Sign in with Google</a>
				<a onClick={this.handleFacebookLogin} className="btn btn-block btn-social btn-facebook" type="submit"><span className="fa fa-facebook"></span>Sign in with Facebook</a>
			</div>
		)
	}
});

export default signup;