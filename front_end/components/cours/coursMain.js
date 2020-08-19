import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt, faGraduationCap, faClock, faTag, faTags } from '@fortawesome/free-solid-svg-icons';
import CommentaireList from '../Commentaires/CommentaireList';
import { dateToFormat } from '../../helpers/date';
import Extract from './Extract';
import AddOn from './AddOn';
import CompleteVisual from './complete.svg';
import Container from '../Container';


const CoursMain = (props) => {
	const {
		cours: { id, Name, Image, created_at, Duration, Content, level, categories, Sample, Grammaire, Vocabulaire, Conjugaison }
	} = props;

	return (
		<div>
			<article key={id} className='cours'>
				<header className='cours__header'>
					<h1 className='cours__title'>
						<span>{Name}</span>
					</h1>

					<div className='cours__meta'>
						<div className='meta'>
							{/* <FontAwesomeIcon icon={faCalendarAlt} size='1x' color='#999' /> */}
							<p> Posté le {dateToFormat(created_at)}</p>
						</div>

						<div className='meta'>
							{/* <FontAwesomeIcon icon={faGraduationCap} size='1x' color='#999' /> */}
							<Link as={`/niveau/${level.slug}`} href={`/niveau?id=${level.slug}`}>
								<a>Niveau {level.Name}</a>
							</Link>
						</div>

						{Duration && (
							<div className='meta'>
								{/* <FontAwesomeIcon icon={faClock} size='1x' color='#999' /> */}
								<p>Durée approximative de {Duration} minutes</p>
							</div>
						)}

						<div className='meta'>
							{/* {categories.length > 1 ? (
								<FontAwesomeIcon icon={faTags} size='1x' color='#999' />
							) : (
								<FontAwesomeIcon icon={faTag} size='1x' color='#999' />
							)} */}
							<ul>
								{categories.map((category) => (
									<li key={category.slug}>
										<Link as={`/categorie/${category.slug}`} href={`/categorie?id=${category.slug}`}>
											<a>{category.Name}</a>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className='cours__image'>
						{Image[0].url && <img src={`http://localhost:1337${Image[0].url}`} alt={Name} />}
					</div>
				</header>

				{Sample && <Extract data={Sample} />}

				{Grammaire && <AddOn data={Grammaire} theme='peachy'/>}

				{Vocabulaire && <AddOn data={Vocabulaire} theme='mint'/>}

				{Conjugaison && <AddOn data={Conjugaison} theme='lilac'/>}

<Container size='small'>
<CompleteVisual />
</Container>
		

				{/* <section className='cours__contenu'>
					<ReactMarkdown source={Content} />
				</section> */}

				<style global jsx>{`
					.cours {
						display: block;
						background: #fff;
						border-radius: 8px;
					}
					.cours__header {
						margin: 0 0 32px;
					}
					.cours__title {
						display: inline-block;
						margin: -32px 0 32px -48px;
						width: 80%;
					}
					.cours__title span {
						font-size: 48px;
						line-height: 1.3;
						background: #c3f0dc;
						box-decoration-break: clone;
						padding: 4px 16px;
					}
					.cours__meta {
						display: flex;
						flex-wrap: wrap;
					}
					.cours__image {
						max-height: 600px;
						overflow: hidden;
					}
					.cours__image img {
						height: 100%;
						width: 100%;
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
					.cours__contenu h2 {
						font-size: 32px;
						margin: 48px 0;
					}
					.cours__contenu h3 {
						font-size: 24px;
						margin: 48px 0;
					}
					.cours__contenu p,
					.cours__contenu .table,
					.cours__contenu img {
						margin: 0 0 56px;
					}
					.cours__contenu strong {
						background-color: #ffff00;
						padding: 2px 4px;
					}
					.cours__contenu .table {
						width: 100%;
					}
					.cours__contenu .table > * {
						border-collapse: collapse;
						border-spacing: 0;
						width: 100%;
					}
					.cours__contenu .table thead th {
						text-transform: uppercase;
						text-align: left;
						border-bottom: 1px solid #ccc;
						padding: 16px;
					}
					.cours__contenu .table tbody tr {
						border-bottom: 1px solid #ccc;
					}
					.cours__contenu .table tbody tr:last-child {
						border: 0;
					}
					.cours__contenu .table td {
						font-size: 18px;
						padding: 16px;
					}
					.cours__contenu .table p {
						margin: 0;
					}
					.quizz__container {
						position: relative;
						overflow: hidden;
						padding-top: 56.25%;
					}
					.quizz__container iframe {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						border: 0;
					}
				`}</style>
			</article>
			<CommentaireList />
		</div>
	);
};

export default CoursMain;
