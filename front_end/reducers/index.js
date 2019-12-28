const initialState = {
	articleLockedURL: '',
	articleLockedTitle: '',
	coursID: ''
};

function rootReducer(state = initialState, action) {
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

export default rootReducer;
