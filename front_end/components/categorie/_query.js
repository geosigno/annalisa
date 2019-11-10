import gql from 'graphql-tag';

const GET_ALL_CATEGORIES = gql`
	{
		categories {
			id
			nom
			description
			image {
				url
			}
		}
	}
`;

export const GET_ALL_COURS_BY_CAGTEGORIE_ID = gql`
	query($id: ID!) {
		categorie(id: $id) {
			cours {
				id
				nom
				description
				image {
					url
				}
			}
		}
	}
`;

export default GET_ALL_CATEGORIES;
