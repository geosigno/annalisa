import gql from 'graphql-tag';

const UPDATE_USER = gql`
	mutation updateUser($id: ID!, $cours_finished: [ID]) {
		updateUser(input: { where: { id: $id }, data: { cours_finished: $cours_finished } }) {
			user {
				cours_finished {
					id
				}
			}
		}
	}
`;

export default UPDATE_USER;
