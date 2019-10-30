import React from 'react';
import { withRouter } from 'next/router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import ReactMarkdown from 'react-markdown';

const Cours = ({ data: { loading, error, cour } }) => {
    if (loading) return 'Loading...';

    if (error) return `Error! ${error.message}`;

    if (cour) {
        const title = cour.nom;
        const dateCreated = cour.created_at;
        const srcImage = cour.image ? cour.image.url : null;
        const contenu = cour.contenu;

        return (
            <article>
                <header>
                    {title && <h1>{title}</h1>}

                    {dateCreated && <p>Posted on: {dateCreated}</p>}

                    {srcImage && <img src={`http://localhost:1337${srcImage}`} />}
                </header>

                {contenu && <ReactMarkdown source={contenu} />}
            </article>
        );
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
            }
        }),
        props: ({ data }) => ({ data })
    })
)(Cours);
