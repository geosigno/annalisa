import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Router from 'next/router';
import Auth from '../auth';
import CoursThumbnail from './coursThumbnail';

const auth = new Auth();

const CoursList = ({ data: { loading, error, cours } }) => {
    if (loading) return 'Loading...';

    if (error) {
        Router.push('/signin');
    }

    if (cours && cours.length) {
        const list = cours.map((item) => <CoursThumbnail cours={item} />);
        return list;
    }
};

const query = gql`
    {
        cours {
            id
            nom
            description
            created_at
            image {
                url
            }
        }
    }
`;

export default graphql(query, {
    options: {
        context: {
            headers: auth.getBearer()
        }
    },
    props: ({ data }) => ({ data })
})(CoursList);
