import React from 'react';
import Commentaire from './Commentaire';
import CreateComment from './CreateComment';

function CommentaireItem(props) {
	return (
		<li>
			<Commentaire data={props.data} handleReplyClick={props.handleReplyClick} />
			{props.replyOn && <CreateComment parentID={props.data.id} refetch={props.refetch} />}
			{props.data.replies && (
				<ul>
					{props.data.replies.map((reply) => (
						<Commentaire data={reply} child key={reply.id} />
					))}
				</ul>
			)}
		</li>
	);
}

export default CommentaireItem;
