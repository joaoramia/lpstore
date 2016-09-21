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

	handleSubmit: function(event) {
		event.preventDefault();
		this.sendLogout();
	},

	sendLogout: function(){
		let main = this;
		this.serverRequest = $.get(window.location.origin + '/logout', function(response){
			main.state.user = {};
			main.componentWillMount();
		});
	},

	render: function() {
		return (
			<div className="main">
				<h1>welcome {this.state.user.name}</h1>
				<button><Link to='/cart'>Cart</Link></button>
				<button><Link to='/products'>Products</Link></button>
				<button><Link to='/profile'>Profile</Link></button>
				{ this.state.user ? <div className="logout">
					<button onClick={this.handleSubmit} className="btn btn-primary" type="submit">logout</button>
				</div> : <div><button><Link to='/login'>Login</Link></button><button><Link to='/signup'>Sign up</Link></button></div> }
				{this.props.children}
			</div>
		)
	}
})

export default main;