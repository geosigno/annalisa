// // import App from 'next/app';
import React, { useEffect } from 'react';
import Normalize from 'react-normalize';
// import {withApollo} from 'next-apollo';
import { COLORS } from '../constants';

import Fonts from '../helpers/font';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'semantic-ui-css/semantic.min.css';

// // class MyApp extends App {
// // 	componentDidMount() {
// // 		Fonts();
// // 	}
// // 	// static async getInitialProps({ Component, router, ctx }) {
// // 	//     let pageProps = {};
// // 	//     if (Component.getInitialProps) {
// // 	//       pageProps = await Component.getInitialProps(ctx);
// // 	//     }
// // 	//     return { pageProps };
// // 	//   }

// // 	render() {
// // 		const { Component, pageProps, isAuthenticated } = this.props;
// // 		return (
// // 			<div>
// // 				<Normalize />
// // 				{/* <Layout isAuthenticated={isAuthenticated} {...pageProps}> */}
// // 				<Component isAuthenticated={isAuthenticated} {...pageProps} />
// // 				{/* </Layout> */}
// // 			</div>
// // 		);
// // 	}

// // }

// function MyApp({ Component, pageProps, isAuthenticated } ) {
// 	return (

// 	)
//   }

import { withApollo } from '../apollo/apollo';

const MyApp = ({ Component, pageProps, isAuthenticated }) => {
	useEffect(() => {
		Fonts();
	});
	// const { Component, pageProps, isAuthenticated } = this.props;
	return (
		<div>
			<Normalize />
			{/* <Layout isAuthenticated={isAuthenticated} {...pageProps}> */}
			<Component isAuthenticated={isAuthenticated} {...pageProps} />
			{/* </Layout> */}
			<style global jsx>{`
				html {
					box-sizing: border-box;
				}

				*,
				*:before,
				*:after {
					box-sizing: inherit;
				}

				body {
					color: #222;
					font-family: 'Open Sans';
					background: #fafafa;
				}

				img {
					max-width: 100%;
					height: auto;
				}
				h1,
				h2,
				h3 {
					font-family: 'Raleway';
					letter-spacing: 1px;
					font-weight: 700;
				}

				a {
					font-weight: 500;
					color: ${COLORS.primary};
				}
				a:hover {
					color: ${COLORS.primary};
					text-decoration: underline;
				}

				button {
					border: 0;
				}

				.sr-only {
					border: 0 !important;
					clip: rect(1px, 1px, 1px, 1px) !important;
					-webkit-clip-path: inset(50%) !important;
					clip-path: inset(50%) !important;
					height: 1px !important;
					margin: -1px !important;
					overflow: hidden !important;
					padding: 0 !important;
					position: absolute !important;
					width: 1px !important;
					white-space: nowrap !important;
				}
			`}</style>
		</div>
	);
};

// export default withApollo(MyApp);
export default withApollo({ ssr: false })(MyApp);
// export default MyApp;

// import { ApolloProvider } from '@apollo/react-hooks'
// import { useApollo } from '../apollo/client'

// export default function App({ Component, pageProps }) {
//   const apolloClient = useApollo(pageProps.initialApolloState)

//   return (
//     <ApolloProvider client={apolloClient}>
//       <Component {...pageProps} />
//     </ApolloProvider>
//   )
// }
