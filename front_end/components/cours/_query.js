import gql from 'graphql-tag';

const GET_ALL_COURS = gql`
	{
		cours {
			id
			Name
			Description
			created_at
			Image {
				url
				formats
			}
		}
	}
`;

export const GET_COURS_BY_ID = gql`
	query($id: ID!) {
		cour(id: $id) {
			id
			Name
			Description
			Content
			created_at
			Duration
			Image {
				url
			}
			level {
				id
				Name
			}
			categories {
				id
				Name
			}
		}
	}
`;

export const GET_ALL_COURS_BY_LEVEL_ID = gql`
	query($id: ID!) {
		level(id: $id) {
			Name
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

export const GET_ALL_COURS_BY_CAGTEGORY_ID = gql`
	query($id: ID!) {
		category(id: $id) {
			Name
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

export default GET_ALL_COURS;
