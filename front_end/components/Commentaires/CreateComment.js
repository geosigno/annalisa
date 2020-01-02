import React, { useState } from 'react';
import axios from 'axios';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import useForm from 'react-hook-form';

import store from '../../stores';

import Auth from '../../helpers/auth';

// import { GET_COMMENTAIRES_BY_COURS_ID } from './_query';

const CREATE_COMMENTAIRE = gql`
	mutation createCommentaire($texte: String!, $cour: ID!, $user: ID!, $parentID: ID) {
		createCommentaire(input: { data: { texte: $texte, cour: $cour, user: $user, parentID: $parentID } }) {
			commentaire {
				id
				texte
				created_at
				parentID {
					id
				}
				user {
					id
					username
				}
			}
		}
	}
`;

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

// const GET_COMMENTAIRES = gql`
// 	query GetCommentaires {
// 		commentaires
// 	}
// `;

function CreateComment(props) {
	const { parentID, refetch } = props;
	const [value, setValue] = useState('');
	const coursID = store.getState() ? store.getState().coursID : null;
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
				refetch();
				setValue('');
			}
		}
	);

	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		getUserID().then((userID) => {
			createCommentaire({ variables: { texte: data.commentaire, cour: coursID, user: userID, parentID } });
		});
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='createCommentaire'>
					<label htmlFor='commentaire'>
						<textarea
							id='commentaire'
							name='commentaire'
							placeholder='Ecrivez votre note'
							ref={register({ required: true, minLength: 3 })}
							onChange={(e) => setValue(e.target.value)}
							value={value}
						/>
					</label>
				</div>

				{errors.commentaire && errors.commentaire.type === 'required' && (
					<p className='input__error'>Veuillez écrire votre commentaire</p>
				)}

				<button type='submit'>Add Commentaire</button>

				<style jsx>{`
					form {
						display: flex;
						flex-direction: column;
					}
					.form textarea {
						height: 120px;
					}
					label {
						width: 100%;
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
