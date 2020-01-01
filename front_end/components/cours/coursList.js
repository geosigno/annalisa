import React from 'react';
import { graphql } from 'react-apollo';
import Router from 'next/router';
import Auth from '../../helpers/auth';
import Loader from '../Loader';
import CardList from '../Card/CardList';

import GET_ALL_COURS from './_query';

const CoursList = ({ data: { loading, error, cours } }) => {
	if (loading) {
		return <Loader size='small' />;
	}

	if (error) {
		Router.push('/signin');
	}

	if (cours && cours.length) {
		return <CardList data={cours} type='cours' />;
	}

	return false;
};

export default graphql(GET_ALL_COURS, {
	options: {
		context: {
			headers: Auth.getBearer()
		}
	},
	props: ({ data }) => ({ data })
})(CoursList);
