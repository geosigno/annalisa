import React from 'react';
import Head from 'next/head';
import { compose } from 'recompose';
import { withRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import { withApollo } from '../apollo/apollo';
import defaultPage from '../hoc/defaultPage';
import Container from '../components/Container';
import Breadcrumb from '../components/Breadcrumb';
import CardLoader from '../components/Loader/CardLoader';
import ProtectedContent from '../components/ProtectedContent';
import CardList from '../components/Card/CardList';

import { GET_ALL_COURS_BY_LEVEL_ID } from '../apollo/query/cours';
import GET_ALL_LEVELS from '../apollo/query/level';

import { setCurrentPath } from '../helpers/path';

const Niveau = ({ router }) => {
	const isDetailledPage = !!router.query.id;

	// if no id is set, that means this is the All Levels page
	if (!isDetailledPage) {
		return (
			<div>
				<Head>
					<title>Tous les niveaux</title>
				</Head>
				<Container>
					<Breadcrumb items={[{ href: '/niveau', label: 'Niveaux' }]} />
					<h2>Tous les niveaux</h2>
					<CardList type='level' query={GET_ALL_LEVELS} />
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
	const { loading, error, data } = useQuery(GET_ALL_COURS_BY_LEVEL_ID, variables);

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
				<Breadcrumb items={[{ href: '/niveau', label: 'Niveaux' }]} />
				<h2>Niveau:</h2>
				<CardLoader n={3} />
			</Container>
		);

	if (data && data.levelBySlug) {
		setCurrentPath('niveau', data.levelBySlug.name, router.query.id);

		return (
			<div>
				<Head>
					<title>Niveau: {data.levelBySlug.name}</title>
				</Head>

				<Container>
					<Breadcrumb
						items={[
							{ href: '/niveau', label: 'Niveaux' },
							{ href: '', label: data.levelBySlug.name }
						]}
					/>
					<h2>Niveau: {data.levelBySlug.name}</h2>
					<CardList type='cours' query={GET_ALL_COURS_BY_LEVEL_ID} variables={variables} />
				</Container>
			</div>
		);
	}

	return false;
};

export default compose(withApollo({ ssr: false }), withRouter, defaultPage)(Niveau);
