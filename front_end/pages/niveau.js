import React from 'react';
import Router, { withRouter } from 'next/router';

import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import Auth from '../components/auth';
import Loader from '../components/Loader';
import defaultPage from '../hoc/defaultPage';

import CoursThumbnail from '../components/cours/CoursThumbnail';

import { GET_ALL_COURS_BY_NIVEAU_ID } from '../components/niveau/_query';

const auth = new Auth();

const Niveau = ({ data: { loading, error, niveau } }) => {
    if (loading) {
        return <Loader />;
    }

    if (error) {
        Router.push('/signin');
    }

    if (niveau.cours && niveau.cours.length) {
        const list = niveau.cours.map((item) => <CoursThumbnail key={item.id} cours={item} />);
        return list;
    }

    return false;
};

export default compose(
    withRouter,
    defaultPage,
    graphql(GET_ALL_COURS_BY_NIVEAU_ID, {
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
)(Niveau);
