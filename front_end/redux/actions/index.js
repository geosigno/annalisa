export const ADD_CONTENT_TO_GO_URL = 'ADD_CONTENT_TO_GO_URL';
export const ADD_CONTENT_TO_GO_TITLE = 'ADD_CONTENT_TO_GO_TITLE';
export const CLEAR_CONTENT_TO_GO = 'CLEAR_CONTENT_TO_GO';

export const ADD_PAGE_FROM_TYPE = 'ADD_PAGE_FROM_TYPE';
export const ADD_PAGE_FROM_NAME = 'ADD_PAGE_FROM_NAME';
export const ADD_PAGE_FROM_ID = 'ADD_PAGE_FROM_ID';
export const CLEAR_PAGE_FROM = 'CLEAR_PAGE_FROM';

export const SET_COUR_ID = 'SET_COUR_ID';

export function addContentToGoURL(url) {
	return { type: 'ADD_CONTENT_TO_GO_URL', url };
}
export function addContentToGoTitle(title) {
	return { type: 'ADD_CONTENT_TO_GO_TITLE', title };
}
export function clearContentToGo() {
	return { type: 'CLEAR_CONTENT_TO_GO' };
}
export function addPageFromType(pageType) {
	return { type: 'ADD_PAGE_FROM_TYPE', pageType };
}
export function addPageFromName(pageName) {
	return { type: 'ADD_PAGE_FROM_NAME', pageName };
}
export function addPageFromID(pageID) {
	return { type: 'ADD_PAGE_FROM_ID', pageID };
}
export function clearPageFrom() {
	return { type: 'CLEAR_PAGE_FROM' };
}
export function setCoursID(coursID) {
	return { type: 'SET_COURS_ID', coursID };
}
