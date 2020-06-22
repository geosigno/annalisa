import { combineReducers } from 'redux';

const initialRootState = {
	articleLockedURL: '',
	articleLockedTitle: '',
	coursID: ''
};

const initialPathState = {
	pageType: '',
	pageName: '',
	pageID: ''
};

function rootReducer(state = initialRootState, action) {
	if (action.type === 'ADD_URL') {
		return { ...state, articleLockedURL: action.url };
	}
	if (action.type === 'ADD_COURS_TITLE') {
		return { ...state, articleLockedTitle: action.hook };
	}
	if (action.type === 'ADD_COURS_ID') {
		return { ...state, coursID: action.coursID };
	}
	if (action.type === 'CLEAR') {
		state = undefined;
	}
	return state;
}

function pathReducer(state = initialPathState, action) {
	if (action.type === 'ADD_PAGE_TYPE') {
		return { ...state, pageType: action.pageType };
	}
	if (action.type === 'ADD_PAGE_NAME') {
		return { ...state, pageName: action.pageName };
	}
	if (action.type === 'ADD_PAGE_ID') {
		return { ...state, pageID: action.pageID };
	}
	if (action.type === 'CLEAR') {
		state = undefined;
	}
	return state;
}

const app = combineReducers({
	rootReducer,
	pathReducer
});

export default app;

// export default rootReducer;
