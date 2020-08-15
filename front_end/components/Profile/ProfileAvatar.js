import React, {useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Toast from '../Toast';
import { MdEdit } from 'react-icons/md';

import getImage from '../../helpers/image';
import { getBearer } from '../../helpers/auth';
import { setCookieAvatar } from '../../helpers/auth';

const ProfileAvatar = ({avatar, username}) => {

    const [currentAvatar, setCurrentAvatar] = useState(avatar);

    let inputAvatar;

	const uploadAvatar = (avatar) => {
		const formData = new FormData();
		formData.append('files', avatar);

		const contentTypeHeader = { 'Content-Type': 'multipart/form-data' };
		const authorizationHeader = getBearer();
		const headers = { ...contentTypeHeader, ...authorizationHeader };

		return new Promise((resolve) => {
			axios.post('http://localhost:1337/upload', formData, { headers }).then((response) => {
				const uploadID = response.data[0].id;
				resolve(uploadID);
			});
		});
    };
    
    const updateProfile = async (avatar) => {
        const avatarID = await uploadAvatar(avatar);
        const data = {avatar: avatarID}
		const headers = getBearer();
		axios.put('http://localhost:1337/users/me', data, { headers }).then((response) => {
            const newAvatar = response?.data?.avatar;
            const userAvatar = response?.data?.avatar[0]?.formats?.thumbnail?.url;
            setCookieAvatar(userAvatar);
            setCurrentAvatar(newAvatar);
            toast('Votre photo de profile a été mise à jour!');
			// Router.push('/profile');
		});
	};

	const handleChange = (e) => {
		e.target?.files[0] && updateProfile(e.target.files[0]);
    };
    
    return (
        <div className='avatar'>
        <button className='avatar__upload' onClick={(e) => inputAvatar.click()}>
            <MdEdit size='32px' />
            <p className='sr-only'>Changez ma photo de profil</p>
        </button>
        {currentAvatar && currentAvatar[0] && (
            <img
                src={`http://localhost:1337${getImage(currentAvatar, 'medium')}`}
                alt={`Avatar de ${username}`}
            />
        )}
        <div>
            <input
                type='file'
                ref={(e) => {
                    inputAvatar = e;
                }}
                onChange={handleChange}
                id='avatar'
                name='avatar'
            />
        </div>
        <Toast />
        <style jsx>{`
				.avatar {
					position: relative;
					border-radius: 50%;
					overflow: hidden;
					width: 160px;
					height: 160px;
				}
				.avatar:hover .avatar__upload {
					cursor: pointer;
					opacity: 1;
				}
				.avatar svg {
					color: white;
				}
				.avatar img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
				.avatar__upload {
					color: white;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					background: rgba(0, 0, 0, 0.2);
					opacity: 0;
					will-change: opacity;
					transition: opacity 0.2s;
				}
				input[type='file'] {
					display: none;
				}
			`}</style>
    </div>
    )
}

export default ProfileAvatar;