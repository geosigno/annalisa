import React from 'react';

import CreateComment from './CreateComment';

import dateToFormat from '../../helpers/date';

class Commentaire extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reply: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		this.setState({
			reply: true
		});
	}

	render() {
		const {
			id,
			texte,
			created_at,
			user: { username },
			replies
		} = this.props.data;
		return (
			<li key={`parent${id}`}>
				<span>
					posté le {dateToFormat(created_at)} par {username}
				</span>
				<a href='#' onClick={this.handleClick}>
					répondre
				</a>
				<p>{texte}</p>
				{this.state.reply && <CreateComment parentID={id} />}
				{replies && (
					<ul>
						{replies.map((reply) => (
							<li key={`child${reply.id}`}>
								<span>
									posté le {dateToFormat(reply.created_at)} par {reply.user.username}
								</span>
								<p>{reply.texte}</p>
							</li>
						))}
					</ul>
				)}
				<style jsx>{`
					ul,
					li {
						margin: 0;
						padding: 0;
					}
				`}</style>
			</li>
		);
	}
}

// const Commentaire = (props) => {
//     const { id, texte, created_at, user: { username }, replies } = props.data;
//     let open = false;
//     return(
//         <li key={'parent'+id}>
//             <span>posté le {dateToFormat(created_at)} par {username}</span>
//             <a href="#" onClick={e => {
//                 e.preventDefault();
//                 open = true;
//                 console.log(open);
//             }}>
//                 répondre
//             </a>
//             {!open &&
//                 <CreateComment />
//             }
//             <p>{texte}</p>
//             {replies &&
//                 <ul>
//                     {replies.map((reply) => (
//                         <li key={'child'+reply.id}>
//                             <span>posté le {dateToFormat(reply.created_at)} par {reply.user.username}</span>
//                             <p>{reply.texte}</p>
//                         </li>
//                     ))}
//                 </ul>
//             }
//             <style jsx>{`
//                 ul, li {
//                     margin: 0;
//                     padding: 0;
//                 }

//             `}</style>
//         </li>
//     )
// }

export default Commentaire;
