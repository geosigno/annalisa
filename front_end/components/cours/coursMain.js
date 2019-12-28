import React from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faGraduationCap, faClock, faTag, faTags } from '@fortawesome/free-solid-svg-icons';
import store from '../../stores';
import { addCoursID } from '../../actions';

import CommentaireList from '../Commentaires/CommentaireList';
import CreateComment from '../Commentaires/CreateComment';

import dateToFormat from '../../helpers/date';

import './coursMain.scss';

const CoursMain = (props) => {
	const {
		cours: { id, nom, created_at, duree, contenu, niveau, categories, commentaires }
	} = props;
	const createMarkup = (htmlString) => ({ __html: htmlString });
	store.dispatch(addCoursID(id));
	return (
		<div>
			<article key={id} className='cours'>
				<header className='cours__header'>
					<h1 className='cours__title'>{nom}</h1>

					<div className='cours__meta'>
						<div className='meta'>
							<FontAwesomeIcon icon={faCalendarAlt} size='1x' color='#999' />
							<p> Posté le {dateToFormat(created_at)}</p>
						</div>

						<div className='meta'>
							<FontAwesomeIcon icon={faGraduationCap} size='1x' color='#999' />
							<Link as={`/niveau/${niveau.id}`} href={`/niveau?id=${niveau.id}`}>
								<a>Niveau {niveau.nom}</a>
							</Link>
						</div>

						<div className='meta'>
							<FontAwesomeIcon icon={faClock} size='1x' color='#999' />
							<p> Durée approximative de {duree} minutes</p>
						</div>

						<div className='meta'>
							{categories.length > 1 ? (
								<FontAwesomeIcon icon={faTags} size='1x' color='#999' />
							) : (
								<FontAwesomeIcon icon={faTag} size='1x' color='#999' />
							)}
							<ul>
								{categories.map((category) => (
									<li key={category.id}>
										<Link as={`/categorie/${category.id}`} href={`/categorie?id=${category.id}`}>
											<a>{category.nom}</a>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
					{/* {srcImage && <img src={`http://localhost:1337${srcImage}`} />} */}
				</header>
				<section className='cours__contenu' dangerouslySetInnerHTML={createMarkup(contenu)} />

				<style global jsx>{`
					.cours {
						display: block;
						max-width: 800px;
						margin: 0 auto;
					}
					.cours__header {
						margin: 0 0 64px;
					}
					.cours__title {
						font-size: 40px;
					}
					.cours__meta {
						display: flex;
						flex-wrap: wrap;
					}
					.meta {
						display: flex;
						align-items: center;
						margin: 0 32px 16px 0;
					}
					.meta p {
						color: #999;
						font-style: italic;
					}
					.meta p,
					.meta a {
						font-style: italic;
						margin: 0 0 0 8px;
					}
					.meta ul {
						display: inline;
						list-style: none;
						padding: 0;
						margin: 0;
					}
					.meta li {
						display: inline;
					}
					.meta li:after {
						content: ', ';
					}
					.meta li:last-child:after {
						content: '';
					}
					.cours__contenu p {
						font-size: 18px;
						line-height: 1.8;
						margin: 0 0 32px;
					}
					h2 {
						font-size: 32px;
						margin: 64px 0 32px;
					}
					h3 {
						font-size: 24px;
						margin: 64px 0 24px;
					}
					p,
					.table,
					img {
						margin: 0 0 56px;
					}
					.table {
						width: 100%;
					}
					.table > * {
						border-collapse: collapse;
						border-spacing: 0;
						width: 100%;
					}
					.table thead {
					}
					.table thead th {
						text-transform: uppercase;
						text-align: left;
						border-bottom: 1px solid #ccc;
						padding: 16px;
					}
					.table tbody tr {
						border-bottom: 1px solid #ccc;
					}
					.table td {
						font-size: 18px;
						padding: 16px;
					}
					.table p {
						margin: 0;
					}
				`}</style>
			</article>
			<CommentaireList data={commentaires} />
			{/* {isAuthenticated &&  */}
			<CreateComment coursID={id} />
			{/* } */}
		</div>
	);
};

export default CoursMain;
