import React from 'react';
import { withRouter } from 'next/router';

import { compose } from 'recompose';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../apollo/apollo';

import store from '../redux/stores';
import { clearContentToGo } from '../redux/actions';

import defaultPage from '../hoc/defaultPage';
import Container from '../components/Container';
import Breadcrumb from '../components/Breadcrumb';
import { LoaderArticle } from '../components/Loader';
import ProtectedContent from '../components/ProtectedContent';

import CoursMain from '../components/Cours/coursMain';
import CardList from '../components/Card/CardList';

import { GET_COURS_BY_ID, GET_ALL_COURS } from '../apollo/query/cours';

const Cours = ({ router }) => {
	const isDetailledPage = !!router.query.id;

	// if no id is set, that means this is the All Cours page
	if (!isDetailledPage) {
		return (
			<Container>
				<Breadcrumb items={[{ href: '/cours', label: 'Cours' }]} />
				<h2>Tous les cours</h2>
				<CardList type='cours' query={GET_ALL_COURS} />
			</Container>
		);
	}

	// get the main cours
	const { loading, error, data } = useQuery(GET_COURS_BY_ID, {
		variables: {
			id: router.query.id
		}
	});

	// manage errors
	if (error && error.graphQLErrors) {
		const isForbidden = error.graphQLErrors.some((item) => item.message.includes('Forbidden'));
		if (isForbidden) {
			return <ProtectedContent />;
		}
	}

	// return skeleton loader
	// if (loading) {
	// 	return (
	// 		<Container>
	// 			<LoaderArticle />
	// 		</Container>
	// 	);
	// }

	if (!data) return false;

	if (data.courBySlug) {
		// clear the Content To Go states
		store.dispatch(clearContentToGo());

		const previousPageType = store.getState() ? store.getState().pathReducer.pageType : null;
		const previousPageName = store.getState() ? store.getState().pathReducer.pageName : null;
		const previousPageID = store.getState() ? store.getState().pathReducer.pageID : null;

		let previousPage = { href: '/cours', label: 'Cours' };
		if (previousPageType && previousPageName && previousPageID) {
			previousPage = { href: `/${previousPageType}/${previousPageID}`, label: previousPageName };
		}
		return (
			<Container>
				<Breadcrumb items={[previousPage, { href: '', label: data.courBySlug.Name }]} />
				<CoursMain cours={data.courBySlug} />
			</Container>
		);
	}

	return false;
};

export default compose(withRouter, defaultPage, withApollo({ ssr: false }))(Cours);
