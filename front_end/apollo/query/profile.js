import gql from 'graphql-tag';

export const GET_USER_DATA = gql`
	query {
		self {
			id
			created_at
			username
			email
			Bio
			country_of_origin
			current_country
			avatar {
				url
			}
		}
	}
`;

export const UPDATE_NAME = gql`
	mutation createCommentaire($name: String!) {
		createCommentaire(input: { data: { texte: $texte, cour: $cour, user: $user, parentID: $parentID } }) {
			commentaire {
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
