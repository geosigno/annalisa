import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../apollo/apollo';
import securePage from '../hoc/securePage';
import Container from '../components/Container';

import { GET_USER_DATA } from '../apollo/query/profile';

import UserProfile from '../components/Profile/UserProfile';
import UserHistory from '../components/Profile/UserHistory';

const Profile = () => {
	const { loading, error, data } = useQuery(GET_USER_DATA);

	if (loading) {
		return <p>Loading</p>;
	}
	if (data && data.self) {
		return (
			<Container>
				<div className='profile'>
					<div className='profile__column profile__left'>
						<UserProfile data={data.self} />
					</div>
					<div className='profile__column profile__right'>
						<UserHistory data={data.self} />
					</div>
				</div>
				<style jsx>{`
					.profile {
						display: flex;
						align-items: center;
						margin: 80px 0;
					}
					.profile__column {
						box-shadow: rgba(0, 0, 0, 0.086) 0px 1px 2px 0px, rgba(0, 0, 0, 0.086) 0px 0px 8px 0px;
						border: 1px solid;
						border-color: #eee;
						border-radius: 8px;
						padding: 32px;
					}
					.profile__left {
						flex-basis: 40%;
						margin-right: 5%;
					}
					.profile__right {
						flex-basis: 55%;
					}
				`}</style>
			</Container>
		);
	}

	return <h1>Profile</h1>;
};

export default compose(withApollo({ ssr: false }), withRouter, securePage)(Profile);
