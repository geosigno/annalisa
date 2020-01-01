import gql from 'graphql-tag';

export const GET_COMMENTAIRES_BY_COURS_ID = gql`
	query($id: ID!) {
		cour(id: $id) {
			id
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
					avatar {
						url
					}
				}
			}
		}
	}
`;

export default GET_COMMENTAIRES_BY_COURS_ID;
