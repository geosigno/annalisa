import React from 'react';
import Link from 'next/link';
import Image from 'next/image'

// import slugify from 'slugify';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import store from '../../redux/stores';
import { addContentToGoTitle, addContentToGoURL } from '../../redux/actions';

// import getImage from '../../helpers/image';
// import { dateToFormat } from '../../helpers/date';

import AllCoursVisual from '../../assets/allcours.svg';
import AllCategoriesVisual from '../../assets/allcategories.svg';

// const PlaceholderImage = () => (
// 	<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3C/svg%3E" />
// );

const Card = (props) => {
	const {
		data: { id, slug, name, image, description, linkHref, linkAs, loadMore },
		type
	} = props;

	const visual = type === 'cours' ? <AllCoursVisual /> : <AllCategoriesVisual />;

	return (
		<Link href={linkHref} as={linkAs}>
			<a
				className={`card${loadMore ? ' loadMore' : ''}`}
				onClick={() => {
					if (loadMore) return;
					// REDUX - store content URL
					store.dispatch(addContentToGoTitle(name));
					// REDUX - store content Title
					store.dispatch(addContentToGoURL(linkAs));
				}}>
				<div className='card__container'>
					{image && image[0] && (
						<div className='card__image'>
							<Image
								src={`http://localhost:1337${image[0].url}`} 
								alt={name}
								width={355}
								height={236}
							/>
						</div>
					)}
					{loadMore && visual && <div className='card__image'>{visual}</div>}

					<div className='card__content'>
						<div className='card__text'>
							{/* {loadMore && <FontAwesomeIcon icon={faArrowRight} size='2x' color='#555' />} */}
							{name && <h2 className='card__title'>{name}</h2>}
							{/* {created_at && <p className='card__meta'>{dateToFormat(created_at)}</p>} */}
							{description && <p className='card__description'>{description}</p>}
						</div>
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
					.card__container {
						display: flex;
						flex-direction: column;
						height: 100%;
					}
					.card__content {
						display: flex;
						align-items: center;
						justify-content: space-between;

						padding: 24px;
					}
					.loadMore .card__image {
						padding: 32px 48px 0;
					}
					.loadMore .card__content {
						flex-grow: 1;
					}
					.loadMore .card__text {
						display: flex;
						align-items: center;
					}
					.loadMore .card__title {
						margin: 0 0 0 16px;
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
				`}</style>
			</a>
		</Link>
	);
};

export default Card;
