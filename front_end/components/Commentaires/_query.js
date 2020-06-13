import gql from 'graphql-tag';

export const GET_COMMENTS_BY_COURS_ID = gql`
	query($id: ID!) {
		cour(id: $id) {
			id
			comments(sort: "created_at:asc") {
				id
				Content
				created_at
				parentID
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

export const CREATE_COMMENTAIRE = gql`
	mutation createCommentaire($texte: String!, $cour: ID!, $user: ID!, $parentID: ID) {
		createCommentaire(input: { data: { texte: $texte, cour: $cour, user: $user, parentID: $parentID } }) {
			CREATE_COMMENTAIRE {
				id
				Content
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

export default GET_COMMENTS_BY_COURS_ID;
