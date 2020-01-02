import React from 'react';
import Link from 'next/link';

import { push as Menu } from 'react-burger-menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

import { Container } from '@material-ui/core';
import { clear } from '../../actions';
import store from '../../stores';

const defaultLinks = [
	{ key: 1, href: '/', label: 'accueil' },
	{ key: 2, href: '/cours', label: 'cours' },
	{ key: 3, href: '/categories', label: 'catégories' },
	{ key: 4, href: '/niveaux', label: 'niveaux' }
];

const guestLinks = [
	{ key: 3, href: '/signin', label: 'se connecter' },
	{ key: 4, href: '/signup', label: "s'enregistrer" }
];

const Nav = ({ isAuthenticated, loggedUser }) => (
	<Menu pageWrapId='main'>
		<ul>
			{defaultLinks.map(({ key, href, label }) => {
				return (
					<Link key={key} href={href}>
						<a>{label}</a>
					</Link>
				);
			})}
		</ul>
		{isAuthenticated ? (
			<span> Hi {loggedUser}! </span>
		) : (
			<ul className='nav-right'>
				{guestLinks.map(({ key, href, label }) => {
					return (
						<Link key={key} href={href}>
							<a
								onClick={() => {
									store.dispatch(clear());
								}}>
								{label}
							</a>
						</Link>
					);
				})}
			</ul>
		)}
		<style global jsx>{`
			/* Position and sizing of burger button */
			.bm-burger-button {
				position: fixed;
				width: 36px;
				height: 30px;
				left: 36px;
				top: 36px;
			}

			/* Color/shape of burger icon bars */
			.bm-burger-bars {
				background: #373a47;
			}

			/* Color/shape of burger icon bars on hover*/
			.bm-burger-bars-hover {
				background: #a90000;
			}

			/* Position and sizing of clickable cross button */
			.bm-cross-button {
				height: 24px;
				width: 24px;
			}

			/* Color/shape of close button cross */
			.bm-cross {
				background: #bdc3c7;
			}

			/*
			Sidebar wrapper styles
			Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
			*/
			.bm-menu-wrap {
				position: fixed;
				height: 100%;
			}

			/* General sidebar styles */
			.bm-menu {
				background: #373a47;
				padding: 2.5em 1.5em 0;
				font-size: 1.15em;
			}

			/* Morph shape necessary with bubble or elastic */
			.bm-morph-shape {
				fill: #373a47;
			}

			/* Wrapper for item list */
			.bm-item-list {
				color: #b8b7ad;
				padding: 0.8em;
			}

			/* Individual item */
			.bm-item {
				display: inline-block;
			}

			/* Styling of overlay */
			.bm-overlay {
				background: rgba(0, 0, 0, 0.3);
			}
		`}</style>
	</Menu>
);

// 	<nav>
// 		<Container>
// 			<div className='nav-container'>
// 				<ul className='nav-left'>
// 					{defaultLinks.map(({ key, href, label }) => {
// 						return (
// 							<Link key={key} href={href}>
// 								<a>{label}</a>
// 							</Link>
// 						);
// 					})}
// 				</ul>

// 				<div className='nav-search'>
// 					<input type='search' placeholder='recherche' />
// 					<FontAwesomeIcon icon={faSearch} size='1x' color='#fff' />
// 				</div>

// 				{isAuthenticated ? (
// 					<span> Hi {loggedUser}! </span>
// 				) : (
// 					<ul className='nav-right'>
// 						{guestLinks.map(({ key, href, label }) => {
// 							return (
// 								<Link key={key} href={href}>
// 									<a
// 										onClick={() => {
// 											store.dispatch(clear());
// 										}}>
// 										{label}
// 									</a>
// 								</Link>
// 							);
// 						})}
// 					</ul>
// 				)}

// 				<div className='nav-social'>
// 					<Link href='/'>
// 						<a>
// 							<FontAwesomeIcon icon={faFacebook} size='2x' color='#fff' />
// 						</a>
// 					</Link>
// 				</div>
// 			</div>
// 		</Container>

// 		<style jsx>
// 			{`
// 				nav {
// 					height: 60px;
// 					position: fixed;
// 					top: 0;
// 					left: 0;
// 					width: 100%;
// 					z-index: 1;
// 					background-color: #9cc5e1;
// 				}
// 				.nav-container {
// 					display: flex;
// 					align-items: center;
// 					justify-content: space-between;
// 					width: 100%;
// 					height: 60px;
// 				}
// 				ul {
// 					display: flex;
// 					margin: 0;
// 					padding: 0;
// 				}
// 				nav > ul {
// 					padding: 4px 16px;
// 				}
// 				li {
// 					display: flex;
// 					padding: 6px 8px;
// 				}
// 				a {
// 					color: white;
// 					font-size: 14px;
// 					text-decoration: none;
// 					text-transform: uppercase;
// 					padding: 16px 32px;
// 				}
// 				.nav-search {
// 					position: relative;
// 					display: flex;
// 					align-items: center;

// 				}
// 				.nav-search svg {
// 					position: absolute;
// 					right 16px;
// 					top: 50%;
// 					transform: translateY(-50%);
// 				}
// 				.nav-search [type='search'] {
// 					color: #fff;
// 					height: 40px;
// 					background-color: rgba(255,255,255,.2);
// 					border: 1px solid rgba(255,255,255,.5);
// 					border-radius: 8px;
// 					padding: 8px 16px;
// 				}
// 				.nav-social {
// 					display: flex;
// 					align-items: center;

// 				}
// 			`}
// 		</style>
// 	</nav>
// );

export default Nav;
