import React from 'react';
import Link from 'next/link';
import Visual from '../../assets/register.svg';

const FullPageForm = ({ children }) => {
	return (
		<div className='fullPage'>
			<div className='fullPage__left'>
				<Visual />
			</div>
			<div className='fullPage__right'>
				<div className='form__wrapper'>
					{children}
					<Link href='/'>
						<a className='form__back'>Retourner à la page d&apos;accueil</a>
					</Link>
				</div>
			</div>
			<style global jsx>{`
				.fullPage {
					display: flex;
					align-items: center;
					min-height: 100vh;
					background: linear-gradient(45deg, #83a4d4, #b6fbff);
					background-size: 150% 150%;
				}
				.fullPage__left,
				.fullPage__right {
					flex: 50% 0 0;
				}
				.fullPage__left > * {
					max-height: 70vh;
				}
				.fullPage__container {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					min-height: 100vh;
				}
				.form__wrapper {
					max-width: 480px;
				}
			`}</style>
		</div>
	);
};

export default FullPageForm;
