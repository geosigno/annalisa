import React from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faGraduationCap, faTags } from '@fortawesome/free-solid-svg-icons';
import defaultPage from '../hoc/defaultPage';
import CoursList from '../components/cours/coursList';
import NiveauxList from '../components/niveau/niveauxList';
import CategoriesList from '../components/categorie/categoriesList';

const Home = () => (
	<div>
		<Head>
			<title>Home</title>
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<h2>
			Accédez aux derniers cours
			<FontAwesomeIcon icon={faBookOpen} size='2x' color='#999' />
		</h2>
		<CoursList />
		<h2>
			Cherchez un niveau particulier
			<FontAwesomeIcon icon={faGraduationCap} size='2x' color='#999' />
		</h2>
		<NiveauxList />
		<h2>
			Choisissez une catégorie
			<FontAwesomeIcon icon={faTags} size='2x' color='#999' />
		</h2>

		<CategoriesList />
	</div>
);

export default defaultPage(Home);
