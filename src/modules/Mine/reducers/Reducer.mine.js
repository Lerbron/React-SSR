const initState = {isFetching: true, fetched: false, list: [], page: 1,};

export default function mine(state = initState, action) {
	switch (action.type) {
		case 'fetchMineList' :
			return Object.assign({}, state, {isFetching: true, fetched: false, page: action.page});
		case 'reciveMineList':
			return Object.assign({}, state, {isFetching: false, fetched: true, list: action.list});
		case 'fetchMineListErr':
			return Object.assign({}, state, {isFetching: false, fetched: true, err: action.err});
		default :
			return state;
	}
}