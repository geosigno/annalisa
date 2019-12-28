import gql from 'graphql-tag';

const GET_ALL_COURS = gql`
	{
		cours {
			id
			nom
			description
			created_at
			image {
				url
			}
		}
	}
`;

export const GET_COURS_BY_ID = gql`
	query($id: ID!) {
		cour(id: $id) {
			id
			nom
			description
			contenu
			created_at
			duree
			image {
				url
			}
			niveau {
				id
				nom
			}
			exercices {
				id
				nom
			}
			categories {
				id
				nom
			}
			commentaires {
				id
				texte
				created_at
				parentID {
					id
				}
				user {
					id
					username
				}
			}
		}
	}
`;

export default GET_ALL_COURS;
