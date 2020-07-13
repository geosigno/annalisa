import React from 'react';
import { useForm } from 'react-hook-form';

import Input from '../form/Input';
import Textarea from '../form/Textarea';

const ProfileForm = (props) => {
	console.log('username', props);
	const { register, handleSubmit, errors } = useForm();
	const {
		data: { id, username, email, Bio, avatar }
	} = props;

	const onFormSubmit = (data) => {
		console.log(data);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<div>
					<Input id='email' label='Email' name='email' value={email} disabled />
				</div>
				<div>
					<Input
						id='identifier'
						label='Identifiant'
						name='identifier'
						value={username}
						register={register({ required: true })}
						errors={errors}
					/>
					{errors.identifier && errors.identifier.type === 'required' && (
						<p className='input__error'>L'identifiant est obligatoire</p>
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
