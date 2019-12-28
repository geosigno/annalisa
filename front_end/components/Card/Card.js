import React from 'react';
import Link from 'next/link';

import store from '../../stores';
import { addCoursTitle } from '../../actions';

// import dateToFormat from '../../helpers/date';

const Card = (props) => {
	const { id, nom, image, description, created_at, LinkHref, LinkAs } = props.data;
	return (
		<Link href={LinkHref} as={LinkAs}>
			<a
				onClick={() => {
					store.dispatch(addCoursTitle(nom));
				}}>
				<div className='card'>
					<div className='card__container'>
						{image && <img src={`http://localhost:1337/${image.url}`} alt={nom} />}
						<div className='card__content'>
							{nom && <h2 className='card__title'>{nom}</h2>}
							{/* {created_at && <p className='card__meta'>{dateToFormat(created_at)}</p>} */}
							{description && <p className='card__description'>{description}</p>}
						</div>
					</div>
					<style jsx>{`
						.card {
							overflow: hidden;
							border: 1px solid #eee;
							border-radius: 8px;
							box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
							transition: transform 0.2s, box-shadow 0.2s;
							will-change: transform;
						}
						.card:hover {
							cursor: pointer;
							box-shadow: 0px 5px 4px 1px rgba(0, 0, 0, 0.1);
							transform: translateY(-3px);
						}
						.card:active {
							transform: translateY(3px);
							box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
						}
						.card__container {
						}
						.card__content {
							padding: 16px;
						}
						.card__title {
							color: #222;
							margin: 0 0 16px;
						}
						.card__description {
							color: #222;
							margin: 0;
						}
					`}</style>
				</div>
			</a>
		</Link>
	);
};

export default Card;
