//React, ReactDOM and react-router are being served as a static route for node_modules
import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'react-router/lib/Link';
import {Router, Route, hashHistory, browserHistory} from 'react-router';
import app from './components/app';
import main from './components/main';
import products from './components/products';
import product from './components/product';
import cart from './components/cart';
import login from './components/login';
import signup from './components/signup';
import logout from './components/logout';
import profile from './components/profile';

const routes = (
<Router history={browserHistory}>
	<Route path='/' component={main}>
		<Route path='/cart' component={cart}/>
		<Route path='/products' component={products}/>
		<Route path='products/:id' component={product}/>
		<Route path='/logout' component={logout}/>
		<Route path='/profile' component={profile}/>
	</Route>
	<Route path='/login' component={login}></Route>
	<Route path='/signup' component={signup}></Route>
</Router> )

ReactDOM.render(
	<Router history={hashHistory}>{routes}</Router>,
	document.getElementById('app')
);