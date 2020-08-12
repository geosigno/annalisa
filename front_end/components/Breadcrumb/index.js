import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { MdArrowBack, MdHome } from 'react-icons/md';
import store from '../../redux/stores';

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
					<MdArrowBack size='24px' />
					<span className='sr-only'>Retour</span>
				</a>
			</Link>
			<ul>
				<li>
					<Link href='/'>
						<a>
							{/* <MdHome size='16px'/> */}
							Accueil
						</a>
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
					margin: 0 0 16px;
				}
				a {
					display: inline-flex;
					align-items: center;
				}
				ul {
					display: flex;
					margin: 0 0 0 16px;
					padding: 0;
				}
				li {
					display: inline-flex;
					align-items: center;
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
