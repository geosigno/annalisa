import React, { useState } from 'react';
import { withRouter } from 'next/router';
import { compose } from 'recompose';
import { useQuery } from '@apollo/react-hooks';

import { withApollo } from '../../apollo/apollo';
import Loader from '../Loader';
import CommentaireItem from './CommentaireItem';
import CreateComment from './CreateComment';

import { GET_COMMENTS_BY_COURS_ID } from './_query';

const processComments = (comments) => {
	// get all parent comments - with no parentID set
	const parentComments = comments.filter((comment) => !comment.parentID);

	// get all child comments -  with parentID set
	const childComments = comments.filter((comment) => comment.parentID);

	// go through all child & parent comments and push the child into their respective parent
	childComments &&
		childComments.forEach((child) => {
			parentComments.forEach((parent) => {
				if (child.parentID === parent.id) {
					if (!parent.replies) parent.replies = [];
					parent.replies.push(child);
					// TO INVESTIGATE - ugly way to remove some unknow dupplicata issue with childs
					parent.replies = [...new Set(parent.replies)];
				}
			});
		});

	return parentComments;
};

// const CommentaireList = ({ data: { loading, error, cour, refetch } }) => {
const CommentaireList = ({ router }) => {
	const { loading, error, data } = useQuery(GET_COMMENTS_BY_COURS_ID, {
		variables: {
			id: router.query.id || '1'
		}
	});

	const [replyOn, setReplyOn] = useState(null);

	if (loading) return <Loader />;

	if (error) return false;

	const handleReplyClick = (commentID) => {
		setReplyOn(commentID);
	};

	if (data.cour.comments) {
		// get list of all parent comments with their respective child comments
		const comments = processComments(data.cour.comments);

		return (
			<section className='commentaires'>
				<div className='commentaires__title'>
					<h2>Commentaires</h2>
				</div>

				{comments ? (
					<ul>
						{comments.map((comment) => (
							<li key={comment.id}>
								<CommentaireItem data={comment} handleReplyClick={handleReplyClick} />
								{(comment.replies || replyOn === comment.id) && (
									<ul>
										{comment.replies &&
											comment.replies.map((reply) => (
												<li key={reply.id}>
													<CommentaireItem data={reply} courID={router.query.id} child />
												</li>
											))}

										{replyOn === comment.id && (
											<li>
												<CreateComment
													placeholder='Ecrivez votre réponse...'
													commentParentID={comment.id}
													handleReplyCallback={handleReplyClick}
													courID={router.query.id}
												/>
											</li>
										)}
									</ul>
								)}
							</li>
						))}
						<li>
							<CreateComment placeholder='Ecrivez votre commentaire...' />
						</li>
					</ul>
				) : (
					<p>Soyez la première personne à écrire un commentaire</p>
				)}

				<style jsx>{`
					ul,
					li {
						list-style-type: none;
						margin: 0;
						padding: 0;
					}
					li ul {
						padding-left: 64px;
					}
					.commentaires {
						display: block;
						max-width: 800px;
						background: #fff;
						border-radius: 8px;
						//padding: 0 64px 64px;
						margin: 64px auto;
					}
					.commentaires__title {
						display: flex;
						justify-content: flex-end;
					}
					.commentaires__title h2 {
						font-size: 32px;
						background: #9cc5e1;
						padding: 8px;
						margin: -32px -64px 32px 0;
					}
					.commentaires > ul > li {
						padding: 32px 64px;
					}
					.commentaires ul ul li + li {
						border-top: 1px solid #ddd;
					}
					.commentaires > ul > li:nth-child(even) {
						background: #f7f7f7;
					}
				`}</style>
			</section>
		);
	}
	return false;
};

export default compose(withRouter, withApollo({ ssr: false }))(CommentaireList);
