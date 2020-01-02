import React from 'react';

import { dateToFormat, dateToTime } from '../../helpers/date';

function Commentaire(props) {
	const {
		id,
		texte,
		created_at,
		user: { username, avatar }
	} = props.data;

	return (
		<div className='commentaire'>
			<div className='commentaire__container'>
				{avatar && <img src={`http://localhost:1337/${avatar.url}`} alt={username} className='commentaire__avatar' />}
				<div className='commentaire__content'>
					<span className='commentaire__meta'>
						posté le {dateToFormat(created_at)} à {dateToTime(created_at)} par {username}
					</span>
					{!props.child && (
						<button
							type='button'
							onClick={(e) => {
								e.preventDefault();
								props.handleReplyClick(id);
								// setReply(true);
							}}>
							répondre
						</button>
					)}
					<p>{texte}</p>
				</div>
			</div>
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
				.commentaire {
					margin: 0 0 40px;
				}
				.commentaire__container {
					display: flex;
					align-items: center;
				}
				.commentaire__avatar {
					max-width: 64px;
					box-shadow: rgba(0, 0, 0, 0.086) 0px 1px 4px 0px, rgba(0, 0, 0, 0.086) 0px 8px 16px 0px;
					border: 4px solid white;
					border-radius: 50%;
					margin-right: 32px;
				}
				.commentaire__meta {
					font-size: 80%;
					color: #999;
				}
			`}</style>
		</div>
	);
}

export default Commentaire;
