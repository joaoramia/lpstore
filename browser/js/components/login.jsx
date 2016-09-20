/* ===== ./src/views/Main/Login/Login.js ===== */
import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import AuthService from '../utils/AuthService';

const auth = new AuthService('Djw1SY8m1JVF5UbIt1Bls5s3k82eguiC', 'joaoramia.auth0.com');

export class login extends React.Component {
	static propTypes = {
		location: T.object,
		auth: T.instanceOf(AuthService)
	}

	render() {
		// const { auth } = this.props;
		return (
			<div className='loginClass'>
			<h2>Login</h2>
			<ButtonToolbar className='loginButton'>
			<Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
			</ButtonToolbar>
			</div>
			)
	}
}

export default login;