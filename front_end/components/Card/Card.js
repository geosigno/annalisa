import React from 'react';
import Link from 'next/link';

import store from '../../stores';
import { addCoursTitle } from '../../actions';

// import { dateToFormat } from '../../helpers/date';

const Card = (props) => {
	const {
		data: { nom, image, description, LinkHref, LinkAs }
	} = props;
	return (
		<Link href={LinkHref} as={LinkAs}>
			<a
				className='card'
				onClick={() => {
					store.dispatch(addCoursTitle(nom));
				}}>
				<div className='card__container'>
					{image && <img src={`http://localhost:1337/${image.url}`} alt={nom} />}
					<div className='card__content'>
						<div className='card__text'>
							{nom && <h2 className='card__title'>{nom}</h2>}
							{/* {created_at && <p className='card__meta'>{dateToFormat(created_at)}</p>} */}
							{description && <p className='card__description'>{description}</p>}
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
						overflow: hidden;
						border: 1px solid;
						border-color: transparent;
						border-radius: 8px;
						box-shadow: 0;
						text-decoration: none;
						transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
						will-change: transform;
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
						box-shadow: rgba(0, 0, 0, 0.086) 0px 1px 4px 0px, rgba(0, 0, 0, 0.086) 0px 8px 16px 0px;
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
						color: #222;
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
