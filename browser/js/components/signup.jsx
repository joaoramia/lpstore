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
		this.serverRequest = $.post(window.location.origin + '/signup', formData, function(response){
			if(response) signup.context.router.push('/'); //this will redirect to main page after successful login
		});
	},

	render: function() {
		return (
			<div id='signup'>
				<button><Link to='/cart'>Cart</Link></button>
				<button><Link to='/products'>Products</Link></button>
				<button><Link to='/profile'>Profile</Link></button>
				<button><Link to='/login'>Login</Link></button>
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
					<div className="form-group">
						<button className="btn btn-primary" type="submit">Sign up</button>
					</div>
				</form>
			</div>
		)
	}
});

export default signup;