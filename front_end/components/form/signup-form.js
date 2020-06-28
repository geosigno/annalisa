import React from 'react';
import Link from 'next/link';

import { useForm } from 'react-hook-form';

import { TextField, Button, CircularProgress } from '@material-ui/core';
import store from '../../redux/stores';

// import { ThemeProvider } from '@material-ui/styles';

import Alert from '../Alert';

import { formStyle, formStyleUI } from './form-style';

const SignUpForm = (props) => {
	const { onRegisterSubmit, handleChange, loading, error } = props;

	const { register, handleSubmit, errors } = useForm();

	const classes = formStyleUI();

	const { contentToGoTitle } = store.getState().rootReducer;

	const hook = !contentToGoTitle
		? 'Rejoignez Annalisa lesson'
		: `Enregistrez vous pour accédez au cours "${contentToGoTitle}"!`;

	return (
		<form className='form' onSubmit={handleSubmit(onRegisterSubmit)}>
			<h2 className='form__title'>{hook}</h2>
			<div className='form__container'>
				{error && <Alert text={error} />}
				<div className='input__container'>
					{/* <ThemeProvider theme={theme}> */}
					<TextField
						id='username'
						label='nom'
						name='nom'
						onChange={handleChange}
						className={classes.input}
						inputRef={register({ required: true, minLength: 3 })}
						error={!!errors.nom}
					/>
					{/* </ThemeProvider> */}
					{errors.nom && errors.nom.type === 'required' && (
						<p className='input__error'>L&lsquo;identifiant est obligatoire</p>
					)}
				</div>
				<div className='input__container'>
					<TextField
						id='email'
						label='email'
						name='email'
						onChange={handleChange}
						className={classes.input}
						inputRef={register({
							required: true,
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
							}
						})}
						error={!!errors.email}
					/>
					{errors.email && errors.email.type === 'required' && (
						<p className='input__error'>L&lsquo;email est obligatoire</p>
					)}
					{errors.email && errors.email.type === 'pattern' && (
						<p className='input__error'>L&lsquo;email est invalide</p>
					)}
				</div>
				<div className='input__container'>
					<TextField
						id='password'
						type='password'
						label='password'
						name='password'
						onChange={handleChange}
						className={classes.input}
						inputRef={register({ required: true, minLength: 8, maxLength: 30 })}
						error={!!errors.password}
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
			<Button className={classes.btnPrimary} type='submit'>
				{loading && <CircularProgress size={24} className={classes.loader} />}
				s&apos;enregistrer
			</Button>
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
