import React from 'react';

import Nav from '../components/Nav';
// import Container from '../components/Container';

import { getUserFromLocalCookie, getUserFromServerCookie } from '../helpers/auth';

const defaultPage =(Page) =>
	class DefaultPage extends React.Component {
		static async getInitialProps(ctx) {
			const { username, userAvatar } = process.browser ? getUserFromLocalCookie() : getUserFromServerCookie(ctx);
			const pageProps = Page.getInitialProps && Page.getInitialProps(ctx);
			const path = '';
			return {
				...pageProps,
				username,
				userAvatar,
				currentUrl: path,
				isAuthenticated: !!username
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
					<style global jsx>{`
						body {
							padding-top: 64px;
						}
					`}</style>
				</div>
			);
		}
	};

	export default defaultPage;