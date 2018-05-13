import React from 'react';
import { Route, Router, indexRoute } from 'react-router';
import Home from './../modules/Home/components/Home';
import NotFound from './../modules/NotFound/components/NotFound';
import Mine from './../modules/Mine/components/Mine';

export default history =>
	(
		<Router history={history}>
			<Route path="/" component={Home} />
			<Route path="/mine" component={Mine} />
			<Route path="*" component={NotFound} />
		</Router>
	);