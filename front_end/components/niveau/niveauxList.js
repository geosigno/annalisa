import React from 'react';
import { graphql } from 'react-apollo';
import Router from 'next/router';
import { CircularProgress } from '@material-ui/core';
import Auth from '../auth';
import CardList from '../Card/CardList';
import { GET_ALL_NIVEAUX } from './_query';

const auth = new Auth();

const NiveauxList = ({ data: { loading, error, niveaus } }) => {
	if (loading) {
		return (
			<div className='loader-container'>
				<CircularProgress size={128} />
			</div>
		);
	}

	if (error) {
		Router.push('/signin');
	}

	if (niveaus && niveaus.length) {
		return <CardList data={niveaus} type='niveau' />;
	}

	return false;
};

export default graphql(GET_ALL_NIVEAUX, {
	options: {
		context: {
			headers: auth.getBearer()
		}
	},
	props: ({ data }) => ({ data })
})(NiveauxList);
