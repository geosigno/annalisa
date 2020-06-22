import gql from 'graphql-tag';

const GET_ALL_CATEGORIES = gql`
	{
		categories {
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
