import React from 'react';
import Router, { withRouter } from 'next/router';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import Auth from '../components/auth';
import Loader from '../components/Loader';

import defaultPage from '../hoc/defaultPage';

import { GET_ALL_COURS_BY_CAGTEGORIE_ID } from '../components/categorie/_query';

import CardList from '../components/Card/CardList';

const auth = new Auth();

const Category = ({ data: { loading, error, categorie } }) => {
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
				headers: auth.getBearer()
			}
		}),
		props: ({ data }) => ({ data })
	})
)(Category);
