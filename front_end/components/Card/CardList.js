import React from 'react';
import { Grid, Cell } from 'styled-css-grid';
import Card from './Card';

const CardList = (props) => {
	const { data, type } = props;

	return (
		<Grid columns={3} gap='64px' columns='repeat(auto-fit,minmax(320px,1fr))'>
			{data.map((item) => {
				switch (type) {
					case 'cours':
						item.LinkHref = `/cours?id=${item.id}`;
						item.LinkAs = `/cours/${item.id}`;
						break;

					case 'niveau':
						item.LinkHref = `/niveau?id=${item.id}`;
						item.LinkAs = `/niveau/${item.id}`;
						break;

					case 'categorie':
						item.LinkHref = `/categorie?id=${item.id}`;
						item.LinkAs = `/categorie/${item.id}`;
						break;

					default:
						break;
				}
				return (
					<Cell key={item.id}>
						<Card data={item} />
					</Cell>
				);
			})}
		</Grid>
	);
};

export default CardList;
