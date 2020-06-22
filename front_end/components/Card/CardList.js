import React from 'react';
import Router from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Cell } from 'styled-css-grid';
import { withApollo } from '../../apollo/apollo';

import Loader from '../Loader';
import Card from './Card';

const CardList = (props) => {
	const { query, variables, type } = props;

	const { loading, error, data } = useQuery(query, variables);

	if (error) Router.push('/signin');

	if (loading) return <Loader size='small' />;

	let response;

	switch (type) {
		case 'cours':
			if (data.cours)
				// get all cours
				response = data.cours;
			else if (data.level && data.level.cours)
				// get cours by level
				response = data.level.cours;
			else if (data.category && data.category.cours)
				// get cours by category
				response = data.category.cours;
			break;
		case 'level':
			response = data.levels;
			break;
		case 'category':
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

export default withApollo({ ssr: true })(CardList);
