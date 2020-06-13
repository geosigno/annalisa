import gql from 'graphql-tag';

export const GET_ALL_LEVELS = gql`
	{
		levels {
			id
			Name
			Description
			Image {
				url
			}
		}
	}
`;

export const GET_ALL_COURS_BY_NIVEAU_ID = gql`
	query($id: ID!) {
		level(id: $id) {
			cours {
				id
				Name
				Description
				Image {
					url
				}
			}
		}
	}
`;

export default GET_ALL_LEVELS;
