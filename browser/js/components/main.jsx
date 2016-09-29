import React from 'react';
import {Link} from 'react-router';
import login from './login';
import cart from './cart';

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
					<Link to='/products'>Products</Link>
					<Link to='/cart'><span className="glyphicon glyphicon-shopping-cart"></span></Link>
				</div>
				{ this.state.user ? <div className="logout"><Link to='/' onClick={this.handleSubmit}>logout</Link></div> : <div className="signin"><Link to='/login'>Login</Link><Link to='/signup'>Sign up</Link></div> }
				<h5 className="welcome">{!this.state.user.name ? null : 'Welcome ' + this.state.user.name}</h5>
				{this.props.children}
			</div>
		)
	}
})

export default main;