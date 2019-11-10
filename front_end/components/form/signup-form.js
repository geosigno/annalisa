import React from 'react';
import Link from 'next/link';

import useForm from 'react-hook-form';

import Alert from '../Alert';

import { TextField, Button, CircularProgress } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import { formStyle, formStyleUI, theme } from './form-style';

const SignInForm = (props) => {
	const { onSubmit, handleChange, loading, error } = props;
	const { register, handleSubmit, watch, errors } = useForm();
	const classes = formStyleUI();
	return (
		<div>
			<div className="fullPage">
				<div className="fullPage__container">
					<form className="form" onSubmit={handleSubmit(onSubmit)}>
						<h2 className="form__title">Rejoingnez Annalise French lessons!</h2>
						<div className="form__container">
							{error && <Alert text={error} />}
							<div className="input__container">
								{/* <ThemeProvider theme={theme}> */}
								<TextField
									id="username"
									label="nom"
									name="nom"
									onChange={handleChange}
									className={classes.input}
									inputRef={register({ required: true, minLength: 3 })}
									error={errors.nom ? true : false}
								/>
								{/* </ThemeProvider> */}
								{errors.nom && errors.nom.type == 'required' && (
									<p className="input__error">L'identifiant est obligatoire</p>
								)}
							</div>
							<div className="input__container">
								<TextField
									id="email"
									label="email"
									name="email"
									onChange={handleChange}
									className={classes.input}
									inputRef={register({
										required: true,
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
										}
									})}
									error={errors.email ? true : false}
								/>
								{errors.email && errors.email.type == 'required' && (
									<p className="input__error">L'email est obligatoire</p>
								)}
								{errors.email && errors.email.type == 'pattern' && <p className="input__error">L'email est invalide</p>}
							</div>
							<div className="input__container">
								<TextField
									id="password"
									type="password"
									label="password"
									name="password"
									onChange={handleChange}
									className={classes.input}
									inputRef={register({ required: true, minLength: 8, maxLength: 30 })}
									error={errors.password ? true : false}
								/>
								{errors.password && errors.password.type == 'required' && (
									<p className="input__error">Le mot de passe est obligatoire</p>
								)}
								{errors.password && errors.password.type == 'minLength' && (
									<p className="input__error">Le mot de passe doit avoir un minimum de 8 caractères</p>
								)}
								{errors.password && errors.password.type == 'maxLength' && (
									<p className="input__error">Le mot de passe doit avoir un maximum de 30 caractères</p>
								)}
							</div>
						</div>
						<Button className={classes.btnPrimary} type="submit">
							{loading && <CircularProgress size={24} className={classes.loader} />}
							s&apos;enregistrer
						</Button>
						<p className="form__info">
							Vous avez déja un compte?
							<Link href="/signin">
								<a>Connectez vous</a>
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
