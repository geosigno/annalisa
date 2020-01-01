import React from 'react';
import { withRouter } from 'next/router';

import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import defaultPage from '../hoc/defaultPage';
import Auth from '../helpers/auth';
import Loader from '../components/Loader';
import ProtectedContent from '../components/ProtectedContent';

import { GET_COURS_BY_ID } from '../components/cours/_query';

import CoursMain from '../components/cours/coursMain';

const Cours = ({ router, data: { loading, error, cour } }) => {
	if (loading) {
		return <Loader />;
	}

	if (error) {
		if (error.graphQLErrors) {
			for (let i = 0; i < error.graphQLErrors.length; i++) {
				if (error.graphQLErrors[i].message.includes('Forbidden')) {
					return <ProtectedContent router={router} />;
				}
			}
		}
	}

	if (cour) {
		return <CoursMain cours={cour} />;
	}

	return false;
};

export default compose(
	withRouter,
	defaultPage,
	graphql(GET_COURS_BY_ID, {
		options: (props) => ({
			variables: {
				id: props.router.query.id || 1
			},
			context: {
				headers: Auth.getBearer()
			}
		}),
		props: ({ data }) => ({ data })
	})
)(Cours);
