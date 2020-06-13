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

export default GET_ALL_COURS;
