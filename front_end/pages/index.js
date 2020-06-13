import React from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faGraduationCap, faTags } from '@fortawesome/free-solid-svg-icons';
import defaultPage from '../hoc/defaultPage';
import CardList from '../components/Card/CardList';

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
		<CardList type='cours' />
		<h2>
			Cherchez un niveau particulier
			{/* <FontAwesomeIcon icon={faGraduationCap} size='2x' color='#999' /> */}
		</h2>
		<CardList type='levels' />
		<h2>
			Choisissez une catégorie
			{/* <FontAwesomeIcon icon={faTags} size='2x' color='#999' /> */}
		</h2>
		<CardList type='categories' />
	</div>
);

export default defaultPage(Home);
