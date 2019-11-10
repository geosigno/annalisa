import React from 'react';
import defaultPage from '../hoc/defaultPage';

class Layout extends React.Component {
	constructor(props) {
		super(props);
	}

	static async getInitialProps(ctx) {
		let pageProps = {};
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps, isAuthenticated };
	}

	render() {
		const { isAuthenticated, children } = this.props;
		return (
			<div>
				{isAuthenticated ? <h2>I am logged</h2> : <h2>I am not logged</h2>}
				{children}
			</div>
		);
	}
}

export default defaultPage(Layout);
