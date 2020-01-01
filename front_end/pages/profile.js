import React from 'react';
import axios from 'axios';
import Auth from '../helpers/auth';

const Profile = ({ data }) => {
	console.log(data);
	return (
		<section>
			<h1>Profile</h1>
			{data}
		</section>
	);
};

Profile.getInitialProps = async ({ req }) => {
	const bearer = {
		headers: Auth.getBearer()
	};
	console.log(`bearer ${bearer}`);
	return axios
		.get('http://localhost:1337/users/me', bearer)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			// Handle error.
			return error.response;
		});
};

export default Profile;
