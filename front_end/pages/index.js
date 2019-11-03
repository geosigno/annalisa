import React from 'react';
import Head from 'next/head';
import CoursList from '../components/cours/coursList';
import NiveauxList from '../components/niveau/NiveauxList';
import CategoriesList from '../components/categorie/CategoriesList';

const Home = () => (
    <div>
        <Head>
            <title>Home</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <h2>Accédez aux derniers cours</h2>
        <CoursList />
        <h2>Cherchez un niveau particulier</h2>
        <NiveauxList />
        <h2>Choisissez une catégorie</h2>
        <CategoriesList />
    </div>
);

export default Home;
