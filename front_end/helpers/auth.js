import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import store from '../redux/stores';
import { clearContentToGo } from '../redux/actions';

class Auth {
	constructor() {
		this.registerURL = 'http://localhost:1337/auth/local/register';
		this.loginURL = 'http://localhost:1337/auth/local';
		this.forgotPaswordURL = 'http://localhost:1337/auth/forgot-password';
		this.resetPasswordURL = 'http://localhost:1337/auth/reset-password';
	}

	static register(data) {
		return axios
			.post('http://localhost:1337/auth/local/register', data)
			.then((response) => {
				const { username } = response.data.user;
				const token = response.data.jwt;

				Cookies.set('username', username);
				Cookies.set('jwt', token);

				Auth.redirectProcess();

				return true;
			})
			.catch((error) => {
				// Handle error.
				return error.response;
			});
	}

	static async login(data) {
		return axios
			.post('http://localhost:1337/auth/local', data)
			.then((response) => {
				const { username } = response.data.user;
				const token = response.data.jwt;

				Cookies.set('username', username);
				Cookies.set('jwt', token);

				Auth.redirectProcess();
				return true;
			})
			.catch((error) => {
				// Handle error.
				return error;
			});
	}

	static forgotPassword(data) {
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

	static resetPassword(data) {
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

	static setToken(username, token) {
		Cookies.set('username', username);
		Cookies.set('jwt', token);

		if (Cookies.get('username')) {
			Router.push('/');
		}
	}

	static unsetToken() {
		Cookies.remove('username');
		Cookies.remove('jwt');
	}

	static getUserFromServerCookie(ctx) {
		const { username } = nextCookie(ctx);

		return username;
	}

	static getUserFromLocalCookie() {
		return Cookies.get('username');
	}

	static getBearer() {
		const jwt = Cookies.get('jwt');

		if (!jwt) return;

		return { Authorization: `Bearer ${jwt}` };
	}

	static redirectProcess() {
		// get the root article that made the user log
		const { contentToGoURL } = store.getState().rootReducer;

		// if any, create the return URI based on it
		const returnURI = contentToGoURL || null;

		// clear the store
		store.dispatch(clearContentToGo());

		// redirect the user accordingly
		if (returnURI) {
			Router.push(returnURI);
		} else {
			Router.push('/');
		}
	}
}

export default Auth;
