import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import store from '../stores';

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
				const username = response.data.user.username;
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
				const username = response.data.user.username;
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

	getUserFromServerCookie = (ctx) => {
		// if (!req.headers.cookie || "") {
		//   return undefined;
		// }

		// let username = req.headers.cookie
		//   .split(";")
		//   .find(user => user.trim().startsWith("username="));
		// if (username) {
		//   username = username.split("=")[1];
		// }

		// const jwtCookie = req.headers.cookie
		//   .split(";")
		//   .find(c => c.trim().startsWith("jwt="));
		// if (!jwtCookie) {
		//   return undefined;
		// }

		console.log('server ', ctx.req.headers.cookie);

		const { jwt, username } = nextCookie(ctx);

		// const jwt = jwtCookie.split("=")[1];
		return username;
	};

	getUserFromLocalCookie = () => {
		console.log('browser: ', Cookies.get('username'));
		return Cookies.get('username');
	};

	// getCookieFromServer(req) {
	//     if (!req.headers.cookie || '') {
	//         return undefined;
	//     }

	//     let username = req.headers.cookie.split(';').find((user) => user.trim().startsWith('username='));

	//     if (username) {
	//         username = username.split('=')[1];
	//     }

	//     let jwt = req.headers.cookie.split(';').find((c) => c.trim().startsWith('jwt='));

	//     if (jwt) {
	//         jwt = jwtCookie.split('=')[1];
	//     }

	//     return jwtDecode(jwt), username;
	// }

	// getCookieFromLocal() {
	//     return Cookies.get('username');
	// }

	getBearer() {
		const jwt = Cookies.get('jwt');

		if (!jwt) return;

		return { Authorization: `Bearer ${jwt}` };
	}

	redirectProcess() {
		//get the root article that made the user log
		const articleLockedURL = store.getState().articleLockedURL;

		//if any, create the return URI based on it
		const returnURI = articleLockedURL ? articleLockedURL : null;

		//redirect the user accordingly
		if (returnURI) {
			Router.push(returnURI);
		} else {
			Router.push('/');
		}
	}
}

export default Auth;
