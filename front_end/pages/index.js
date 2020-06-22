import React from 'react';
import Head from 'next/head';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBookOpen, faGraduationCap, faTags } from '@fortawesome/free-solid-svg-icons';
import defaultPage from '../hoc/defaultPage';
import CardList from '../components/Card/CardList';

import GET_ALL_COURS from '../components/Cours/_query';
import GET_ALL_LEVELS from '../components/Level/_query';
import GET_ALL_CATEGORIES from '../components/Categorie/_query';

const Home = () => (
	<div>
		<Head>
			<title>Home</title>
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<h2>
			Accédez aux derniers cours
			{/* <FontAwesomeIcon icon={faBookOpen} size='2x' color='#999' /> */}
		</h2>
		<CardList type='cours' query={GET_ALL_COURS} />
		<h2>
			Cherchez un niveau particulier
			{/* <FontAwesomeIcon icon={faGraduationCap} size='2x' color='#999' /> */}
		</h2>
		<CardList type='level' query={GET_ALL_LEVELS} />
		<h2>
			Choisissez une catégorie
			{/* <FontAwesomeIcon icon={faTags} size='2x' color='#999' /> */}
		</h2>
		<CardList type='category' query={GET_ALL_CATEGORIES} />
	</div>
);

export default defaultPage(Home);
