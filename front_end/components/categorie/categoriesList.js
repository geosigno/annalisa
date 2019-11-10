import React from 'react';
import { graphql } from 'react-apollo';
import Router from 'next/router';
import { Grid } from '@material-ui/core';

import Auth from '../auth';
import Loader from '../Loader';

import CategorieThumbnail from './CategorieThumbnail';

import GET_ALL_CATEGORIES from './_query';

const auth = new Auth();

const CategoriesList = ({ data: { loading, error, categories } }) => {
	if (loading) {
		return <Loader size="small" />;
	}

	if (error) {
		Router.push('/signin');
	}

	if (categories && categories.length) {
		return (
			<Grid container direction="row" justify="flex-start" spacing={8}>
				{categories.map((item) => (
					<Grid key={item.id} item xs={12} sm={3}>
						<CategorieThumbnail categories={item} />
					</Grid>
				))}
			</Grid>
		);
	}

	return false;
};

export default graphql(GET_ALL_CATEGORIES, {
	options: {
		context: {
			headers: auth.getBearer()
		}
	},
	props: ({ data }) => ({ data })
})(CategoriesList);
