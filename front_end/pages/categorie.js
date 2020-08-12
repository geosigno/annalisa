import React from 'react';
import Head from 'next/head';
import { compose } from 'recompose';
import { withRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import { withApollo } from '../apollo/apollo';
import defaultPage from '../hoc/defaultPage';
import Container from '../components/Container';
import Breadcrumb from '../components/Breadcrumb';
import { CardListLoader } from '../components/Loader';
import ProtectedContent from '../components/ProtectedContent';

import CardList from '../components/Card/CardList';

import { GET_ALL_COURS_BY_CAGTEGORY_ID } from '../apollo/query/cours';
import GET_ALL_CATEGORIES from '../apollo/query/category';

import { setCurrentPath } from '../helpers/path';

const Category = ({ router }) => {
	const isDetailledPage = !!router.query.id;

	// if no id is set, that means this is the All Categories page
	if (!isDetailledPage) {
		return (
			<div>
				<Head>
					<title>Toutes les catégories</title>
				</Head>
				<Container>
					<Breadcrumb items={[{ href: '/categorie', label: 'Categories' }]} />
					<h2>Toutes les catégories</h2>
					<CardList type='category' query={GET_ALL_CATEGORIES} />
				</Container>
			</div>
		);
	}

	const variables = {
		variables: {
			id: router.query.id
		}
	};

	// get the category
	const { loading, error, data } = useQuery(GET_ALL_COURS_BY_CAGTEGORY_ID, variables);

	// manage errors
	if (error && error.graphQLErrors) {
		const isForbidden = error.graphQLErrors.some((item) => item.message.includes('Forbidden'));
		if (isForbidden) {
			return <ProtectedContent />;
		}
	}

	if (loading)
		return (
			<Container>
				<Breadcrumb items={[{ href: '/categorie', label: 'Categories' }]} />
				<h2>Categorie:</h2>
				<CardListLoader n={3} />
			</Container>
		);

	if (data && data.categoryBySlug) {
		setCurrentPath('categorie', data.categoryBySlug.Name, router.query.id);

		return (
			<div>
				<Head>
					<title>Categorie: {data.categoryBySlug.Name}</title>
				</Head>

				<Container>
					<Breadcrumb
						items={[
							{ href: '/categorie', label: 'Categories' },
							{ href: '', label: data.categoryBySlug.Name }
						]}
					/>
					<h2>Categorie: {data.categoryBySlug.Name}</h2>
					<CardList type='cours' query={GET_ALL_COURS_BY_CAGTEGORY_ID} variables={variables} />
				</Container>
			</div>
		);
	}

	return false;
};

export default compose(withApollo({ ssr: false }), withRouter, defaultPage)(Category);
