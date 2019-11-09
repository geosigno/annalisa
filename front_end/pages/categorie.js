import React from 'react';
import Router, { withRouter } from 'next/router';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import Auth from '../components/auth';
import Loader from '../components/Loader';

import defaultPage from '../hoc/defaultPage';

import { GET_ALL_COURS_BY_CAGTEGORIE_ID } from '../components/categorie/_query';

import CoursThumbnail from '../components/cours/CoursThumbnail';

const auth = new Auth();

const Category = ({ data: { loading, error, categorie } }) => {
    if (loading) {
        return <Loader />;
    }

    if (error) {
        Router.push('/signin');
    }

    if (categorie.cours && categorie.cours.length) {
        const list = categorie.cours.map((item) => <CoursThumbnail key={item.id} cours={item} />);
        return list;
    }

    return false;
};

export default compose(
    withRouter,
    defaultPage,
    graphql(GET_ALL_COURS_BY_CAGTEGORIE_ID, {
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
)(Category);
