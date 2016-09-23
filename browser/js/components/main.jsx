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
		this.serverRequest = $.get(window.location.origin + '/logged', function (result) {
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
				<div className="nav">
					<Link to='/cart'>Cart</Link>
					<Link to='/products'>Products</Link>
					<Link to='/profile'>Profile</Link>
				</div>
				{ this.state.user ? <div className="logout"><input type="submit" onClick={this.handleSubmit} value="logout"></input></div> : <div className="signin"><Link to='/login'>Login</Link><Link to='/signup'>Sign up</Link></div> }
				<h5 className="welcome">{this.state.user.name}</h5>
				{this.props.children}
			</div>
		)
	}
})

export default main;