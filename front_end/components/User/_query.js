const GET_USER_ID = gql`
	query {
		me {
			id
		}
	}
`;

const GET_USER_AVATAR = gql`
	query {
		me {
			avatar
		}
	}
`;
