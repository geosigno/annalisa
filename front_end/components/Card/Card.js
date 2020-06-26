import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Link from 'next/link';
import slugify from 'slugify';
import store from '../../redux/stores';
import { addContentToGoTitle, addContentToGoURL } from '../../redux/actions';

import getImage from '../Image';
// import { dateToFormat } from '../../helpers/date';

const PlaceholderImage = () => (
	<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3C/svg%3E" />
);

const Card = (props) => {
	const {
		data: { id, Name, Image, Description },
		type,
		parentName
	} = props;

	const slugName = slugify(Name, { lower: true });
	const linkHref = `/${type}?id=${id}`;
	let linkAs;

	switch (type) {
		case 'cours':
			linkAs = `/cours/${id}`;
			break;
		case 'level':
			linkAs = `/niveau/${id}`;
			break;
		case 'category':
			linkAs = `/categorie/${id}`;
			break;
		default:
			linkAs = `/cours/${id}`;
	}
	return (
		<Link href={linkHref} as={linkAs}>
			<a
				className='card'
				onClick={() => {
					// REDUX - store content URL
					console.log('redux', Name);
					store.dispatch(addContentToGoTitle(Name));
					// REDUX - store content Title
					store.dispatch(addContentToGoURL(linkAs));
				}}>
				<div className='card__container'>
					<div className='card__image'>
						{Image[0] && (
							<LazyLoadImage
								alt={Name}
								src={`http://localhost:1337${getImage(Image, 'medium')}`} // use normal <img> attributes as props
								placeholderSrc={`http://localhost:1337${getImage(Image, 'thumbnail')}`}
								effect='blur'
								placeholder={<PlaceholderImage />}
							/>
						)}
					</div>

					<div className='card__content'>
						<div className='card__text'>
							{Name && <h2 className='card__title'>{Name}</h2>}
							{/* {created_at && <p className='card__meta'>{dateToFormat(created_at)}</p>} */}
							{Description && <p className='card__description'>{Description}</p>}
						</div>
						{/* <div className='card__icon'>
							<FontAwesomeIcon icon={faChevronRight} size='2x' color='#fff' />
						</div> */}
					</div>
				</div>
				<style jsx>{`
					.card {
						display: block;
						position: relative;
						height: 100%;

						overflow: hidden;
						border: 1px solid;
						border-color: #eee;
						border-radius: 8px;
						box-shadow: 0;
						text-decoration: none;
						transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
						will-change: transform;
						box-shadow: rgba(0, 0, 0, 0.086) 0px 1px 2px 0px, rgba(0, 0, 0, 0.086) 0px 0px 8px 0px;
					}
					.card:hover {
						cursor: pointer;
						border-color: #eee;
						box-shadow: rgba(0, 0, 0, 0.086) 0px 1px 4px 0px, rgba(0, 0, 0, 0.086) 0px 8px 16px 0px;
						transform: translateY(-3px);
					}
					.card:hover .card__title {
						background-size: 100% 100%;
					}
					.card:hover .card__icon {
						padding: 48px;
						opacity: 0.7;
					}
					.card:active {
						transform: translateY(3px);
						box-shadow: rgba(0, 0, 0, 0.086) 0px 1px 2px 0px, rgba(0, 0, 0, 0.086) 0px 0px 8px 0px;
					}
					.card__content {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 24px;
					}
					.card__title {
						display: inline-block;
						color: #222;
						margin: 0 0 16px;
						text-decoration: none;
						background-image: linear-gradient(0deg, rgba(195, 240, 220, 1) 100%, rgba(0, 0, 0, 0) 50%);
						background-repeat: no-repeat;
						background-position: left center;
						background-size: 0% 100%;
						transition: background 0.2s;
					}
					.card__description {
						color: #555;
						margin: 0;
					}
					.card__icon {
						padding: 0px;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						right: -24px;
						border-radius: 50%;
						background: rgba(255, 148, 114, 0.7);
						opacity: 0;
						transition: opacity 0.2s, padding 0.2s;
					}
				`}</style>
			</a>
		</Link>
	);
};

export default Card;
