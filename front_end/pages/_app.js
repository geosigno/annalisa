// // import App from 'next/app';
import React, { useEffect } from 'react';
import Normalize from 'react-normalize';
// import {withApollo} from 'next-apollo';

import Fonts from '../helpers/font';
import 'react-lazy-load-image-component/src/effects/blur.css';

import '../styles/base.scss';

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
