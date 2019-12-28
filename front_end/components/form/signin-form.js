import React from 'react';
import Link from 'next/link';

import useForm from 'react-hook-form';

import { TextField, Button, CircularProgress } from '@material-ui/core';
import store from '../../stores';

import { formStyle, formStyleUI } from './form-style';

const SignInForm = (props) => {
	const { onLoginSubmit, handleChange, loading } = props;

	const { register, handleSubmit, errors } = useForm();

	const classes = formStyleUI();

	const articleTitle = store.getState() ? store.getState().articleLockedTitle : null;
	const hook = !articleTitle ? 'Content de vous revoir!' : `Connectez vous pour accédez au cours "${articleTitle}"!`;

	return (
		<form className='form' onSubmit={handleSubmit(onLoginSubmit)}>
			<h2 className='form__title'>{hook}</h2>
			<div className='form__container'>
				{/* <a href='http://localhost:1337/connect/facebook/'>Connect with Facebook</a> */}
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
				<Link href='/signup'>
					<a>Enregistrez vous</a>
				</Link>
			</p>
			<style jsx>{formStyle}</style>
		</form>
	);
};

// };

export default SignInForm;
