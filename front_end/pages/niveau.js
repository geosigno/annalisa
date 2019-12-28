import React from 'react';
import Router, { withRouter } from 'next/router';

import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import Auth from '../components/auth';
import Loader from '../components/Loader';
import defaultPage from '../hoc/defaultPage';

import CardList from '../components/Card/CardList';

import { GET_ALL_COURS_BY_NIVEAU_ID } from '../components/niveau/_query';

const auth = new Auth();

const Niveau = ({ data: { loading, error, niveau } }) => {
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

	if (niveau.cours && niveau.cours.length) {
		return <CardList data={niveau.cours} type='cours' />;
	}

	return false;
};

export default compose(
	withRouter,
	defaultPage,
	graphql(GET_ALL_COURS_BY_NIVEAU_ID, {
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
)(Niveau);
