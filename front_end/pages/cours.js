import React from 'react';
import Router, { withRouter } from 'next/router';

import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import defaultPage from '../hoc/defaultPage';
import Auth from '../components/auth';
import Loader from '../components/Loader';
import ProtectedContent from '../components/ProtectedContent';

import { GET_COURS_BY_ID } from '../components/cours/_query';

import CoursMain from '../components/cours/coursMain';

const auth = new Auth();

const Cours = ({ data: { loading, error, cour } }) => {
    if (loading) {
        return <Loader />;
    }

    if (error) {
        if (error.graphQLErrors) {
            for (let i = 0; i < error.graphQLErrors.length; i++) {
                if (error.graphQLErrors[i].message.includes('Forbidden')) {
                    return <ProtectedContent />;
                }
            }
        }
        // Router.push('/signin');
    }

    if (cour) {
        return <CoursMain cours={cour} />;
    }

    return false;
};

export default compose(
    withRouter,
    defaultPage,
    graphql(GET_COURS_BY_ID, {
        options: (props) => ({
            variables: {
                id: props.router.query.id || 1
            },
            context: {
                headers: auth.getBearer()
            }
        }),
        props: ({ data }) => ({ data })
    })
)(Cours);
