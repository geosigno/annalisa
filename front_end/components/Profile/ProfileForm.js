import React from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';

import { getBearer } from '../../helpers/auth';
import Input from '../form/Input';
import Textarea from '../form/Textarea';

const ProfileForm = (props) => {
	const { register, handleSubmit, errors } = useForm();
	const {
		data: { id, username, email, Bio, avatar }
	} = props;

	const onFormSubmit = (data) => {
		const headers = getBearer();
		axios.put('http://localhost:1337/users/me', data, { headers }).then((response) => {
			response.data.username && Cookies.set('username', response.data.username);
			Router.push('/profile');
		});
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<div>
					<Input id='email' label='Email' name='email' value={email} disabled />
				</div>
				<div>
					<Input
						id='username'
						label='Username'
						name='username'
						value={username}
						register={register({ required: true })}
						errors={errors}
					/>
					{errors.username && errors.username.type === 'required' && (
						<p className='input__error'>L&apos;identifiant est obligatoire</p>
					)}
				</div>
				<div>
					<Textarea id='bio' label='Bio' name='Bio' value={Bio && Bio} register={register} errors={errors} />
				</div>
				<button type='submit'>Mettre à jour</button>
			</form>
			<style jsx>{`
				form {
					max-width: 500px;
					margin: 0 auto;
				}
			`}</style>
		</div>
	);
};

export default ProfileForm;
