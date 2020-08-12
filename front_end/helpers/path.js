import store from '../redux/stores';
import { addPageFromType, addPageFromName, addPageFromID } from '../redux/actions';

export const setCurrentPath = (type, name, id) => {
	store.dispatch(addPageFromType(type));
	store.dispatch(addPageFromName(name));
	store.dispatch(addPageFromID(id));
};

export const buildPreviousPath = (currentItem) => {
	const previousPaths = [];
	const state = store.getState();
	const previousPageType = state ? state.pathReducer.pageType : null;
	const previousPageName = state ? state.pathReducer.pageName : null;
	const previousPageID = state ? state.pathReducer.pageID : null;

	if (previousPageType && previousPageName && previousPageID) {
		previousPaths.push({
			href: `/${previousPageType}`,
			label: previousPageType === 'niveau' ? 'Niveaux' : 'Catégories'
		});
		previousPaths.push({
			href: `/${previousPageType}/${previousPageID}`,
			label: previousPageName
		});
	} else {
		previousPaths.push({ href: '/cours', label: 'Cours' });
	}

	previousPaths.push({ href: '', label: currentItem });

	return previousPaths;
};
