import gql from 'graphql-tag';

export const GET_ALL_NIVEAUX = gql`
    {
        niveaus {
            id
            nom
            description
            image {
                url
            }
        }
    }
`;

export const GET_ALL_COURS_BY_NIVEAU_ID = gql`
    query($id: ID!) {
        niveau(id: $id) {
            cours {
                id
                nom
                description
                image {
                    url
                }
            }
        }
    }
`;

export default GET_ALL_NIVEAUX;
