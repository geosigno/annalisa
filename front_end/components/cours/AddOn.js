import React from 'react';
import ReactMarkdown from 'react-markdown';
import Container from '../Container';
import hexToRgba from 'hex-to-rgba';


const AddOn = ({ data: { Title, Content}, theme }) => {
	let hexaColor;
	switch(theme) {
		case 'cloudy':
			hexaColor = '#b5c9df';
			break;
		case 'mint':
			hexaColor = '#90CBAA';
			break;
		case 'peachy':
			hexaColor = '#F4A384';
			break;
		case 'cherry':
			hexaColor = '#fe7d8f';
			break;
		case 'lilac':
			hexaColor = '#D5B6D4';
			break;
		default:
			hexaColor = '#b5c9df';
	}

	const rgbaColor = hexToRgba(hexaColor, .1);

    return (
		<section className={'addOn ' + Title}>
			<Container size='small'>
				<h1>
					<span>{Title}</span>
				</h1>
				<div className='addOn__content'>
					<ReactMarkdown source={Content} />
				</div>
			</Container>
			<style jsx>{`
				.addOn {
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
			`}</style>
			<style global jsx>{`
				.addOn__content p {
					font-size: 18px;
					line-height: 1.6;
					text-indent: 64px;
				}
				.${Title} *::selection {
					color: #fff;
					background: ${hexaColor};
				}
			`}</style>
		</section>
	);
}

export default AddOn;