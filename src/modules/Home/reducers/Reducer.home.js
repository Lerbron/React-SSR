const initState = {isFetching: true, fetched: false, list: [], page: 1,};

export default function home(state = initState, action) {
	switch (action.type) {
		case 'fetchHomeList' :
			return Object.assign({}, state, {isFetching: true, fetched: false, page: action.page});
		case 'reciveHomeList':
			return Object.assign({}, state, {isFetching: false, fetched: true, list: action.list});
		case 'fetchHomeListErr':
			return Object.assign({}, state, {isFetching: false, fetched: true, err: action.err});
		default :
			return state;
	}
}