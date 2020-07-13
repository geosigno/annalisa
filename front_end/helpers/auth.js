import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import store from '../redux/stores';
import { clearContentToGo } from '../redux/actions';
// import { modal } from '../components/form/signin-form';

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
				const userAvatar = response.data.user.avatar[0].formats.thumbnail.url || null;
				const token = response.data.jwt;

				Cookies.set('username', username);
				Cookies.set('userAvatar', userAvatar);
				Cookies.set('jwt', token);

				Auth.redirectProcess();

				return true;
			})
			.catch((error) => {
				Router.push('/');
				return error.response;
			});
	}

	static async login(data) {
		return axios
			.post('http://localhost:1337/auth/local', data)
			.then((response) => {
				console.log(response.data.user.avatar[0].formats.thumbnail.url);
				const { username } = response.data.user;
				const userAvatar = response.data.user.avatar[0].formats.thumbnail.url || null;
				const token = response.data.jwt;

				Cookies.set('username', username);
				Cookies.set('userAvatar', userAvatar);
				Cookies.set('jwt', token);

				Auth.redirectProcess();
				return true;
			})
			.catch((error) => {
				Router.push('/');
				return error;
			});
	}

	static providerCallback(provider, search) {
		return axios
			.get(`http://localhost:1337/auth/${provider}/callback${search}`)
			.then((response) => {
				const { username } = response.data.user;
				const token = response.data.jwt;

				Cookies.set('username', username);
				Cookies.set('jwt', token);

				Auth.redirectProcess();

				return true;
			})
			.catch((error) => {
				Router.push('/');
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
		return nextCookie(ctx);
	}

	static getUserFromLocalCookie() {
		const username = Cookies.get('username') || null;
		const userAvatar = Cookies.get('userAvatar') || null;
		return {
			username,
			userAvatar
		};
	}

	static getBearer() {
		const jwt = Cookies.get('jwt');

		if (!jwt) return;

		return { Authorization: `Bearer ${jwt}` };
	}

	static redirectProcess() {
		// get the root article that made the user log
		let { contentToGoURL } = store.getState().rootReducer;
		contentToGoURL === '' && (contentToGoURL = Cookies.get('contentToGoURL'));

		// if any, create the return URI based on it
		const returnURI = contentToGoURL || null;

		// clear the store
		store.dispatch(clearContentToGo());

		// redirect the user accordingly
		if (returnURI) {
			Cookies.remove('contentToGoURL');
			Router.push(returnURI);
		} else {
			Router.push('/');
		}
	}
}

export default Auth;
