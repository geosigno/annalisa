import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { FcClock, FcCalendar, FcGraduationCap } from 'react-icons/fc';
import { Element as ScrollElement } from 'react-scroll';
import CommentaireList from '../Commentaires/CommentaireList';

import { dateToFormat } from '../../helpers/date';
import AddOn from './AddOn';
import CoursProgress from './CoursProgress';
import CompleteVisual from './complete.svg';
import Container from '../Container';

import { COLORS } from '../../constants';

const CoursMain = (props) => {
	// get the previous path to build the breadcrumb
	const {
		cours: { id, name, image, created_at, duration, content, level, categories, sections }
	} = props;
	return (
		<div>
			{sections.length && <CoursProgress sections={sections} coursID={id} />}
			<article key={id} className='cours'>
				<header className='cours__header'>
					<Container size='small'>
						<h1 className='cours__title'>
							<span>{name}</span>
						</h1>
						<div className='cours__meta'>
							<div className='meta'>
								<FcCalendar size='24px' />
								<p> Posté le {dateToFormat(created_at)}</p>
							</div>
							<div className='meta'>
								<FcGraduationCap size='24px' />
								{level && (
									<Link as={`/niveau/${level.slug}`} href={`/niveau?id=${level.slug}`}>
										<a>Niveau {level.name}</a>
									</Link>
								)}
							</div>
							{duration && (
								<div className='meta'>
									<FcClock size='24px' />
									<p>Durée approximative de {duration} minutes</p>
								</div>
							)}
							<div className='meta'>
								<ul>
									{categories &&
										categories.map((category) => (
											<li key={category.slug}>
												<Link as={`/categorie/${category.slug}`} href={`/categorie?id=${category.slug}`}>
													<a>{category.Name}</a>
												</Link>
											</li>
										))}
								</ul>
							</div>
						</div>
					</Container>
					<div className='cours__image'>
						{image[0]?.url &&
							<Image
								src={`http://localhost:1337${image[0].url}`} 
								alt={name}
								width='1920'
								height='1080'
								layout='responsive'
							/>
						}
					</div>
				</header>

				{sections &&
					sections.map((section) => (
						<ScrollElement key={`section-${section.id}`} name={section.type}>
							<AddOn data={section} theme='peachy' />
						</ScrollElement>
					))}
				{/* {Sample && <Extract data={Sample} />}

				{Grammaire && <AddOn data={Grammaire} theme='peachy'/>}

				{Vocabulaire && <AddOn data={Vocabulaire} theme='mint'/>}

				{Conjugaison && <AddOn data={Conjugaison} theme='lilac'/>} */}

				{/* <Container size='small'>
					<CompleteVisual />
				</Container> */}

				{/* <section className='cours__contenu'>
					<ReactMarkdown source={Content} />
				</section> */}

				<style global jsx>{`
					.cours {
						display: block;
						padding: 40px 0;
					}
					.cours__header {
						margin: 0 0 32px;
					}
					.cours__title {
						display: inline-block;
						margin: 0 0 32px;
					}
					.cours__title span {
						font-size: 48px;
						line-height: 1.3;
						background: ${COLORS.secondary};
						box-decoration-break: clone;
						padding: 4px 16px;
					}
					.cours__meta {
						display: flex;
						flex-wrap: wrap;
						margin: 0 0 16px;
					}
					.cours__image {
						max-height: 600px;
						overflow: hidden;
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
