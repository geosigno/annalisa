import React from 'react';
import { withRouter } from 'next/router';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import Auth from '../helpers/auth';

import ProtectedContent from '../components/ProtectedContent';
import Loader from '../components/Loader';

import defaultPage from '../hoc/defaultPage';

import { GET_ALL_COURS_BY_CAGTEGORIE_ID } from '../components/categorie/_query';

import CardList from '../components/Card/CardList';

const Category = ({ router, data: { loading, error, categorie } }) => {
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

	if (categorie.cours && categorie.cours.length) {
		return <CardList data={categorie.cours} type='cours' />;
	}

	return false;
};

export default compose(
	withRouter,
	defaultPage,
	graphql(GET_ALL_COURS_BY_CAGTEGORIE_ID, {
		options: (props) => ({
			variables: {
				id: props.router.query.id
			},
			context: {
				headers: Auth.getBearer()
			}
		}),
		props: ({ data }) => ({ data })
	})
)(Category);
