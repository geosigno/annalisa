import React from 'react';
import ContentLoader from 'react-content-loader';

export const LoaderBounce = (props) => {
	const { size } = props;

	let loaderSize = 96;

	if (size === 'small') {
		loaderSize = 64;
	}

	return (
		<div className='loader-container'>
			<div className='spinner'>
				<div className='bounce1' />
				<div className='bounce2' />
				<div className='bounce3' />
			</div>
			<style jsx>{`
				.loader-container {
					display: inline-flex;
					justify-content: center;
					align-items: center;
				}

				.spinner {
					width: ${loaderSize * 1.5}px;
					text-align: center;
				}

				.spinner > div {
					width: ${loaderSize / 3}px;
					height: ${loaderSize / 3}px;
					background-color: #ff9472;
					margin: 0 4px;

					border-radius: 100%;
					display: inline-block;
					-webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
					animation: sk-bouncedelay 1.4s infinite ease-in-out both;
				}

				.spinner .bounce1 {
					-webkit-animation-delay: -0.32s;
					animation-delay: -0.32s;
				}

				.spinner .bounce2 {
					-webkit-animation-delay: -0.16s;
					animation-delay: -0.16s;
				}

				@-webkit-keyframes sk-bouncedelay {
					0%,
					80%,
					100% {
						-webkit-transform: scale(0);
					}
					40% {
						-webkit-transform: scale(1);
					}
				}

				@keyframes sk-bouncedelay {
					0%,
					80%,
					100% {
						-webkit-transform: scale(0);
						transform: scale(0);
					}
					40% {
						-webkit-transform: scale(1);
						transform: scale(1);
					}
				}
			`}</style>
		</div>
	);
};

export const LoaderArticle = (props) => (
	<ContentLoader
		speed={3}
		width={800}
		height={931}
		viewBox='0 0 800 931'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}>
		<rect x='32' y='252' width='738' height='492' rx='8' ry='8' />
		<rect x='32' y='191' width='738' height='8' rx='2' ry='2' />
		<rect x='32' y='822' width='738' height='8' rx='2' ry='2' />
		<rect x='32' y='790' width='738' height='8' rx='2' ry='2' />
		<rect x='32' y='223' width='522' height='8' rx='2' ry='2' />
		<rect x='32' y='854' width='522' height='8' rx='2' ry='2' />
		<rect x='32' y='64' width='407' height='16' rx='2' ry='2' />
		<rect x='32' y='119' width='260' height='16' rx='2' ry='2' />
	</ContentLoader>
);

export default LoaderBounce;
