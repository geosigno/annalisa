import { combineReducers } from 'redux';

const initialContentToGoState = {
	contentToGoTitle: '',
	contentToGoURL: ''
};

const initialPathState = {
	pageType: '',
	pageName: '',
	pageID: ''
};

function rootReducer(state = initialContentToGoState, action) {
	if (action.type === 'ADD_CONTENT_TO_GO_URL') {
		return { ...state, contentToGoURL: action.url };
	}
	if (action.type === 'ADD_CONTENT_TO_GO_TITLE') {
		return { ...state, contentToGoTitle: action.title };
	}
	if (action.type === 'CLEAR_CONTENT_TO_GO') {
		return { ...state, contentToGoURL: '', contentToGoTitle: '' };
	}

	return state;
}

function pathReducer(state = initialPathState, action) {
	if (action.type === 'ADD_PAGE_FROM_TYPE') {
		return { ...state, pageType: action.pageType };
	}
	if (action.type === 'ADD_PAGE_FROM_NAME') {
		return { ...state, pageName: action.pageName };
	}
	if (action.type === 'ADD_PAGE_FROM_ID') {
		return { ...state, pageID: action.pageID };
	}
	if (action.type === 'CLEAR_PAGE_FROM') {
		return { ...state, pageType: '', pageName: '', pageID: '' };
	}
	return state;
}

const app = combineReducers({
	rootReducer,
	pathReducer
});

export default app;

// export default rootReducer;
