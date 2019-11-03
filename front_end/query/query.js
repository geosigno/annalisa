export const GET_ALL_NIVEAUX = gql`
    query {
        niveaux() {
            id
            nom
            description
        }
    }
`;