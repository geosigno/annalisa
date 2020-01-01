import React from 'react';
import { Grid, Cell } from 'styled-css-grid';
import Card from './Card';

const CardList = (props) => {
	const { data, type } = props;

	return (
		<Grid gap='64px' columns='repeat(auto-fit,minmax(320px,1fr))'>
			{data.map((item) => {
				const element = item;
				switch (type) {
					case 'cours':
						element.LinkHref = `/cours?id=${item.id}`;
						element.LinkAs = `/cours/${item.id}`;
						break;

					case 'niveau':
						element.LinkHref = `/niveau?id=${item.id}`;
						element.LinkAs = `/niveau/${item.id}`;
						break;

					case 'categorie':
						element.LinkHref = `/categorie?id=${item.id}`;
						element.LinkAs = `/categorie/${item.id}`;
						break;

					default:
						break;
				}
				return (
					<Cell key={element.id}>
						<Card data={element} />
					</Cell>
				);
			})}
		</Grid>
	);
};

export default CardList;
