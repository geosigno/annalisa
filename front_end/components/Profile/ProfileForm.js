import React from 'react';

import Input from '../form/input';

const ProfileForm = (props) => {
	const {
		data: {
			id,
			username,
			email,
			avatar: { url }
		}
	} = props;

	return <form />;
};

export default ProfileForm;
