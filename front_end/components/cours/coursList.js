import React from 'react';
import { graphql } from 'react-apollo';
import Router from 'next/router';
import { Grid } from '@material-ui/core';
import Auth from '../auth';
import Loader from '../Loader';
import CoursThumbnail from './CoursThumbnail';
import GET_ALL_COURS from './_query';

const auth = new Auth();

const CoursList = ({ data: { loading, error, cours } }) => {
	if (loading) {
		return <Loader size="small" />;
	}

	if (error) {
		Router.push('/signin');
	}

	if (cours && cours.length) {
		return (
			<Grid container direction="row" justify="flex-start" spacing={8}>
				{cours.map((item) => (
					<Grid key={item.id} item xs={12} sm={3}>
						<CoursThumbnail cours={item} />
					</Grid>
				))}
			</Grid>
		);
	}

	return false;
};

export default graphql(GET_ALL_COURS, {
	options: {
		context: {
			headers: auth.getBearer()
		}
	},
	props: ({ data }) => ({ data })
})(CoursList);
