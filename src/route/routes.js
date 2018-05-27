import React from 'react';
import { Route, Router, indexRoute } from 'react-router';
import Home from './../modules/Home/components/Home';
import NotFound from './../modules/NotFound/components/NotFound';
import Mine from './../modules/Mine/components/Mine';
import Main from './../main';

export default history =>
	(
		<Router history={history}>
			<indexRoute component={Home}/>
			<Route path="/" component={Main} />
			<Route path="/mine" component={Mine} />
			<Route path="*" component={NotFound} />
		</Router>
	);

export const routes = {
	path: '/',
	component: Main,
	indexRoute: {
		component: Home
	},
	childRoutes: [
		{
			path: 'mine',
			component: Mine
		},{
			path: '*',
			component: NotFound
		}
	]
}