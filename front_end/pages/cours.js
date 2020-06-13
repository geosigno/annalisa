import React from 'react';
import { withRouter } from 'next/router';
import { withApollo } from '../apollo/apollo';
import { compose } from 'recompose';
import { useQuery } from '@apollo/react-hooks';

import defaultPage from '../hoc/defaultPage';
import Loader from '../components/Loader';
import ProtectedContent from '../components/ProtectedContent';
import { GET_COURS_BY_ID } from '../components/Cours/_query';
import CoursMain from '../components/Cours/coursMain';

const Cours = ({ router }) => {

	const { loading, error, data } = useQuery(
		GET_COURS_BY_ID,
		{
			variables: {
				id: router.query.id || 1
			},
			fetchPolicy: "network-only"
		}
	);
	
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
		return <CoursMain cours={data.cour} />;
	}

	return false;
};

export default compose(
	withRouter,
	defaultPage,
	withApollo({ ssr: false })
)(Cours);
