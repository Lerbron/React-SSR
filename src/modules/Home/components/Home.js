import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { requestHomeList } from './../actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';

class Home extends Component {

	static preLoad(option) {
		if (option && option.store) {
			return Promise.resolve(option.store.dispatch(requestHomeList()));
		} else {
			requestHomeList();
		}
	}

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<p className="title">React SSR</p>
				<ul>
					{
						this.props.homeList && this.props.homeList.length > 0 && this.props.homeList.map( (item, idx) => {
							return <li key={idx}>
									{item.title}
							</li>
						})
					}
				</ul>
				<Link to="/mine">前往我的页面</Link>
			</div>
		)
	}

	componentDidMount() {}
}

function mapStateToProps(state) {
	return {
		...state,
		homeList: state.home.list
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchHomeList: page => dispatch(requestHomeList(page))
		// fetchHomeList: bindActionCreators(requestHomeList, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)