import React from 'react';

const Loader = (props) => {
	const { size } = props;

	let loaderSize = 96;
	let loaderHeight = '100vh';

	if (size === 'small') {
		loaderSize = 64;
		loaderHeight = '128px';
	}

	return (
		<div className="loader-container">
			<div className="spinner">
				<div className="bounce1" />
				<div className="bounce2" />
				<div className="bounce3" />
			</div>
			<style jsx>{`
				.loader-container {
					display: flex;
					justify-content: center;
					align-items: center;
					min-height: ${loaderHeight};
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

export default Loader;
