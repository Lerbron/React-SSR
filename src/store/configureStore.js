import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import home from '../modules/Home/reducers/Reducer.home';
import mine from '../modules/Mine/reducers/Reducer.mine';


const middleware = [
	thunk,
  !__NODE__ && createLogger(),
].filter(Boolean);

const rootReducer = combineReducers({
    home,
    mine
});

export default function configureStore(initialState) {
    let store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
        )
    );

    return store;
}
