import App from 'next/app';
import React from 'react';
import withData from '../lib/apollo';

import Container from '@material-ui/core/Container';

class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return { pageProps };
    }

    render() {
        const { Component, pageProps, isAuthenticated, ctx } = this.props;
        return (
            <Container maxWidth="lg">
                <Component {...pageProps} />
            </Container>
        );
    }
}

export default withData(MyApp);
