import React, { useState } from 'react';

import { graphql } from 'react-apollo';
import { compose } from 'recompose';

import { withRouter } from 'next/router';

import Auth from '../../helpers/auth';

import Loader from '../Loader';

import CommentaireItem from './CommentaireItem';
import CreateComment from './CreateComment';

import { GET_COMMENTAIRES_BY_COURS_ID } from './_query';

const processComments = (comments) => {
	const array = comments;
	const parentComments = array.filter((comment) => !comment.parentID);
	const childComments = array.filter((comment) => comment.parentID);
	const newArray = parentComments;
	childComments.forEach((childComment) => {
		const parentID = childComment.parentID.id;
		parentComments.forEach((parentComment, index) => {
			if (parentComment.id === parentID) {
				if (!newArray[index].replies) newArray[index].replies = [];
				newArray[index].replies.push(childComment);
			}
		});
	});
	// console.log('parentComments', newArray);
	return newArray;
};

const CommentaireList = ({ data: { loading, error, cour, refetch } }) => {
	const [replyOn, setReplyOn] = useState(null);

	const handleReplyClick = (commentID) => {
		setReplyOn(commentID);
	};

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return false;
	}

	if (cour) {
		// get list of all parent comments with their respective child comments
		const test = cour.commentaires;
		const comments = processComments(test);
		return (
			<section className='commentaires'>
				<div className='commentaires__title'>
					<h2>Commentaires</h2>
				</div>
				<ul>
					{comments.map((comment) => (
						<CommentaireItem
							key={`vgbhjnk${comment.id}`}
							data={comment}
							refetch={refetch}
							handleReplyClick={handleReplyClick}
							replyOn={replyOn === comment.id}
						/>
					))}
				</ul>
				<div className='commentaires__title'>
					<h2>Ecrivez un commentaire</h2>
				</div>
				<CreateComment refetch={refetch} />
				<style jsx>{`
					ul,
					li {
						list-style-type: none;
						margin: 0;
						padding: 0;
					}
					.commentaires {
						display: block;
						max-width: 800px;
						background: #fff;
						border-radius: 8px;
						padding: 0 64px 64px;
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
				`}</style>
			</section>
		);
	}
	return false;
};

export default compose(
	withRouter,
	graphql(GET_COMMENTAIRES_BY_COURS_ID, {
		options: (props) => ({
			variables: {
				id: props.router.query.id || '1'
			},
			context: {
				headers: Auth.getBearer()
			}
		}),
		props: ({ data }) => ({ data })
	})
)(CommentaireList);
