import React from 'react';
import { withRouter } from 'next/router';

import { compose } from 'recompose';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../apollo/apollo';

import store from '../redux/stores';
import { clearContentToGo, setCoursID } from '../redux/actions';

import defaultPage from '../hoc/defaultPage';
import Container from '../components/Container';
import Breadcrumb from '../components/Breadcrumb';
import CoursLoader from '../components/Loader/CoursLoader';
import ProtectedContent from '../components/ProtectedContent';

import CoursMain from '../components/Cours/coursMain';
import CardList from '../components/Card/CardList';

import { GET_COURS_BY_ID, GET_ALL_COURS } from '../apollo/query/cours';

import { buildPreviousPath } from '../helpers/path';

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
	if (loading) {
		return <CoursLoader />;
	}

	if (!data) return false;

	if (data.courBySlug) {
		// clear the Content To Go states
		store.dispatch(clearContentToGo());

		// get the previous path to build the breadcrumb
		const previousPaths = buildPreviousPath(data.courBySlug.Name);

		// sto the current cours ID
		const coursID = data.courBySlug.id;
		coursID && store.dispatch(setCoursID(coursID));

		return (
			<div>
				<Container size='small'>
					<Breadcrumb items={previousPaths} />
				</Container>
				<CoursMain cours={data.courBySlug} />
			</div>
		);
	}

	return false;
};

export default compose(withRouter, defaultPage, withApollo({ ssr: false }))(Cours);
