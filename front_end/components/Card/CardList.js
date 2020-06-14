import React from 'react';
import Router from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Cell } from 'styled-css-grid';
import { withApollo } from '../../apollo/apollo';

import Loader from '../Loader';
import Card from './Card';

import GET_ALL_COURS from '../Cours/_query';
import GET_ALL_LEVELS from '../Level/_query';
import GET_ALL_CATEGORIES from '../Categorie/_query';

const CardList = (props) => {
	const { type } = props;
	let query;

	switch (type) {
		case 'cours':
			query = GET_ALL_COURS;
			break;
		case 'levels':
			query = GET_ALL_LEVELS;
			break;
		case 'categories':
			query = GET_ALL_CATEGORIES;
			break;
		default:
			query = GET_ALL_COURS;
			break;
	}

	const { loading, error, data } = useQuery(query);

	if (error) Router.push('/signin');
	if (loading) return <Loader size='small' />;

	let response;

	switch (type) {
		case 'cours':
			response = data.cours;
			break;
		case 'levels':
			response = data.levels;
			break;
		case 'categories':
			response = data.categories;
			break;
		default:
			response = data.cours;
	}

	if (response)
		return (
			<Grid gap='64px' columns='1fr 1fr 1fr'>
				{response.map((item) => {
					return (
						<Cell key={item.id}>
							<Card data={item} type={type} />
						</Cell>
					);
				})}
			</Grid>
		);

	return false;
};

export default withApollo({ ssr: false })(CardList);
