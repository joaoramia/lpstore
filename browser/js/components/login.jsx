/* ===== ./src/views/Main/Login/Login.js ===== */
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import main from './main';

const login = React.createClass({

	getInitialState: function() {
		return {
			correctLogin: true
		};
	},

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
			if(response) {
				login.context.router.push('/'); //this will redirect to main page after successful login
			}
			else {
				login.setState({correctLogin: false});
			}
		});
	},

	handleGoogleLogin: function(event) {
		// event.preventDefault();
		this.googleLogin();
	},

	googleLogin: function(){
		// this.serverRequest = $.get(window.location.origin + '/auth/google');
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
			<div>
				<div className="nav">
					<Link to='/products'>Products</Link>
					<Link to='/cart'><span className="glyphicon glyphicon-shopping-cart"></span></Link>
				</div>
				<div className="signin">
					<Link to='/signup'>Signup</Link>
				</div>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="email">email * {!this.state.correctLogin ? <span className='failed-login'>please try again</span> : null}</label>
						<input className="form-control" name="email" ref="email" required type="text" />
						<label htmlFor="password">password * {!this.state.correctLogin ? <span className='failed-login'>please try again</span> : null}</label>
						<input className="form-control" name="password" ref="password" required type="password" />
						<br />
						<a onClick={this.handleSubmit} className="btn btn-block btn-social btn-github" type="submit"><span className="fa"></span>Sign in</a>
					</div>
				</form>
				<div className='social-buttons'>
					<a onClick={this.handleGoogleLogin} className="btn btn-block btn-social btn-google" type="submit"><span className="fa fa-google"></span>Sign in with Google</a>
					<a onClick={this.handleFacebookLogin} className="btn btn-block btn-social btn-facebook" type="submit"><span className="fa fa-facebook"></span>Sign in with Facebook</a>
				</div>
			</div>
			)
	}
});

export default login;