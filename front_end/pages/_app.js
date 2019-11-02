import App from 'next/app';
import React from 'react';
import Container from '@material-ui/core/Container';
import withData from '../lib/apollo';
import Nav from '../components/nav';
import Normalize from 'react-normalize';
import Fonts from '../helpers/font';
import '../styles/base.scss';

class MyApp extends App {
    componentDidMount() {
        Fonts();
    }
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
            // <Container maxWidth="lg">
            // <Nav />
            <div>
                <Normalize />
                <Component {...pageProps} />
            </div>

            // </Container>
        );
    }
}

export default withData(MyApp);
