import React from 'react';

const ProfileMain = (props) => {
	const { email, username, avatar, bio } = props;

	return (
		<section>
			<h1>Profile</h1>

			{avatar.url && <img src={`http://localhost:1337${avatar.url}`} alt={`Avatar de ${username}`} />}

			<input type='disabled' name='email' value={email} />

			<input name='username' value={username} />

			<textarea name='bio' value={bio} />

			<input type='submit' value='Update profile' />
		</section>
	);
};

export default ProfileMain;
