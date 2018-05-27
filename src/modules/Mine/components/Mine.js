import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { requestMineList } from './../actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';


class Mine extends Component {
	static preLoad(option) {
		if (option && option.store) {
			return Promise.resolve(option.store.dispatch(requestMineList(3)));
		} else {
			requestMineList(3);
		}
	}

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<p className="title">Mine Page</p>
				<ul>
					{
						this.props.mineList && this.props.mineList.length > 0 && this.props.mineList.map( (item, idx) => {
							return <li key={idx}>
								{item.title}
							</li>
						})
					}
				</ul>
				<Link to="/">前往首面</Link>
			</div>
		)
	}

	componentDidMount() {}
}

function mapStateToProps(state) {
	return {
		...state,
		mineList: state.mine.list
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchMineList: page => dispatch(requestMineList(page))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mine)