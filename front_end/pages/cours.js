import React from 'react';
import Router, { withRouter } from 'next/router';

import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import Auth from '../components/auth';
import Loader from '../helpers/loader';

import { GET_COURS_BY_ID } from '../components/cours/_query';

import CoursMain from '../components/cours/coursMain';

const auth = new Auth();

const Cours = ({ data: { loading, error, cour } }) => {
    if (loading) {
        return <Loader />;
    }

    if (error) {
        Router.push('/signin');
    }

    if (cour) {
        return <CoursMain cours={cour} />;
    }

    return false;
};

export default compose(
    withRouter,
    graphql(GET_COURS_BY_ID, {
        options: (props) => ({
            variables: {
                id: props.router.query.id
            },
            context: {
                headers: auth.getBearer()
            }
        }),
        props: ({ data }) => ({ data })
    })
)(Cours);
