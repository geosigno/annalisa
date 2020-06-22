import React from 'react';
import Head from 'next/head';
import { compose } from 'recompose';
import { withRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import { withApollo } from '../apollo/apollo';
import defaultPage from '../hoc/defaultPage';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';
import CardList from '../components/Card/CardList';

import { GET_ALL_COURS_BY_LEVEL_ID } from '../components/cours/_query';

const Niveau = ({ router }) => {
	const { loading, error, data } = useQuery(GET_ALL_COURS_BY_LEVEL_ID, {
		variables: {
			id: router.query.id
		}
	});

	if (loading) return <Loader size='small' />;
	console.log(data);
	if (data) {
		return (
			<div>
				<Head>
					<title>Niveau: {data.level.Name}</title>
				</Head>

				<Breadcrumb
					items={[
						{ href: '', label: 'Niveau' },
						{ href: '', label: data.level.Name }
					]}
				/>

				<h2>Niveau: {data.level.Name}</h2>

				<CardList
					query={GET_ALL_COURS_BY_LEVEL_ID}
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
};

export default compose(withApollo({ ssr: false }), withRouter, defaultPage)(Niveau);
