import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Cell } from 'styled-css-grid';
import { withApollo } from '../../apollo/apollo';

import ProtectedContent from '../ProtectedContent';
import { CardListLoader } from '../Loader';
import Card from './Card';

const CardList = (props) => {
	const { query, variables, limit, type } = props;

	const { loading, error, data } = useQuery(query, variables);

	// error logic
	if (error && error.graphQLErrors) {
		const isForbidden = error.graphQLErrors.some((error) => error.message.includes('Forbidden'));
		if (isForbidden) {
			return <ProtectedContent />;
		}
	}

	// loading state
	const nbSkeletonToDisplay = limit ? limit + 1 : 6;
	if (loading) return <CardListLoader n={nbSkeletonToDisplay} />;

	let response;

	switch (type) {
		case 'cours':
			if (data.cours)
				// get all cours
				response = data.cours;
			else if (data.levelBySlug && data.levelBySlug.cours)
				// get cours by level
				response = data.levelBySlug.cours;
			else if (data.categoryBySlug && data.categoryBySlug.cours)
				// get cours by category
				response = data.categoryBySlug.cours;
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
				{limit && <Card data={{}} type={type} loadMore />}
			</Grid>
		);

	return false;
};

export default withApollo({ ssr: true })(CardList);
