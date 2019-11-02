import React from 'react';
import { withRouter } from 'next/router';
import Router from 'next/router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import Auth from './../components/auth';

const auth = new Auth();

import CoursMain from './../components/cours/coursMain';

const Cours = ({ data: { loading, error, cour } }) => {
    if (loading) return 'Loading...';

    if (error) {
        Router.push('/signin');
    }

    if (cour) {
        return <CoursMain cours={cour} />;
    }
};

const GET_COURS_BY_ID = gql`
    query($id: ID!) {
        cour(id: $id) {
            nom
            description
            contenu
            created_at
            image {
                url
            }
        }
    }
`;

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
