import React from 'react';
import { withRouter } from 'next/router';
import defaultPage from '../hoc/defaultPage';

import { graphql } from 'react-apollo';

import { compose } from 'recompose';

import Auth from '../helpers/auth';
import Loader from '../components/Loader';

import ProtectedContent from '../components/ProtectedContent';


import { GET_USER_DATA } from '../components/Profile/_query';
import ProfileMain from '../components/Profile/index';

const Profile = ({ router, data: { loading, error, self } }) => {
	if (loading) {
		return <Loader />;
	}
	if (error) {
		if (error.graphQLErrors) {
			for (let i = 0; i < error.graphQLErrors.length; i++) {
				if (error.graphQLErrors[i].message.includes('Forbidden')) {
					return <ProtectedContent router={router} />;
				}
			}
		}
	}

	if (self) {
		return <ProfileMain data={self} />
	}

	return false;
};

// export default compose(
// 	withRouter,
// 	defaultPage,
// 	graphql(GET_USER_DATA, {
// 		options: () => ({
// 			context: {
// 				headers: Auth.getBearer()
// 			}
// 		}),
// 		props: ({ data }) => ({ data })
// 	})
// )(Profile);
