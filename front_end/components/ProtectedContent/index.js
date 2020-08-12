import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

import Poster from '../Poster';
import VisualProtected from '../../assets/protected.svg';

const ProtectedContent = () => {
	return (
		<Poster title="Oups... vous n'avez pas encore accès à ce cours!" Visual={VisualProtected} hasNavigation>
			<div>
				<p>
					Ce cours est protégé, pour le visionner veuillez vous&nbsp;
					<Link href='/connection'>
						<a>connecter</a>
					</Link>
					.
				</p>
				<button
					type='submit'
					onClick={(e) => {
						e.preventDefault();
						Router.back();
					}}>
					Retour
				</button>
				<style jsx>{`
					p {
						line-height: 1.6;
						margin: 0 0 24px;
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
		</Poster>
	);
};

export default ProtectedContent;
