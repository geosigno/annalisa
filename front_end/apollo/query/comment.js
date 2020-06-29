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

export const CREATE_COMMENT = gql`
	mutation createComment($content: String!, $cour: ID!, $user: ID!, $parentID: String) {
		createComment(input: { data: { Content: $content, cour: $cour, user: $user, parentID: $parentID } }) {
			comment {
				id
				Content
				created_at
				parentID
				user {
					id
					username
				}
			}
		}
	}
`;

export default GET_COMMENTS_BY_COURS_ID;
