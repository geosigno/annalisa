import gql from 'graphql-tag';

export const GET_ALL_LEVELS = gql`
	{
		levels {
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
