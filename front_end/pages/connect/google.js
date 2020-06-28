import React, { useEffect } from 'react';
import { withRouter } from 'next/router';

import Auth from '../../helpers/auth';
import store from '../../redux/stores';

import Poster from '../../components/Poster';
import VisualWaiting from '../../assets/waiting.svg';

const Connect = ({ router }) => {
	useEffect(() => {
		const search = router.asPath.replace('/connect/google', '');

		if (!search) router.push('/');

		const { contentToGoURL } = store.getState().rootReducer;

		if (contentToGoURL) {
			search += `redirectURI=${contentToGoURL}`;
		}

		Auth.providerCallback('google', search);
	}, []);

	return (
		<Poster title='Veuillez patientez...' loader='true' Visual={VisualWaiting}>
			<p>Vous allez être redirigé dans quelques secondes</p>
		</Poster>
	);
};

export default withRouter(Connect);
