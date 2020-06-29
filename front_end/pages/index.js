import React from 'react';
import Head from 'next/head';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBookOpen, faGraduationCap, faTags } from '@fortawesome/free-solid-svg-icons';
import defaultPage from '../hoc/defaultPage';
import Container from '../components/Container';
import CardList from '../components/Card/CardList';

import GET_ALL_COURS from '../apollo/query/cours';
import GET_ALL_LEVELS from '../apollo/query/level';
import GET_ALL_CATEGORIES from '../apollo/query/category';

const Home = () => {
	const queryLimit = 2;

	const queryVariables = {
		variables: {
			limit: queryLimit
		}
	};

	return (
		<div>
			<Head>
				<title>Accueil</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Container>
				<h2>Accédez aux derniers cours</h2>
				<CardList type='cours' query={GET_ALL_COURS} variables={queryVariables} limit={queryLimit} />
				<h2>Choisissez une catégorie</h2>
				<CardList type='category' query={GET_ALL_CATEGORIES} variables={queryVariables} limit={queryLimit} />
				<h2>Cherchez un niveau particulier</h2>
				<CardList type='level' query={GET_ALL_LEVELS} variables={queryVariables} limit={queryLimit} />
			</Container>
		</div>
	);
};

export default defaultPage(Home);
