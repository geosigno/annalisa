import React, { useEffect } from 'react';
import { withRouter } from 'next/router';

import { authProviderCallback } from '../../helpers/auth';
import store from '../../redux/stores';

import Poster from '../../components/Poster';
import VisualWaiting from '../../assets/waiting.svg';

const Connect = ({ router }) => {
	useEffect(() => {
		let search = router.asPath.replace('/connect/facebook', '');

		if (!search) router.push('/');

		const { contentToGoURL } = store.getState().rootReducer;

		if (contentToGoURL) {
			search += `redirectURI=${contentToGoURL}`;
		}

		authProviderCallback('facebook', search);
	}, []);

	return (
		<Poster title='Veuillez patientez...' loader='true' Visual={VisualWaiting}>
			<p>Vous allez être redirigé dans quelques secondes</p>
		</Poster>
	);
};

export default withRouter(Connect);
