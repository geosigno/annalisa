import React from 'react';

const Container = ({ id, children, size }) => (
	<div className={`container ${size || ''}`} id={id || ''}>
		{children}
		<style jsx>{`
			.container {
				max-width: 1200px;
				margin: 0 auto;
			}
			.container.small {
				max-width: 800px;
			}
		`}</style>
	</div>
);

export default Container;
