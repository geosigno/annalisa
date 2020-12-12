import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Cell } from 'styled-css-grid';
import { withApollo } from '../../apollo/apollo';

import ProtectedContent from '../ProtectedContent';
import CardLoader from '../Loader/CardLoader';
import Card from './Card';

const proceedData = (data, type, loadMore) => {
	let response;

	if (type === 'cours') {
		response = data?.cours || data?.coursBySlug?.cours || data?.categoryBySlug?.cours || data?.levelBySlug?.cours;
	} else if (type === 'level') {
		response = data?.levels;
	} else {
		response = data?.categories;
	}

	response = response.map((item) => {
		item.linkHref = `/${type}?id=${item.slug}`;
		if (type === 'cours') {
			item.linkAs = `/cours/${item.slug}`;
		} else if (type === 'level') {
			item.linkAs = `/niveau/${item.slug}`;
		} else {
			item.linkAs = `/categorie/${item.slug}`;
		}
		return item;
	});

	if (loadMore) {
		let item = { loadMore: true };
		if (type === 'cours') {
			item.linkAs = `/cours`;
			item.linkHref = `/cours`;
			item.Name = 'Tous les cours';
			item.slug = 'tous-les-cours';
		} else if (type === 'level') {
			item.linkAs = `/niveau`;
			item.linkHref = `/niveau`;
			item.Name = 'Tous les niveaux';
			item.slug = 'tous-les-niveaux';
		} else {
			item.linkAs = `/categorie`;
			item.linkHref = `/categorie`;
			item.Name = 'Toutes les catégories';
			item.slug = 'tous-les-categories';
		}
		response.push(item);
	}
	return response;
};

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
	if (loading) {
		const nbSkeletonToDisplay = limit ? limit + 1 : 6;
		return <CardLoader n={nbSkeletonToDisplay} />;
	}

	const response = proceedData(data, type, limit);

	if (response) {
		return (
			<Grid gap='64px' columns='1fr 1fr 1fr'>
				{response.map((item) => (
					<Cell key={item.slug}>
						<Card data={item} type={type} />
					</Cell>
				))}
			</Grid>
		);
	}

	return false;
};

export default withApollo({ ssr: true })(CardList);