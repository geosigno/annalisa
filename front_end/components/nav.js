import React from 'react';
import Link from 'next/link';

import { Container } from '@material-ui/core';

const linksLeft = [{ key: 1, href: '/', label: "page d'accueil" }, { key: 2, href: '/cours', label: 'cours' }];

const linksRight = [
	{ key: 3, href: '/signin', label: 'se connecter' },
	{ key: 4, href: '/signup', label: "s'enregistrer" }
];

const Nav = () => (
	<nav>
		<Container>
			<div className="nav-container">
				<ul className="nav-left">
					{linksLeft.map(({ key, href, label }) => {
						return (
							<Link key={key} href={href}>
								<a>{label}</a>
							</Link>
						);
					})}
				</ul>
				<ul className="nav-right">
					{linksRight.map(({ key, href, label }) => {
						return (
							<Link key={key} href={href}>
								<a>{label}</a>
							</Link>
						);
					})}
				</ul>
			</div>
		</Container>

		<style jsx>
			{`
				nav {
					position: sticky;
					top: 0;
					background-color: #83a4d4;
				}
				.nav-container {
					display: flex;
					justify-content: space-between;
					width: 100%;
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
			`}
		</style>
	</nav>
);

export default Nav;
