import React from 'react';
import { LoaderBounce } from '../Loader';

const Poster = (props) => {
	const { title, loader, Visual, children } = props;
	return (
		<div className='poster'>
			<div className='poster__container'>
				{Visual && (
					<div className='poster__left'>
						<div className='poster__visual'>
							<Visual />
						</div>
					</div>
				)}
				<div className='poster__right'>
					<div className='poster__content'>
						{loader && (
							<div className='poster__loader'>
								<LoaderBounce size='small' />
							</div>
						)}
						{title && <h1>{title}</h1>}
						{children}
					</div>
				</div>
			</div>

			<style jsx>{`
				.poster__container {
					display: flex;
					align-items: center;
					width: 100vw;
					height: 100vh;
					max-height: 100vh;
					overflow: hidden;
					background-color: #f5f5f5;
				}
				.poster__left {
					flex: 60% 0 0;
				}
				.poster__right {
					flex: 40% 0 0;
				}
				.poster__visual,
				.poster__content {
					padding: 64px;
				}
				.poster__loader {
					margin: 0 0 24px;
				}
				.poster__content {
					display: inline-block;
					max-width: 560px;
					border-radius: 16px;
					background-color: rgba(255, 255, 255, 0.8);
					transform: translateX(-160px);
				}
				.poster__content p {
					margin: 0;
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

export default Poster;
