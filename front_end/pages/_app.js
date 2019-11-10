import App from 'next/app';
import React from 'react';
import Normalize from 'react-normalize';
import withData from '../lib/apollo';

import Fonts from '../helpers/font';
import '../styles/base.scss';

import Layout from '../components/layout';

class MyApp extends App {
	componentDidMount() {
		Fonts();
	}
	// static async getInitialProps({ Component, router, ctx }) {
	//     let pageProps = {};
	//     if (Component.getInitialProps) {
	//       pageProps = await Component.getInitialProps(ctx);
	//     }
	//     return { pageProps };
	//   }

	render() {
		const { Component, pageProps, isAuthenticated } = this.props;
		return (
			<div>
				<Normalize />
				{/* <Layout isAuthenticated={isAuthenticated} {...pageProps}> */}
				<Component {...pageProps} />
				{/* </Layout> */}
			</div>
		);
	}
}

export default withData(MyApp);
