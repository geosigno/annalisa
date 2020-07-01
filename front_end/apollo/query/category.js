import gql from 'graphql-tag';

const GET_ALL_CATEGORIES = gql`
	query($limit: Int) {
		categories(limit: $limit) {
			id
			slug
			Name
			Description
			Image {
				url
			}
		}
	}
`;

export default GET_ALL_CATEGORIES;
