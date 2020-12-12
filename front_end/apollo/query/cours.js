import gql from 'graphql-tag';

export const GET_ALL_COURS = gql`
	query($limit: Int) {
		cours(limit: $limit) {
			id
			slug
			name
			description
			created_at
			image {
				url
				formats
			}
		}
	}
`;

export const GET_COURS_BY_ID = gql`
	query($id: String!) {
		courBySlug(slug: $id) {
			id
			slug
			name
			description
			content
			created_at
			duration
			image {
				url
			}
			level {
				id
				slug
				name
			}
			categories {
				id
				slug
				name
			}
			sections {
				id
				title
				content
				type
				author
				oeuvre
				image {
					url
				}
				audio {
					url
				}
			}
		}
	}
`;

export const GET_ALL_COURS_BY_LEVEL_ID = gql`
	query($id: String!) {
		levelBySlug(slug: $id) {
			name
			cours {
				id
				slug
				name
				description
				image {
					url
				}
			}
		}
	}
`;

export const GET_ALL_COURS_BY_CAGTEGORY_ID = gql`
	query($id: String!) {
		categoryBySlug(slug: $id) {
			name
			cours {
				id
				slug
				name
				description
				image {
					url
				}
			}
		}
	}
`;

export default GET_ALL_COURS;
