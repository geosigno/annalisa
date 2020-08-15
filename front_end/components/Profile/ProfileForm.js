import React from 'react';
import { MdEmail, MdHome, MdFormatQuote, MdAirplanemodeActive } from 'react-icons/md';

import { dateToFormat } from '../../helpers/date';
import ProfileAvatar from './ProfileAvatar';
import ProfileItem from './ProfileItem';

const ProfileForm = (props) => {
	const {
		data: { id, created_at, username, email, Bio, country_of_origin, current_country, avatar }
	} = props;

	return (
		<div className='profileForm'>
			<div className='profileForm__left'>
				<ProfileAvatar avatar={avatar} />

				{username && <ProfileItem id='username' label='Username' value={username} />}

				{Bio && <ProfileItem id='Bio' label='Bio' value={Bio} icon={<MdFormatQuote size='16px' />} type='textarea' />}

				{email && (
					<ProfileItem id='email' label='Email' value={email} icon={<MdEmail size='16px' />} editable={false} />
				)}

				{country_of_origin && (
					<ProfileItem
						id='country_of_origin'
						label="Pays d'origine"
						value={country_of_origin}
						icon={<MdHome size='16px' />}
						type='country'
					/>
				)}

				{current_country && (
					<ProfileItem
						id='current_country'
						label='Pays actuel'
						value={current_country}
						icon={<MdAirplanemodeActive size='16px' />}
						type='country'
					/>
				)}

				{created_at && <p>Membre depuis le {dateToFormat(created_at)}</p>}
			</div>

			<style jsx>{`
				.profileForm {
					display: flex;
					align-items: center;
				}
				.profileForm__left {
					flex-basis: 50%;
				}
				.profileForm__right {
					flex-basis: 50%;
				}
				form {
					max-width: 500px;
					margin: 0 auto;
				}
			`}</style>
		</div>
	);
};

export default ProfileForm;
