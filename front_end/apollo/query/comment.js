import gql from 'graphql-tag';

export const GET_ALL_COMMENTS_BY_COURS_ID = gql`
	query($id: String!) {
		comments(sort: "created_at:asc", where: { cour: { slug: $id } }) {
			id
			content
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
`;

export const GET_COMMENTS_BY_COURS_ID = gql`
	query($id: String!, $userID: String!) {
		comments(sort: "created_at:asc", where: { cour: { slug: $id }, user: { id: $userID } }) {
			id
			content
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
`;

export const CREATE_COMMENT = gql`
	mutation createComment($content: String!, $cour: ID!, $user: ID!, $parentID: String) {
		createComment(input: { data: { content: $content, cour: $cour, user: $user, parentID: $parentID } }) {
			comment {
				id
				content
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
