const initialState = {
	articleLockedURL: ''
};

function rootReducer(state = initialState, action) {
	if (action.type === 'ADD_URL') {
		state.articleLockedURL = action.url;
	}
	return state;
}
export default rootReducer;
