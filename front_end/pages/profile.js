import React from 'react';
import axios from 'axios';
import defaultPage from '../hoc/defaultPage';
import Auth from '../components/auth';

const auth = new Auth();

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
		headers: auth.getBearer()
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
