import React from 'react';

import axios from 'axios';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import store from '../../stores';

import Auth from '../auth';

const auth = new Auth();

const CREATE_COMMENTAIRE = gql`
	mutation createCommentaire($texte: String!, $cour: ID!, $user: ID!, $parentID: ID) {
		createCommentaire(input: { data: { texte: $texte, cour: $cour, user: $user, parentID: $parentID } }) {
			commentaire {
				id
				texte
			}
		}
	}
`;

async function getUserID() {
	const headers = auth.getBearer();
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

function CreateComment(props) {
	const { parentID } = props;
	const coursID = store.getState() ? store.getState().coursID : null;
	let input;
	const [createCommentaire] = useMutation(CREATE_COMMENTAIRE);

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					getUserID().then((userID) => {
						createCommentaire({ variables: { texte: input.value, cour: coursID, user: userID, parentID } });
						// input.value = '';
					});
				}}>
				<textarea
					ref={(node) => {
						input = node;
					}}
				/>
				<button type='submit'>Add Commentaire</button>
			</form>
		</div>
	);
}

export default CreateComment;
