import React from 'react';
import { graphql } from 'react-apollo';
import Router from 'next/router';

import Auth from '../auth';
import Loader from '../Loader';

import CardList from '../Card/CardList';

import GET_ALL_CATEGORIES from './_query';

const auth = new Auth();

const CategoriesList = ({ data: { loading, error, categories } }) => {
	if (loading) {
		return <Loader size='small' />;
	}

	if (error) {
		Router.push('/signin');
	}

	if (categories && categories.length) {
		return <CardList data={categories} type='categorie' />;
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
