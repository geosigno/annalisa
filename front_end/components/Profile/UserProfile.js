import React from 'react';
import { MdEmail, MdHome, MdFormatQuote, MdAirplanemodeActive } from 'react-icons/md';

import Heading from '../Heading';
import { dateToFormat } from '../../helpers/date';
import ProfileAvatar from './ProfileAvatar';
import ProfileItem from './ProfileItem';

const UserProfile = (props) => {
	const {
		data: { id, created_at, username, email, bio, country_of_origin, current_country, avatar }
	} = props;

	return (
		<div>
			<Heading text='Votre profile' size='1' />
			<ProfileAvatar avatar={avatar} />

			{username && <ProfileItem id='username' label='Username' value={username} />}

			{bio && <ProfileItem id='Bio' label='Bio' value={bio} icon={<MdFormatQuote size='16px' />} type='textarea' />}

			{email && <ProfileItem id='email' label='Email' value={email} icon={<MdEmail size='16px' />} editable={false} />}

			<ProfileItem
				id='country_of_origin'
				label="Pays d'origine"
				value={country_of_origin}
				icon={<MdHome size='16px' />}
				type='country'
			/>

			<ProfileItem
				id='current_country'
				label='Pays actuel'
				value={current_country}
				icon={<MdAirplanemodeActive size='16px' />}
				type='country'
			/>

			{created_at && <p className='member_since'>Membre depuis le {dateToFormat(created_at)}</p>}

			<style jsx>{`
				.member_since {
					font-size: 14px;
					text-align: center;
					font-style: italic;
					margin: 56px 0 0;
				}
			`}</style>
		</div>
	);
};

export default UserProfile;
