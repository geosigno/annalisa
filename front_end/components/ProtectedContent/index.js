import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import store from '../../stores';
import { addCoursUrl } from '../../actions';

const ProtectedContent = ({ router }) => {
	// Store the current URL to store
	const returnURL = router.asPath;
	store.dispatch(addCoursUrl(returnURL));

	return (
		<div className='protectedContent'>
			<div className='protectedContent__container'>
				<FontAwesomeIcon icon={faExclamationCircle} size='5x' color='#ff9472' />
				<h1>Oups, vous n&apos;avez pas encore accès à ce cours.</h1>
				<p>
					Ce cours est protégé, pour le visionner veuillez vous&nbsp;
					<Link href='/signin'>
						<a>connecter</a>
					</Link>
					.
				</p>
				<button
					type='button'
					onClick={(e) => {
						e.preventDefault();
						Router.back();
					}}>
					Retour
				</button>
			</div>
			<style jsx>{`
				.protectedContent {
					display: flex;
					justify-content: center;
					align-items: center;
					min-height: calc(100vh - 48px);
				}
				.protectedContent__container {
					text-align: center;
					max-width: 600px;
					padding: 64px;
					border: 1px solid #ddd;
					border-radius: 8px;
					background: rgba(0, 0, 0, 0.01);
				}
				h1 {
					margin: 8px 0 24px;
				}
			`}</style>
		</div>
	);
};

export default ProtectedContent;
