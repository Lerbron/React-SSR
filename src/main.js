import 'babel-polyfill';
import React from 'react';
import { browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import createRouter from './route/routes';
import configureStore from './store/configureStore';

const store = configureStore(window.__initState__);

render(
	<Provider store={store}>
		{
			createRouter(browserHistory)
		}
	</Provider>,
	document.getElementById('app'),
);