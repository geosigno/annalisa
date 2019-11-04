import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import Router from 'next/router';

class Auth {
    constructor() {
        this.registerURL = 'http://localhost:1337/auth/local/register';
        this.loginURL = 'http://localhost:1337/auth/local';
        this.forgotPaswordURL = 'http://localhost:1337/auth/forgot-password';
        this.resetPasswordURL = 'http://localhost:1337/auth/reset-password';
    }

    register(data) {
        axios
            .post(this.registerURL, data)
            .then((response) => {
                const username = response.data.user;
                const token = response.data.jwt;

                Cookies.set('username', username);
                Cookies.set('jwt', token);

                // Handle success.
                console.log('Well done!');
                console.log('User profile', response.data.user);
                console.log('User token', response.data.jwt);

                Router.push('/');
            })
            .catch((error) => {
                // Handle error.
                console.log('An error occurred:', error);
                return false;
            });
    }

    login(data) {
        axios
            .post(this.loginURL, data)
            .then((response) => {
                const username = response.data.user;
                const token = response.data.jwt;

                Cookies.set('username', username);
                Cookies.set('jwt', token);

                // Handle success.
                console.log('Well done!');
                console.log('User profile', response.data.user);
                console.log('User token', response.data.jwt);

                Router.push('/');
            })
            .catch((error) => {
                // Handle error.
                console.log('An error occurred:', error);
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

    getCookieFromServer(req) {
        if (!req.headers.cookie || '') {
            return undefined;
        }

        let username = req.headers.cookie.split(';').find((user) => user.trim().startsWith('username='));

        if (username) {
            username = username.split('=')[1];
        }

        let jwt = req.headers.cookie.split(';').find((c) => c.trim().startsWith('jwt='));

        if (jwt) {
            jwt = jwtCookie.split('=')[1];
        }

        return jwtDecode(jwt), username;
    }

    getCookieFromLocal() {
        return Cookies.get('username');
    }

    getBearer() {
        const jwt = Cookies.get('jwt');

        if (!jwt) return;

        return { Authorization: `Bearer ${jwt}` };
    }
}

export default Auth;