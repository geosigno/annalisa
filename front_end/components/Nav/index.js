import React from 'react';
import Link from 'next/link';

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
	<nav>
		<Container>
			<div className='nav-container'>
				<ul className='nav-left'>
					{defaultLinks.map(({ key, href, label }) => {
						return (
							<Link key={key} href={href}>
								<a>{label}</a>
							</Link>
						);
					})}
				</ul>

				<div className='nav-search'>
					<input type='search' placeholder='recherche' />
					<FontAwesomeIcon icon={faSearch} size='1x' color='#fff' />
				</div>

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

				<div className='nav-social'>
					<Link href='/'>
						<a>
							<FontAwesomeIcon icon={faFacebook} size='2x' color='#fff' />
						</a>
					</Link>
				</div>
			</div>
		</Container>

		<style jsx>
			{`
				nav {
					height: 60px;
					position: sticky;
					top: 0;
					z-index: 1;
					background-color: #9cc5e1;
				}
				.nav-container {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					height: 60px;
				}
				ul {
					display: flex;
					margin: 0;
					padding: 0;
				}
				nav > ul {
					padding: 4px 16px;
				}
				li {
					display: flex;
					padding: 6px 8px;
				}
				a {
					color: white;
					font-size: 14px;
					text-decoration: none;
					text-transform: uppercase;
					padding: 16px 32px;
				}
				.nav-search {
					position: relative;
					display: flex;
					align-items: center;
					
				}
				.nav-search svg {
					position: absolute;
					right 16px;
					top: 50%;
					transform: translateY(-50%);
				}
				.nav-search [type='search'] {
					color: #fff;
					height: 40px;
					background-color: rgba(255,255,255,.2);
					border: 1px solid rgba(255,255,255,.5);
					border-radius: 8px;
					padding: 8px 16px;
				}
				.nav-social {
					display: flex;
					align-items: center;
					
				}
			`}
		</style>
	</nav>
);

export default Nav;
