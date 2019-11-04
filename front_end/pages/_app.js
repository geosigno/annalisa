import App from 'next/app';
import React from 'react';
import Normalize from 'react-normalize';
import withData from '../lib/apollo';
import Nav from '../components/nav';

import Fonts from '../helpers/font';
import '../styles/base.scss';

class MyApp extends App {
    componentDidMount() {
        Fonts();
    }

    // static async getInitialProps({ Component, router, ctx }) {
    //     let pageProps = {};
    //     if (Component.getInitialProps) {
    //         pageProps = await Component.getInitialProps(ctx);
    //     }
    //     return { pageProps };
    // }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <div>
                <Normalize />
                <Nav />
                <Component {...pageProps} />
            </div>
        );
    }
}

export default withData(MyApp);
