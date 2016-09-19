import React from 'react';
import {Link} from 'react-router';

class initial extends React.Component {
	render() {
		return (
			<div className="initial">
				<button><Link to='/cart'>Cart</Link></button>
				<button><Link to='/login'>Login</Link></button>
				<button><Link to='/products'>Products</Link></button>
				<button><Link to='/profile'>Profile</Link></button>
				{this.props.children}
			</div>
		)
	}
}

export default initial;