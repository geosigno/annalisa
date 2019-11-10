import React from 'react';
import { graphql } from 'react-apollo';
import Router from 'next/router';
import { Grid, CircularProgress } from '@material-ui/core';
import Auth from '../auth';
import NiveauThumbnail from './niveauThumbnail';
import { GET_ALL_NIVEAUX } from './_query';

const auth = new Auth();

const NiveauxList = ({ data: { loading, error, niveaus } }) => {
	if (loading) {
		return (
			<div className="loader-container">
				<CircularProgress size={128} />
			</div>
		);
	}

	if (error) {
		Router.push('/signin');
	}

	if (niveaus && niveaus.length) {
		return (
			<Grid container direction="row" justify="flex-start" spacing={8}>
				{niveaus.map((item) => (
					<Grid key={item.id} item xs={12} sm={3}>
						<NiveauThumbnail niveaus={item} />
					</Grid>
				))}
			</Grid>
		);
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
