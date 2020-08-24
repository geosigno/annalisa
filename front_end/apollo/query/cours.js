import gql from 'graphql-tag';

export const GET_ALL_COURS = gql`
	query($limit: Int) {
		cours(limit: $limit) {
			id
			slug
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
	query($id: String!) {
		courBySlug(slug: $id) {
			id
			slug
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
				slug
				Name
			}
			categories {
				id
				slug
				Name
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
			Name
			cours {
				id
				slug
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
	query($id: String!) {
		categoryBySlug(slug: $id) {
			Name
			cours {
				id
				slug
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
