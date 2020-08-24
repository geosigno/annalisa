import React from 'react';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import hexToRgba from 'hex-to-rgba';
import Container from '../Container';

const Extract = ({ data: { Extract, Author, Oeuvre }, theme = 'cloudy' }) => {
	let hexaColor;

	switch (theme) {
		case 'cloudy':
			hexaColor = '#b5c9df';
			break;
		case 'mint':
			hexaColor = '#90CBAA';
			break;
		default:
			hexaColor = '#b5c9df';
	}

	const rgbaColor = hexToRgba(hexaColor, 0.1);

	return (
		<section className='extract'>
			<Head>
				<link href='https://fonts.googleapis.com/css2?family=Cantata+One&display=swap' rel='stylesheet' />
			</Head>
			<Container size='small'>
				<h1>
					<span>Extrait</span>
				</h1>
				<blockquote>
					<div className='blockquote__content'>
						<ReactMarkdown source={Extract} />
					</div>
					{(Author || Oeuvre) && (
						<footer>
							<cite>{`${Oeuvre} - ${Author}`}</cite>
						</footer>
					)}
				</blockquote>
			</Container>
			<style jsx>{`
				.extract {
					background: ${rgbaColor};
				}
				h1 {
					display: inline-block;
					margin: 0 0 40px;
				}
				h1 span {
					font-family: 'Cantata One', serif;
					font-size: 40px;
					color: #fff;
					background: ${hexaColor};
					box-decoration-break: clone;
					padding: 4px 16px;
				}
				blockquote {
					margin: 0;
				}
				.blockquote__content {
					position: relative;
				}
				.blockquote__content:before,
				.blockquote__content:after {
					font-family: 'Cantata One', serif;
					font-size: 80px;
					color: ${hexaColor};
					position: absolute;
					display: inline-flex;
				}
				.blockquote__content:before {
					content: '“';
					top: -8px;
					left: -80px;
				}
				.blockquote__content:after {
					content: '„';
					bottom: -8px;
					right: -80px;
				}
				blockquote footer {
					margin-top: 40px;
				}
				blockquote cite {
					font-size: 18px;
					font-family: 'Cantata One', serif;
				}
			`}</style>
			<style global jsx>{`
				blockquote p {
					font-size: 18px;
					line-height: 1.6;
					text-indent: 64px;
				}
				.extract *::selection {
					color: #fff;
					background: ${hexaColor};
				}
			`}</style>
		</section>
	);
};

export default Extract;
