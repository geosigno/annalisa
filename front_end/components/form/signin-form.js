import React from 'react';
import Link from 'next/link';

import useForm from 'react-hook-form';

import { TextField, Button, CircularProgress } from '@material-ui/core';

import { formStyle, formStyleUI } from './form-style';

const SignInForm = (props) => {
	const { onSubmit, handleChange, loading } = props;
	const { register, handleSubmit, watch, errors } = useForm();
	const classes = formStyleUI();
	return (
		<div>
			<div className="fullPage">
				<div className="fullPage__container">
					<form className="form" onSubmit={handleSubmit(onSubmit)}>
						<h2 className="form__title">Content de vous revoir!</h2>
						<div className="form__container">
							{/* <a href='http://localhost:1337/connect/facebook/'>Connect with Facebook</a> */}
							<div className="input__container">
								<TextField
									id="identifier"
									name="identifier"
									label="identifier"
									onChange={handleChange}
									className={classes.input}
									inputRef={register({ required: true, minLength: 3 })}
									error={errors.identifier ? true : false}
								/>
								{errors.identifier && errors.identifier.type == 'required' && (
									<p className="input__error">L'identifiant est obligatoire</p>
								)}
							</div>
							<div className="input__container">
								<TextField
									id="password"
									name="password"
									type="password"
									label="password"
									onChange={handleChange}
									className={classes.input}
									inputRef={register({ required: true })}
									error={errors.password ? true : false}
								/>
								{errors.password && errors.password.type == 'required' && (
									<p className="input__error">Le mot de passe est obligatoire</p>
								)}
							</div>
						</div>
						<Button className={classes.btnPrimary} type="submit">
							{loading && <CircularProgress size={24} className={classes.loader} />}
							se connecter
						</Button>
						<p className="form__info">
							Vous n&apos;avez pas encore de compte?
							<Link href="/signup">
								<a>Enregistrez vous</a>
							</Link>
						</p>
					</form>
					<Link href="/">
						<a className="form__back">Retourner à la page d'accueil</a>
					</Link>
				</div>
			</div>
			<style jsx>{formStyle}</style>
		</div>
	);
};

export default SignInForm;
