import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

import { useForm } from 'react-hook-form';

import { TextField, Button, CircularProgress } from '@material-ui/core';
import store from '../../redux/stores';

import { formStyle, formStyleUI } from './form-style';

import GoogleLogo from './google.svg';

let providerWindow;

class Modal {

	constructor() {
		this.providerWindow;
	}

	openModal = (e) => {
		e.preventDefault();
		const width = 520;
		const height = 350;
		const winTop = screen.height / 2 - height / 2;
		const winLeft = screen.width / 2 - width / 2;
		const options = `top=${winTop},left=${winLeft},toolbar=0,status=0,width=${width},height=${height}`;
		const url = 'http://localhost:1337/connect/google/'
		this.providerWindow = window.open(url, '_blank', options);


	}
	
	closeModal = (e) => {
		console.log('close', this.providerWindow)
		this.providerWindow.close();
	}
}

export let modal = new Modal();

const SignInForm = (props) => {
	const { onLoginSubmit, handleChange, loading } = props;

	const { register, handleSubmit, errors } = useForm();

	const classes = formStyleUI();

	const { contentToGoTitle } = store.getState().rootReducer;

	const hook = !contentToGoTitle
		? 'Content de vous revoir!'
		: `Connectez vous pour accédez au cours "${contentToGoTitle}"!`;
	
	return (
		<form className='form' onSubmit={handleSubmit(onLoginSubmit)}>
			<h2 className='form__title'>{hook}</h2>
			<div className='form__social'>
				<a href='http://localhost:1337/connect/google' onClick={e => {
						const { contentToGoURL } = store.getState().rootReducer;
						contentToGoURL && Cookies.set('contentToGoURL', contentToGoURL);
					}}
					className='btn btn--google' >
					<GoogleLogo />
					Se connecter avec Google
				</a>
			</div>
			<div className='form__container'>
				{/* <a href='#' onClick={handleGoogleClick}>Connect with Google</a> */}

				<div className='input__container'>
					<TextField
						id='identifier'
						name='identifier'
						label='identifier'
						onChange={handleChange}
						className={classes.input}
						inputRef={register({ required: true, minLength: 3 })}
						error={!!errors.identifier}
					/>
					{errors.identifier && errors.identifier.type === 'required' && (
						<p className='input__error'>L&lsquo;identifiant est obligatoire</p>
					)}
				</div>
				<div className='input__container'>
					<TextField
						id='password'
						name='password'
						type='password'
						label='password'
						onChange={handleChange}
						className={classes.input}
						inputRef={register({ required: true })}
						error={!!errors.password}
					/>
					{errors.password && errors.password.type === 'required' && (
						<p className='input__error'>Le mot de passe est obligatoire</p>
					)}
				</div>
			</div>
			<Button className={classes.btnPrimary} type='submit'>
				{loading && <CircularProgress size={24} className={classes.loader} />}
				se connecter
			</Button>
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

