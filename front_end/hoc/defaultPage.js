import React from 'react';

import Nav from '../components/Nav/';
import Container from '../components/Container';

import Auth from '../helpers/auth';

export default (Page) =>
	class DefaultPage extends React.Component {
		static async getInitialProps(ctx) {
			const loggedUser = process.browser ? Auth.getUserFromLocalCookie() : Auth.getUserFromServerCookie(ctx);

			const pageProps = Page.getInitialProps && Page.getInitialProps(ctx);

			let path = '';
			return {
				...pageProps,
				loggedUser,
				currentUrl: path,
				isAuthenticated: !!loggedUser
			};
		}

		// logout = eve => {
		//   if (eve.key === "logout") {
		//     Router.push(`/?logout=${eve.newValue}`);
		//   }
		// };

		// componentDidMount() {
		//   window.addEventListener("storage", this.logout, false);
		// }

		// componentWillUnmount() {
		//   window.removeEventListener("storage", this.logout, false);
		// }

		render() {
			return (
				<div>
					<Nav {...this.props} />
					{/* <Container id='main'> */}
						<Page {...this.props} />
					{/* </Container> */}
				</div>
			);
		}
	};
