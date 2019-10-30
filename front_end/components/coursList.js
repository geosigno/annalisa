import gql from 'graphql-tag';
import Link from 'next/link';
import { graphql } from 'react-apollo';

const CoursList = ({ data: { loading, error, cours } }) => {
    if (loading) return 'Loading...';

    if (error) return `Error! ${error.message}`;

    if (cours && cours.length) {
        const list = cours.map((res) => {
            return (
                <li key={res.id}>
                    <p>id: {res.id}</p>
                    {/* <p>image: {res.image.url}</p> */}
                    <Link href={`/cours?id=${res.id}`} as={`/cours/${res.id}`}>
                        <a>{res.nom}</a>
                    </Link>
                    <p>description: {res.description}</p>
                    <p>content: {res.contenu}</p>
                </li>
            );
        });

        return <ul>{list}</ul>;
    }
};

const query = gql`
    {
        cours {
            id
            nom
            description
            contenu
            image {
                url
            }
        }
    }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (CoursList)
export default graphql(query, {
    props: ({ data }) => ({ data })
})(CoursList);
