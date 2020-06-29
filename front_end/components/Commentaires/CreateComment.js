import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-autosize-textarea';

import Loader from '../Loader';
import { withApollo } from '../../apollo/apollo';

import { GET_USER_DATA } from '../../apollo/query/profile';
import { CREATE_COMMENT, GET_COMMENTS_BY_COURS_ID } from '../../apollo/query/comment';

function CreateComment(props) {
	const { placeholder, commentParentID, handleReplyCallback, coursID } = props;

	const { loading, error, data } = useQuery(GET_USER_DATA);

	const [value, setValue] = useState('');

	const textareaRef = useRef(null);

	useEffect(() => {
		if (commentParentID) {
			textareaRef.current.focus();
		}
	});

	const [createComment] = useMutation(CREATE_COMMENT, {
		update(cache, { data: { createComment } }) {
			const { cour } = cache.readQuery({
				query: GET_COMMENTS_BY_COURS_ID,
				variables: {
					id: coursID
				}
			});
			cache.writeQuery({
				query: GET_COMMENTS_BY_COURS_ID,
				data: { comments: cour.comments.concat([createComment]) }
			});
		},
		refetchQueries: [
			{
				query: GET_COMMENTS_BY_COURS_ID,
				variables: {
					id: coursID
				}
			}
		]
	});

	const { register, handleSubmit, errors } = useForm();

	if (loading) return <Loader />;

	if (error) return <p> Il y a eu un problème </p>;

	const userId = data ? data.self.id : null;
	const userAvatar = data.self.avatar[0] ? data.self.avatar[0].url : null;

	// handle the comment form submit
	const onSubmit = (payload) => {
		// create a new comment entry
		createComment({
			variables: { content: payload.comment, cour: coursID, user: userId, parentID: commentParentID }
		}).then(() => {
			if (handleReplyCallback) {
				handleReplyCallback('');
			}
			setValue('');
		});
	};

	return (
		<div>
			<form className='createComment' onSubmit={handleSubmit(onSubmit)}>
				<div className='createComment__container'>
					{data ? (
						<img className='createComment__avatar' src={`http://localhost:1337${userAvatar}`} alt='user avatar' />
					) : (
						<div className='createComment__avatar' />
					)}

					<label htmlFor='comment'>
						<TextareaAutosize
							rows={2}
							id='comment'
							name='comment'
							placeholder={placeholder}
							ref={(e) => {
								textareaRef.current = e;
								register(e, { required: true, minLength: 3 });
							}}
							onChange={(e) => setValue(e.target.value)}
							value={value}
						/>

						{errors.comment && errors.comment.type === 'required' && (
							<p className='input__error'>Vous ne pouvez pas envoyer un commentaire vide!</p>
						)}

						{errors.comment && errors.comment.type === 'minLength' && (
							<p className='input__error'>Il faut un minium de contenu dans votre commentaire</p>
						)}
					</label>
				</div>

				<div className='createComment__submit'>
					<button type='submit'>Envoyer</button>
				</div>

				<style global jsx>{`
					.createComment {
						display: block;
						margin: 32px 0;
					}
					.createComment.child {
						padding-left: 64px;
					}
					.createComment__container {
						display: flex;
						align-items: flex-start;
					}
					.createComment__avatar {
						max-width: 64px;
						box-shadow: rgba(0, 0, 0, 0.086) 0px 1px 4px 0px, rgba(0, 0, 0, 0.086) 0px 8px 16px 0px;
						border: 4px solid white;
						border-radius: 50%;
						margin-right: 32px;
					}
					.createComment label,
					.createComment textarea {
						width: 100%;
					}
					.createComment textarea {
						border-radius: 8px;
						border: 1px solid #999;
						padding: 8px;
					}
					.createComment__submit {
						text-align: right;
					}
					.createComment__submit button {
						font-weight: 600;
						background: transparent;
						border: 2px solid #222;
						border-radius: 16px;
						padding: 4px 16px;
					}
					.createComment__submit button:hover {
						cursor: pointer;
					}
					.input__error {
						font-style: italic;
						font-size: 12px;
						text-align: left;
						color: red;
						margin: 0;
					}
					[type='submit'] {
						margin-top: 16px;
					}
				`}</style>
			</form>
		</div>
	);
}

export default withApollo({ ssr: false })(CreateComment);
