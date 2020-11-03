import React from 'react';

const Heading = ({ text, size = '1' }) => {
	const Tag = `h${size}`; // make sure this has a default value of "1" or w/e

	return (
		<Tag>
			{text}
			<style jsx>{`
				h1,
				h2,
				h3 {
					color: #222;
					font-family: 'Raleway';
					letter-spacing: 1px;
					font-weight: 700;
				}
				h1 {
					font-size: 30px;
					margin: 8px 0 32px;
				}
				h2 {
					font-size: 24px;
					margin: 8px 0 24px;
				}
				h3 {
					font-size: 20px;
					margin: 8px 0 16px;
				}
			`}</style>
		</Tag>
	);
};

export default Heading;
