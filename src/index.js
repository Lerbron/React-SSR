import 'babel-polyfill';
import React, {Component} from 'react';
import { browserHistory, Router } from 'react-router';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import createRouter, {routes} from './route/routes';
import configureStore from './store/configureStore';
import { match } from 'react-router';


const store = configureStore(window.__initState__);

class AppContainer extends Component {
	
	render() {
		let {routes, store} = this.props;
		return(
			<Provider store={store}>
        		<Router onUpdate={() => window.scrollTo(0, 0)}  ref="router" history={browserHistory} routes={routes} />
			</Provider>
		)
	}

	componentDidMount() {
		let router = this.refs.router.router;
		let routes = this.refs.router.props.routes;
		
		router.listen( (loaction, cb) => {
			match({ history: browserHistory, routes: routes, location }, (error, redirect, props) => {
				const { components, location, params } = props;  
				preload(components, store).then(() => {
		
				}).catch(error => {
		
					if(error.redirect) {
						return router.push(error.redirect)
					}
					console.error(error);
				})
			});
		})
	}
}

(function appRender() {
	render(
		<AppContainer store={store} routes = {routes}/>, document.getElementById('app')
	)
})();

function preload(components, store) {	
	const preloads = components
	  .filter(component => component.preLoad)
	  .map(component => component.preLoad({store}));
  
	return Promise.all(preloads);
  }

// render(
// 	<Provider store={store}>
// 		{
// 			createRouter(browserHistory)
// 		}
// 	</Provider>,
// 	document.getElementById('app'),
// );