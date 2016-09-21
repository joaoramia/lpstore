/* ===== ./src/views/Main/Login/Login.js ===== */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, History, browserHistory} from 'react-router';
import main from './main';

const login = React.createClass({

	contextTypes: {
    	router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			type: 'info',
			message: ''
		};
	},

	handleSubmit: function(event) {
		event.preventDefault(); //doesn't reload page
	    this.sendFormData();
	},

	sendFormData: function(transition){
		console.log('this.history: ', this.history);
		let formData = {
			email: ReactDOM.findDOMNode(this.refs.email).value,
			password: ReactDOM.findDOMNode(this.refs.password).value
		}
		console.log('main.setState: ', main.setState);
		let login = this;
		this.serverRequest = $.post(window.location.origin + '/login', formData, function(response){
			if(response) login.context.router.push('/');
		});
	},

	render: function() {
		return (
			<div>
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