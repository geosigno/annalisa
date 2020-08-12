import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'next/router';
import { compose } from 'recompose';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { withApollo } from '../../apollo/apollo';

import store from '../../redux/stores';
import Textarea from '../form/Textarea';
import Loader from '../Loader';

import { GET_USER_DATA } from '../../apollo/query/profile';
import { CREATE_COMMENT, GET_COMMENTS_BY_COURS_ID } from '../../apollo/query/comment';

function CreateComment(props) {
	const { placeholder, commentParentID, handleReplyCallback, router } = props;

	const coursID = store.getState() ? store.getState().coursReducer.coursID : null;
	const coursSlug = router.query.id;

	const { loading, error, data } = useQuery(GET_USER_DATA);

	const textareaRef = useRef(null);

	useEffect(() => {
		commentParentID && textareaRef.current.focus();
	});

	const [createComment] = useMutation(CREATE_COMMENT, {
		update(cache, { data: { createComment } }) {
			const { courBySlug } = cache.readQuery({
				query: GET_COMMENTS_BY_COURS_ID,
				variables: {
					id: coursSlug
				}
			});
			cache.writeQuery({
				query: GET_COMMENTS_BY_COURS_ID,
				data: { comments: courBySlug.comments.concat([createComment]) }
			});
		},
		refetchQueries: [
			{
				query: GET_COMMENTS_BY_COURS_ID,
				variables: {
					id: coursSlug
				}
			}
		]
	});

	const { register, handleSubmit, errors, setValue } = useForm();

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
			// clear the textarea once done
			setValue('comment', '');
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
						<Textarea
							id='comment'
							name='comment'
							label={placeholder}
							register={(e) => {
								textareaRef.current = e;
								register(e, { required: true, minLength: 3 });
							}}
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

export default compose(withRouter, withApollo({ ssr: false }))(CreateComment);
