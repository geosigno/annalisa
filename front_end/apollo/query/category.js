import gql from 'graphql-tag';

const GET_ALL_CATEGORIES = gql`
	query($limit: Int) {
		categories(limit: $limit) {
			id
			Name
			Description
			Image {
				url
			}
		}
	}
`;

export default GET_ALL_CATEGORIES;
