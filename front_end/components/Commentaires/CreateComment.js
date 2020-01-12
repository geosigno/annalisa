import React, { useState } from 'react';

// import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import useForm from 'react-hook-form';

import axios from 'axios';
import useSWR from 'swr';
import TextareaAutosize from 'react-autosize-textarea';

import store from '../../stores';

import Auth from '../../helpers/auth';

import { CREATE_COMMENTAIRE } from './_query';

async function getUserID() {
	const headers = Auth.getBearer();
	return axios
		.get('http://localhost:1337/users/me/', { headers })
		.then((response) => {
			const { id } = response.data;
			return id;
		})
		.catch((error) => {
			// Handle error.
			return error.response;
		});
}

function getUserAvatar() {
	const headers = Auth.getBearer();
	return axios
		.get('http://localhost:1337/users/me/', { headers })
		.then((res) =>
			axios.get(`http://localhost:1337/users/${res.data.id}/`, { headers }).then((res2) => res2.data.avatar)
		);
}

function CreateComment(props) {
	const { placeholder, commentParentID, handleReplyCallback, refetch } = props;

	// get the user Avatar
	const { data, error } = useSWR('getUserAvatar', getUserAvatar);

	const [value, setValue] = useState('');

	// const textareaRef = useRef(null);

	// useEffect(() => {
	// 	if (commentParentID) {
	// 		textareaRef.current.focus();
	// 	}
	// });

	const [createCommentaire] = useMutation(
		CREATE_COMMENTAIRE,
		// {
		// 	update(cache, { data: { createCommentaire } }) {
		// 	  const { cour : { commentaires } } = cache.readQuery({ query: GET_COMMENTAIRES_BY_COURS_ID,
		// 		variables: {
		// 		  id: "1"
		// 		},
		// 		context: {
		// 			headers: Auth.getBearer()
		// 		}

		// 	});
		// 	  cache.writeQuery({
		// 		query: GET_COMMENTAIRES_BY_COURS_ID,
		// 		variables: {
		// 			id: "1"
		// 		  },
		// 		  context: {
		// 			headers: Auth.getBearer()
		// 		},
		// 		data: { cour: { commentaires: commentaires.concat([createCommentaire.commentaire]) } },
		// 	  });
		// 	}
		//   }

		{
			onCompleted() {
				if (handleReplyCallback) {
					handleReplyCallback('');
				}
				setValue('');
				refetch();
			}
		}
	);

	const { register, handleSubmit, errors } = useForm();

	// handle the comment form submit
	const onSubmit = (data) => {
		// get current cour Id
		const coursID = store.getState() ? store.getState().coursID : null;
		// get the userID
		getUserID().then((userID) => {
			// create a new comment entry
			createCommentaire({
				variables: { texte: data.commentaire, cour: coursID, user: userID, parentID: commentParentID }
			});
		});
	};

	return (
		<div>
			<form className='createCommentaire' onSubmit={handleSubmit(onSubmit)}>
				<div className='createCommentaire__container'>
					{data ? (
						<img className='createCommentaire__avatar' src={`http://localhost:1337/${data.url}`} alt='user avatar' />
					) : (
						<div className='createCommentaire__avatar' />
					)}

					<label htmlFor='commentaire'>
						<TextareaAutosize
							rows={2}
							id='commentaire'
							name='commentaire'
							placeholder={placeholder}
							ref={register({ required: true, minLength: 3 })}
							// ref={textareaRef}
							onChange={(e) => setValue(e.target.value)}
							value={value}
						/>

						{errors.commentaire && errors.commentaire.type === 'required' && (
							<p className='input__error'>Veuillez écrire votre commentaire</p>
						)}
					</label>
				</div>

				<div className='createCommentaire__submit'>
					<button type='submit'>Envoyer</button>
				</div>

				<style global jsx>{`
					.createCommentaire {
						display: block;
						margin: 32px 0;
					}
					.createCommentaire.child {
						padding-left: 64px;
					}
					.createCommentaire__container {
						display: flex;
						align-items: flex-start;
					}
					.createCommentaire__avatar {
						max-width: 64px;
						box-shadow: rgba(0, 0, 0, 0.086) 0px 1px 4px 0px, rgba(0, 0, 0, 0.086) 0px 8px 16px 0px;
						border: 4px solid white;
						border-radius: 50%;
						margin-right: 32px;
					}
					.createCommentaire label,
					.createCommentaire textarea {
						width: 100%;
					}
					.createCommentaire textarea {
						border-radius: 8px;
						border: 1px solid #999;
						padding: 8px;
					}
					.createCommentaire__submit {
						text-align: right;
					}
					.createCommentaire__submit button {
						font-weight: 600;
						background: transparent;
						border: 2px solid #222;
						border-radius: 16px;
						padding: 4px 16px;
					}
					.createCommentaire__submit button:hover {
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

export default CreateComment;
