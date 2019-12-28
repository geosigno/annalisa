import React from 'react';

import Commentaire from './Commentaire';

const processComments = (comments) => {
	const parentComments = comments.filter((comment) => !comment.parentID);
	const childComments = comments.filter((comment) => comment.parentID);
	childComments.forEach((childComment) => {
		const parentID = childComment.parentID.id;
		parentComments.forEach((parentComment) => {
			if (parentComment.id === parentID) {
				if (!parentComment.replies) parentComment.replies = new Array();
				parentComment.replies.push(childComment);
			}
		});
	});
	return parentComments;
};

const CommentaireList = (props) => {
	const { data } = props;
	const comments = processComments(data);
	if (!comments) return;
	return (
		<section className='commentaire'>
			<ul>
				{comments.map((comment) => (
					<Commentaire data={comment} key={comment.id} />
				))}
			</ul>

			<style jsx>{`
				.commentaire {
					display: block;
					max-width: 800px;
					margin: 0 auto;
				}
			`}</style>
		</section>
	);
};

export default CommentaireList;
