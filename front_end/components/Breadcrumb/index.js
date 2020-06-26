import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { CLEAR_PAGE_FROM } from '../../redux/actions';


const Breadcrumb = (props) => {
	const { items } = props;
	return (
		<div>
			<Link href='/'>
				<a
					onClick={(e) => {
						e.preventDefault();
						Router.back();
					}}>
					Retour
				</a>
			</Link>
			<ul>
				<li>
					<Link href='/'>
						<a>Accueil</a>
					</Link>
				</li>
				{items.map(({ label, href }) => (
					<li key={label}>
						{href ? (
							<Link href={href}>
								<a
									onClick={() => {
										store.dispatch(CLEAR_PAGE_FROM());
									}}>
									{label}
								</a>
							</Link>
						) : (
							label
						)}
					</li>
				))}
			</ul>
			<style jsx>{`
				ul {	
					display: flex;
					max-width: 800px;
					padding: 0;
					margin: 0 auto;
				}
				li {
					list-style-type: none;
					padding: 8px 0 8px 8px;
				}
				li:after {
					content: '/';
					padding-left: 8px;
				}
				li:last-child:after {
					content: '';
				}
			`}</style>
		</div>
	);
};

export default Breadcrumb;
