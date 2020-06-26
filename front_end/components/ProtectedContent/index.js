import React from 'react';
import Link from 'next/link';

import Visual from './visual.svg';

const ProtectedContent = ({ router }) => {
	return (
		<div className='protectedContent'>
			<div className='protectedContent__container'>
				<div className='protectedContent__visual'>
					<Visual />
				</div>
				<h1>Oups... vous n&apos;avez pas encore accès à ce cours!</h1>
				<p>
					Ce cours est protégé, pour le visionner veuillez vous&nbsp;
					<Link href='/signin'>
						<a>connecter</a>
					</Link>
					.
				</p>
				<button
					type='submit'
					onClick={(e) => {
						e.preventDefault();
						router.back();
					}}>
					Retour
				</button>
			</div>
			<style jsx>{`
				.protectedContent {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100vh;
				}
				.protectedContent__container {
					text-align: center;
					max-width: 600px;
					padding: 64px;
				}
				svg {
					max-height: 50vh;
				}
				h1 {
					margin: 8px 0 24px;
				}
				button {
					font-weight: 600;
					background: transparent;
					border: 2px solid #222;
					border-radius: 16px;
					padding: 4px 16px;
				}
				button:hover {
					cursor: pointer;
				}
			`}</style>
		</div>
	);
};

export default ProtectedContent;
