import React from 'react';
import { withRouter } from 'next/router';

import { compose } from 'recompose';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Cell } from 'styled-css-grid';
import { withApollo } from '../apollo/apollo';

import store from '../redux/stores';
import { clearContentToGo } from '../redux/actions';

import defaultPage from '../hoc/defaultPage';
import Container from '../components/Container';
import Breadcrumb from '../components/Breadcrumb';
import { CardListLoader, LoaderArticle } from '../components/Loader';
import ProtectedContent from '../components/ProtectedContent';
import { GET_COURS_BY_ID, GET_ALL_COURS } from '../components/Cours/_query';
import CoursMain from '../components/Cours/coursMain';
import Card from '../components/Card/Card';

const Cours = ({ router }) => {
	const isDetailledPage = !!router.query.id;
	let query;
	let options = {};
	if (isDetailledPage) {
		query = GET_COURS_BY_ID;
		options = {
			variables: {
				id: router.query.id
			}
		};
	} else {
		query = GET_ALL_COURS;
	}

	const { loading, error, data } = useQuery(query, options);

	if (error && error.graphQLErrors) {
		const isForbidden = error.graphQLErrors.some((error) => error.message.includes('Forbidden'));
		if (isForbidden) {
			return <ProtectedContent router={router} />;
		}
	}

	if (loading) {
		if (isDetailledPage) {
			return (
				<Container>
					<LoaderArticle n={3} />
				</Container>
			);
		} else {
			return (
				<Container>
					<CardListLoader n={9} />
				</Container>
			);
		}
	}

	if (!data) return false;

	if (isDetailledPage && data.cour) {
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
				<Breadcrumb items={[previousPage, { href: '', label: data.cour.Name }]} />
				<CoursMain cours={data.cour} />
			</Container>
		);
	}
	if (data.cours) {
		return (
			<Container>
				<Breadcrumb items={[{ href: '/cours', label: 'Cours' }]} />
				<Grid gap='64px' columns='1fr 1fr 1fr'>
					{data.cours.map((item) => (
						<Cell key={item.id}>
							<Card data={item} type='cours' />
						</Cell>
					))}
				</Grid>
			</Container>
		);
	}

	return false;
};

export default compose(withRouter, defaultPage, withApollo({ ssr: false }))(Cours);
