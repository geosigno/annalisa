import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

import { useForm } from 'react-hook-form';
import store from '../../redux/stores';
import { login } from '../../helpers/auth';

import formStyle from './form-style';

import Input from './Input';

import GoogleLogo from './google.svg';

const SignInForm = () => {
	const { register, handleSubmit, errors } = useForm();

	const { contentToGoTitle } = store.getState().rootReducer;

	const onLoginSubmit = (data) => login(data);

	const hook = !contentToGoTitle
		? 'Content de vous revoir!'
		: `Connectez vous pour accédez au cours "${contentToGoTitle}"!`;

	return (
		<form className='form' onSubmit={handleSubmit(onLoginSubmit)}>
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
					onClick={() => {
						const { contentToGoURL } = store.getState().rootReducer;
						contentToGoURL && Cookies.set('contentToGoURL', contentToGoURL);
					}}
					className='btn btn--google'>
					<GoogleLogo />
					Se connecter avec Google
				</a>
			</div>
			<div className='form__container'>
				<div className='input__container'>
					<Input
						id='identifier'
						label='Email'
						name='identifier'
						register={register({ required: true })}
						errors={errors}
					/>
					{errors.identifier && errors.identifier.type === 'required' && (
						<p className='input__error'>L&apos;identifiant est obligatoire</p>
					)}
				</div>
				<div className='input__container'>
					<Input
						id='password'
						label='Mot de passe'
						name='password'
						type='password'
						register={register({ required: true })}
						errors={errors}
					/>
					{errors.password && errors.password.type === 'required' && (
						<p className='input__error'>Le mot de passe est obligatoire</p>
					)}
				</div>
			</div>
			<button type='submit'>Se connecter</button>
			<p className='form__info'>
				Vous n&apos;avez pas encore de compte?
				<Link href='/enregistrement'>
					<a>Enregistrez vous</a>
				</Link>
			</p>
			<style jsx>{formStyle}</style>
		</form>
	);
};

export default SignInForm;
