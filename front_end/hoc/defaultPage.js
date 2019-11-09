/* hocs/defaultPage.js */

import React from "react";

import Nav from '../components/nav';
import { Container } from '@material-ui/core';


import Auth from "../components/auth";
const auth = new Auth();

export default Page =>

  class DefaultPage extends React.Component {

    static async getInitialProps(ctx) {
     
      const loggedUser = process.browser
        ? auth.getUserFromLocalCookie()
        : auth.getUserFromServerCookie(ctx);

      const pageProps = Page.getInitialProps && Page.getInitialProps(ctx);

      // console.log('ctx', ctx);
      // console.log('req.cookie', req.headers.cookie)
      console.log('browser',process.browser);
      // console.log("is authenticated");
      console.log('loggedUser', loggedUser);

      let path = ""
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
        <Nav />
        <Container>
        <Page {...this.props} />
        </Container>
        </div>
      )
    }
  };