import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../apollo/apollo';
import securePage from '../hoc/securePage';

import { GET_USER_DATA } from '../apollo/query/profile';

import ProfileForm from '../components/Profile/ProfileForm';

const Profile = () => {
	const { loading, error, data } = useQuery(GET_USER_DATA);
	// console.log(data.self);
	if (data && data.self) {
		<ProfileForm data={data.self} />;
	}
	return <h1>Profile</h1>;
};

export default compose(withApollo({ ssr: false }), withRouter, securePage)(Profile);
