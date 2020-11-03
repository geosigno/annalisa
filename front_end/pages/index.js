import React from 'react';
import Head from 'next/head';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBookOpen, faGraduationCap, faTags } from '@fortawesome/free-solid-svg-icons';
import defaultPage from '../hoc/defaultPage';
import Heading from '../components/Heading';
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
				<Heading text='Accédez aux derniers cours' size='2' />
				<CardList type='cours' query={GET_ALL_COURS} variables={queryVariables} limit={queryLimit} />
				<Heading text='Choisissez une catégorie' size='2' />
				<CardList type='category' query={GET_ALL_CATEGORIES} variables={queryVariables} limit={queryLimit} />
				<Heading text='Cherchez un niveau particulier' size='2' />
				<CardList type='level' query={GET_ALL_LEVELS} variables={queryVariables} limit={queryLimit} />
			</Container>
		</div>
	);
};

export default defaultPage(Home);
