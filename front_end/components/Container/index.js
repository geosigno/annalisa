import React from 'react';

const Container = (props) => (
	<div className='container' id={props.id ? props.id : ''}>
		{props.children}
		<style jsx>{`
			.container {
				max-width: 1200px;
				margin: 0 auto;
				padding: 32px 0;
			}
		`}</style>
	</div>
);

export default Container;
