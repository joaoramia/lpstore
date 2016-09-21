//React, ReactDOM and react-router are being served as a static route for node_modules
import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'react-router/lib/Link';
import {Router, Route, hashHistory, browserHistory} from 'react-router';
import app from './components/app';
import main from './components/main';
import container from './components/container';
import products from './components/products';
import product from './components/product';
import cart from './components/cart';
import login from './components/login';
import logout from './components/logout';
import profile from './components/profile';

const routes = (
<Router history={browserHistory}>
	<Route path='/' component={main}>
		<Route path='/cart' component={cart.cart}/>
		<Route path='/products' component={products}/>
		<Route path='products/:id' component={product}/>
		<Route path='/login' component={login}/>
		<Route path='/logout' component={logout}/>
		<Route path='/profile' component={profile}/>
	</Route>
</Router> )

ReactDOM.render(
	<Router history={hashHistory}>{routes}</Router>,
	document.getElementById('app')
);