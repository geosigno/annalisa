import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

import { useForm } from 'react-hook-form';
import store from '../../redux/stores';
import Auth from '../../helpers/auth';

import formStyle from './form-style';

import Input from './input';
import GoogleLogo from './google.svg';

import Alert from '../Alert';

const SignUpForm = () => {
	const { register, handleSubmit, errors } = useForm();

	const { contentToGoTitle } = store.getState().rootReducer;

	const onRegisterSubmit = (data) => {
		Auth.register(data).then((response) => {
			if (response.status === 400 && response.data.message[0].messages[0].id === 'Auth.form.error.email.taken') {
				// setError('Il semble que cet e-mail est déjà utilisé. Veuillez vous connectez ou utiliser un autre e-mail');
			}
		});
	};

	const hook = !contentToGoTitle
		? 'Rejoignez Annalisa lesson'
		: `Enregistrez vous pour accédez au cours "${contentToGoTitle}"!`;

	return (
		<form className='form' onSubmit={handleSubmit(onRegisterSubmit)}>
			<h2 className='form__title'>{hook}</h2>
			<div className='form__social'>
				{/* <a
					href='http://localhost:1337/connect/facebook'
					onClick={(e) => {
						const { contentToGoURL } = store.getState().rootReducer;
						contentToGoURL && Cookies.set('contentToGoURL', contentToGoURL);
					}}
					className='btn btn--google'>
					<GoogleLogo /> 
					Se connecter avec Facebook
				</a> */}
				<a
					href='http://localhost:1337/connect/google'
					onClick={(e) => {
						const { contentToGoURL } = store.getState().rootReducer;
						contentToGoURL && Cookies.set('contentToGoURL', contentToGoURL);
					}}
					className='btn btn--google'>
					<GoogleLogo />
					Se connecter avec Google
				</a>
			</div>
			<div className='form__container'>
				{/* {error && <Alert text={error} />} */}
				<div className='input__container'>
					<Input
						id='username'
						label='Nom'
						name='username'
						register={register({ required: true, minLength: 3 })}
						errors={errors}
					/>
					{errors.username && errors.username.type === 'required' && (
						<p className='input__error'>L&lsquo;identifiant est obligatoire</p>
					)}
				</div>
				<div className='input__container'>
					<Input
						id='email'
						label='Email'
						name='email'
						register={register({
							required: true,
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
							}
						})}
						errors={errors}
					/>
					{errors.email && errors.email.type === 'required' && (
						<p className='input__error'>L&lsquo;email est obligatoire</p>
					)}
					{errors.email && errors.email.type === 'pattern' && (
						<p className='input__error'>L&lsquo;email est invalide</p>
					)}
				</div>
				<div className='input__container'>
					<Input
						id='password'
						label='Mot de passe'
						name='password'
						register={register({ required: true, minLength: 8, maxLength: 30 })}
						errors={errors}
					/>
					{errors.password && errors.password.type === 'required' && (
						<p className='input__error'>Le mot de passe est obligatoire</p>
					)}
					{errors.password && errors.password.type === 'minLength' && (
						<p className='input__error'>Le mot de passe doit avoir un minimum de 8 caractères</p>
					)}
					{errors.password && errors.password.type === 'maxLength' && (
						<p className='input__error'>Le mot de passe doit avoir un maximum de 30 caractères</p>
					)}
				</div>
			</div>
			<button type='submit'>S'enregistrer</button>
			<p className='form__info'>
				Vous avez déja un compte?
				<Link href='/connection'>
					<a>Connectez vous</a>
				</Link>
			</p>
			<style jsx>{formStyle}</style>
		</form>
	);
};

export default SignUpForm;
