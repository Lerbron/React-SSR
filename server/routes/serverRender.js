import React from 'react';
import { RouterContext, match } from 'react-router';
import createRoutes, {routes} from './../../src/route/routes';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import express from 'express';
import configureStore from './../../src/store/configureStore';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';

const serverRender = express.Router();

function getReduxPromise(props, store) {
	const comp = props.components[props.components.length-1].WrappedComponent;
	return comp.preLoad ? comp.preLoad({store, props}): Promise.resolve();
}
serverRender.route('*')
	.get( (req, res) => {
		const history = createMemoryHistory();
		const store = configureStore();
		// const routes = createRoutes(history);

		match( { routes, location: req.originalUrl }, (err, redirection, renderProps) => {
			if (redirection) {
				res.redirect(302, redirection.pathname + redirection.search);
			} else if (err) {
				res.send(500, err.message);
			} else if (renderProps == null) {
				res.send(404, 'Not Found')
			} else if (renderProps) {
				getReduxPromise(renderProps, store)
					.then( () => {
						// const reduxState = JSON.stringify(store.getState()).replace(/</g, '\\x3c');
						const reduxState = JSON.stringify(store.getState());
						const html = ReactDOMServer.renderToString(
							<Provider store={store}>
								{<RouterContext {...renderProps}/>}
							</Provider>
						);

						res.render('index.ejs', {html, reduxState})
					})
					.catch(err => {
						console.log(err);
					})
			}
		} )
	});

export default serverRender;