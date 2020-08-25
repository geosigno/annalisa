import React from 'react';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faReply } from '@fortawesome/free-solid-svg-icons';

import { dateToFormat, dateToTime } from '../../helpers/date';

import { COLORS } from '../../constants'

function CommentaireItem(props) {
	const {
		data: {
			id,
			Content,
			created_at,
			user: { username, avatar }
		},
		child,
		handleReplyClick
	} = props;

	return (
		<div className='commentaire'>
			<div className='commentaire__container'>
				{avatar[0]?.url && <img src={`http://localhost:1337${avatar[0].url}`} alt={username} className='commentaire__avatar' />}
				<div>
					<p className='commentaire__user'>{username}</p>
					<p className='commentaire__meta'>
						posté le {dateToFormat(created_at)} à {dateToTime(created_at)}
					</p>
				</div>
			</div>
			<div className='commentaire__content'>
				<p>{Content}</p>
				{!child && (
					<button
						type='button'
						className='commentaire__reply'
						onClick={(e) => {
							e.preventDefault();
							handleReplyClick(id);
						}}>
						<span>répondre</span>
						{/* <FontAwesomeIcon icon={faReply} size='1x' color='#f2709c' /> */}
					</button>
				)}
			</div>

			<style jsx>{`
				.commentaire {
					margin: 32px 0;
				}
				.commentaire__container {
					display: flex;
					align-items: center;
					margin: 0 0 24px;
				}
				.commentaire__avatar {
					max-width: 64px;
					box-shadow: rgba(0, 0, 0, 0.086) 0px 1px 4px 0px, rgba(0, 0, 0, 0.086) 0px 8px 16px 0px;
					border: 4px solid white;
					border-radius: 50%;
					margin-right: 16px;
				}
				.commentaire__user {
					font-size: 18px;
					font-weight: 600;
					margin: 0;
				}
				.commentaire__meta {
					font-size: 80%;
					color: #999;
					margin: 0;
				}
				.commentaire__content p {
					font-size: 16px;
					line-height: 1.6;
				}
				.commentaire__reply {
					color: ${COLORS.primary};
					font-weight: 600;
					background: transparent;
					border-bottom: 2px solid ${COLORS.primary};
					padding: 4px 0;
				}
				.commentaire__reply span {
					margin-right: 8px;
				}
				.commentaire__reply:hover {
					cursor: pointer;
				}
			`}</style>
		</div>
	);
}

export default CommentaireItem;
