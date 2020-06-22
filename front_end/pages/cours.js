import React from 'react';
import { withRouter } from 'next/router';

import { compose } from 'recompose';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../apollo/apollo';

import store from '../redux/stores';

import defaultPage from '../hoc/defaultPage';
import Breadcrumb from '../components/Breadcrumb';
import Loader from '../components/Loader';
import ProtectedContent from '../components/ProtectedContent';
import { GET_COURS_BY_ID } from '../components/Cours/_query';
import CoursMain from '../components/Cours/coursMain';

const Cours = ({ router }) => {
	const { loading, error, data } = useQuery(GET_COURS_BY_ID, {
		variables: {
			id: router.query.id || 1
		}
	});

	if (error) {
		if (error.graphQLErrors) {
			for (let i = 0; i < error.graphQLErrors.length; i++) {
				if (error.graphQLErrors[i].message.includes('Forbidden')) {
					return <ProtectedContent router={router} />;
				}
			}
		}
	}

	if (loading) return <Loader />;

	if (data.cour) {
		const previousPageType = store.getState() ? store.getState().pathReducer.pageType : null;
		const previousPageName = store.getState() ? store.getState().pathReducer.pageName : null;
		const previousPageID = store.getState() ? store.getState().pathReducer.pageID : null;

		let previousPage = { href: '', label: 'Cours' };
		if (previousPageType && previousPageName && previousPageID) {
			previousPage = { href: `${previousPageType}/${previousPageID}`, label: previousPageName };
		}

		console.log(store.getState());
		return (
			<div>
				<Breadcrumb items={[previousPage, { href: '', label: data.cour.Name }]} />
				<CoursMain cours={data.cour} />
			</div>
		);
	}

	return false;
};

export default compose(withRouter, defaultPage, withApollo({ ssr: false }))(Cours);
