import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import store from '../stores';
import { clear } from '../actions';

class Auth {
	constructor() {
		this.registerURL = 'http://localhost:1337/auth/local/register';
		this.loginURL = 'http://localhost:1337/auth/local';
		this.forgotPaswordURL = 'http://localhost:1337/auth/forgot-password';
		this.resetPasswordURL = 'http://localhost:1337/auth/reset-password';
	}

	register(data) {
		return axios
			.post(this.registerURL, data)
			.then((response) => {
				const { username } = response.data.user;
				const token = response.data.jwt;

				Cookies.set('username', username);
				Cookies.set('jwt', token);

				this.redirectProcess();

				return true;
			})
			.catch((error) => {
				// Handle error.
				return error.response;
			});
	}

	async login(data) {
		return axios
			.post(this.loginURL, data)
			.then((response) => {
				const { username } = response.data.user;
				const token = response.data.jwt;

				Cookies.set('username', username);
				Cookies.set('jwt', token);

				this.redirectProcess();
				return true;
			})
			.catch((error) => {
				// Handle error.
				return error;
			});
	}

	forgotPassword(data) {
		axios
			.post(this.forgetPaswwordURL, data)
			.then((response) => {
				// Handle success.
				Router.push('/forgot-password-confirmation');
			})
			.catch((error) => {
				// Handle error.
				console.log('An error occurred:', error);
			});
	}

	resetPassword(data) {
		axios
			.post(this.resetPasswordURL, data)
			.then((response) => {
				// Handle success.
				Router.push('/reset-password-confirmation');
			})
			.catch((error) => {
				// Handle error.
				console.log('An error occurred:', error);
			});
	}

	setToken(username, token) {
		Cookies.set('username', username);
		Cookies.set('jwt', token);

		if (Cookies.get('username')) {
			Router.push('/');
		}
	}

	unsetToken() {
		Cookies.remove('username');
		Cookies.remove('jwt');
	}

	getUserFromServerCookie(ctx) {
		const { username } = nextCookie(ctx);

		return username;
	}

	getUserFromLocalCookie() {
		return Cookies.get('username');
	}

	getBearer() {
		const jwt = Cookies.get('jwt');

		if (!jwt) return;

		return { Authorization: `Bearer ${jwt}` };
	}

	redirectProcess() {
		// get the root article that made the user log
		const { articleLockedURL } = store.getState();

		// if any, create the return URI based on it
		const returnURI = articleLockedURL || null;

		// clear the store
		store.dispatch(clear());

		// redirect the user accordingly
		if (returnURI) {
			Router.push(returnURI);
		} else {
			Router.push('/');
		}
	}
}

export default Auth;
