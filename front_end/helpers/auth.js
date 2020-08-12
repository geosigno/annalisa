import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import store from '../redux/stores';
import { clearContentToGo } from '../redux/actions';

export const setCookieUsername = (username) => username && Cookies.set('username', username);

export const setCookieAvatar = (avatar) => avatar && Cookies.set('userAvatar', avatar);

export const setCookieToken = (token) => token && Cookies.set('jwt', token);

const redirectProcess = () => {
	const { contentToGoURL } = store.getState().rootReducer || Cookies.get('contentToGoURL');

	// if any, create the return URI based on it
	const returnURI = contentToGoURL || null;

	// redirect the user accordingly
	if (returnURI) {
		store.dispatch(clearContentToGo());
		Cookies.remove('contentToGoURL');
		Router.push(returnURI);
	} else {
		Router.push('/');
	}
};

const authCallback = (response) => {
	const {
		user: { username },
		jwt
	} = response.data;
	const userAvatar = response?.data?.user?.avatar[0]?.formats?.thumbnail?.url;
	username && setCookieUsername(username);
	userAvatar && setCookieAvatar(userAvatar);
	jwt && setCookieToken(jwt);

	redirectProcess();
};

export const authProviderCallback = (provider, search) => {
	return axios
		.get(`http://localhost:1337/auth/${provider}/callback${search}`)
		.then((response) => {
			authCallback(response);
			return true;
		})
		.catch((error) => {
			Router.push('/');
			return error;
		});
};

export const register = (data) => {
	return axios
		.post('http://localhost:1337/auth/local/register', data)
		.then((response) => {
			authCallback(response);
			return true;
		})
		.catch((error) => {
			Router.push('/');
			return error.response;
		});
};

export const login = (data) => {
	return axios
		.post('http://localhost:1337/auth/local', data)
		.then((response) => {
			authCallback(response);
			return true;
		})
		.catch((error) => {
			Router.push('/');
			return error.response;
		});
};

export const getUserFromServerCookie = (ctx) => {
	return nextCookie(ctx);
};

export const getUserFromLocalCookie = () => {
	const username = Cookies.get('username') || null;
	const userAvatar = Cookies.get('userAvatar') || null;
	return {
		username,
		userAvatar
	};
};

export const getBearer = () => {
	const jwt = Cookies.get('jwt');
	if (!jwt) return;
	return { Authorization: `Bearer ${jwt}` };
};

export const unsetToken = () => {
	if (!process.browser) return;

	Cookies.remove('jwt');
	Cookies.remove('username');
	Cookies.remove('userAvatar');

	// to support logging out from all windows
	window.localStorage.setItem('logout', Date.now());
	Router.reload();
};

export default login;
