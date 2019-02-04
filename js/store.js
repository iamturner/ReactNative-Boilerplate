import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';

const store = () => {
	return compose(
		applyMiddleware(thunk)
	)(createStore)(reducer);
};

export default store();