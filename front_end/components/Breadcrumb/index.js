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
				div {
					display: flex;
					align-items: center;
					background-color: #f5f5f5;
					border-radius: 8px;
					padding: 8px;
				}
				ul {
					display: flex;
					margin: 0;
					padding: 0;
				}
				li {
					list-style-type: none;
					padding: 8px 0 8px 8px;
				}
				li:after {
					content: '>';
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
