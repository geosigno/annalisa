import gql from 'graphql-tag';

export const GET_ALL_LEVELS = gql`
	query($limit: Int) {
		levels(limit: $limit) {
			id
			Name
			Description
			Image {
				url
			}
		}
	}
`;

export default GET_ALL_LEVELS;
