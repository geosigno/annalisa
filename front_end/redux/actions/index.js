export const ADD_URL = 'ADD_URL';
export const ADD_COURS_TITLE = 'ADD_COURS_TITLE';
export const ADD_COURS_ID = 'ADD_COURS_ID';
export const ADD_PAGE_TYPE = 'ADD_PAGE_TYPE';
export const ADD_PAGE_NAME = 'ADD_PAGE_NAME';
export const ADD_PAGE_ID = 'ADD_PAGE_ID';
export const CLEAR = 'CLEAR';

export function addCoursUrl(url) {
	return { type: 'ADD_URL', url };
}
export function addCoursTitle(hook) {
	return { type: 'ADD_COURS_TITLE', hook };
}
export function addCoursID(coursID) {
	return { type: 'ADD_COURS_ID', coursID };
}
export function addPageType(pageType) {
	return { type: 'ADD_PAGE_TYPE', pageType };
}
export function addPageName(pageName) {
	return { type: 'ADD_PAGE_NAME', pageName };
}
export function addPageID(pageID) {
	return { type: 'ADD_PAGE_ID', pageID };
}
export function clear() {
	return { type: 'CLEAR' };
}
