import { createStore } from 'redux';
import app from '../reducers';

const store = createStore(
	app,
	typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
