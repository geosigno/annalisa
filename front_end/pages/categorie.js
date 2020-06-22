import React from 'react';
import Head from 'next/head';
import { compose } from 'recompose';
import { withRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import store from '../redux/stores';
import { addPageType, addPageName, addPageID } from '../redux/actions';

import { withApollo } from '../apollo/apollo';
import defaultPage from '../hoc/defaultPage';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';
import CardList from '../components/Card/CardList';

import { GET_ALL_COURS_BY_CAGTEGORY_ID } from '../components/Cours/_query';

const Category = ({ router }) => {
	const { loading, error, data } = useQuery(GET_ALL_COURS_BY_CAGTEGORY_ID, {
		variables: {
			id: router.query.id
		}
	});

	if (loading) return <Loader size='small' />;

	if (data) {
		store.dispatch(addPageType('categorie'));
		store.dispatch(addPageName(data.category.Name));
		store.dispatch(addPageID(router.query.id));

		return (
			<div>
				<Head>
					<title>Categorie: {data.category.Name}</title>
				</Head>

				<Breadcrumb
					items={[
						{ href: '', label: 'Catégorie' },
						{ href: '', label: data.category.Name }
					]}
				/>

				<h2>Categorie: {data.category.Name}</h2>

				<CardList
					query={GET_ALL_COURS_BY_CAGTEGORY_ID}
					variables={{
						variables: {
							id: router.query.id
						}
					}}
					type='cours'
				/>
			</div>
		);
	}

	return false;
};

export default compose(withApollo({ ssr: false }), withRouter, defaultPage)(Category);
