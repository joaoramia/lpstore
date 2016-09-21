import React from 'react';
import {Link} from 'react-router';
import login from './login';

const main = React.createClass({

	getInitialState: function() {
		return {
			user: {}
		};
	},

	componentWillMount: function() {
		console.log('this.props.children: ', this.props.children);
		this.serverRequest = $.get(window.location.origin + '/logged', function (result) {
			console.log('result: ', result);
			this.setState({
				user: result
			});
		}.bind(this));
	},

	auth: false,

	handleSubmit: function(event) {
		event.preventDefault();
		this.sendLogout();
	},

	sendLogout: function(){
		let main = this;
		this.serverRequest = $.get(window.location.origin + '/logout', function(response){
			console.log('sendLogout: ',response);
			main.state.user = {};
			console.log('auth: ', main.state.user);
			main.componentWillMount();
		});
	},

	render: function() {
		return (
			<div className="main">
				<button><Link to='/cart'>Cart</Link></button>
				<button><Link to='/login'>Login</Link></button>
				<button><Link to='/products'>Products</Link></button>
				<button><Link to='/profile'>Profile</Link></button>
				<button><Link to='/login'>Login</Link></button>
				<div className="logout">
					<button onClick={this.handleSubmit} className="btn btn-primary" type="submit">logout</button>
				</div>
				{this.props.children}
			</div>
		)
	}
})

export default main;