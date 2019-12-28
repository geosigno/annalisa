export function addCoursUrl(url) {
	return { type: 'ADD_URL', url };
}
export function addCoursTitle(hook) {
	return { type: 'ADD_COURS_TITLE', hook };
}
export function addCoursID(coursID) {
	return { type: 'ADD_COURS_ID', coursID };
}
export function clear() {
	return { type: 'CLEAR' };
}
