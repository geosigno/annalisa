import React from 'react';

const Container = ({ id, children }) => (
	<div className='container' id={id || ''}>
		{children}
		<style jsx>{`
			.container {
				max-width: 1200px;
				margin: 0 auto;
				 {
					/* padding: 32px 0; */
				}
			}
		`}</style>
	</div>
);

export default Container;
