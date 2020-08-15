import React from 'react';
import Link from 'next/link';
import { Dropdown } from 'semantic-ui-react';

// import { push as Menu } from 'react-burger-menu';
import store from '../../redux/stores';
import { clearContentToGo } from '../../redux/actions';
import { unsetToken } from '../../helpers/auth';

const defaultLinks = [
	{ href: '/cours', label: 'cours' },
	{ href: '/categorie', label: 'catégories' },
	{ href: '/niveau', label: 'niveaux' }
];

const guestLinks = [
	{ href: '/connection', label: 'connection' },
	{ href: '/enregistrement', label: 'enregistrement' }
];

const Nav = ({ isAuthenticated, username, userAvatar }) => (
	<nav>
		<div className='nav__container'>
			<Link href='/'>
				<a>
					<h1>Annalisa lessons</h1>
				</a>
			</Link>
			<ul>
				{defaultLinks.map(({ href, label }) => {
					return (
						<li key={label}>
							<Link href={href}>
								<a
									onClick={() => {
										store.dispatch(clearContentToGo());
									}}>
									{label}
								</a>
							</Link>
						</li>
					);
				})}
			</ul>
			{isAuthenticated ? (
				<div className='navUser'>
					<Dropdown text={username}>
						<Dropdown.Menu>
							<Link href='/profile'>
								<a>Edit Profile</a>
							</Link>
							{/* <Dropdown.Divider /> */}
							<button onClick={() => unsetToken()}>Logout</button>
						</Dropdown.Menu>
					</Dropdown>
					{userAvatar ? (
						<img src={`http://localhost:1337${userAvatar}`} alt={username} />
					) : (
						<img src='https://via.placeholder.com/64' alt={username} />
					)}
				</div>
			) : (
				<ul className='nav__user'>
					{guestLinks.map(({ href, label }) => {
						return (
							<li key={label}>
								<Link href={href}>
									<a
										onClick={() => {
											store.dispatch(clearContentToGo());
										}}>
										{label}
									</a>
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</div>
		<style jsx>{`
			nav {
				position: fixed;
				top: 0;
				left: 0;
				z-index: 1;
				width: 100%;
				background-color: white;
				box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
			}
			.nav__container {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 64px;
				max-width: 1200px;
				margin: 0 auto;
			}
			nav h1 {
				margin: 0 32px 0 0;
			}
			nav ul {
				display: flex;
				align-items: center;
				list-style-type: none;
				margin: 0;
				padding: 0;
			}
			nav ul a {
				color: #222;
				font-family: 'Raleway';
				font-size: 16px;
				font-weight: 300;
				text-transform: uppercase;
				padding: 8px 16px;
			}
			nav ul li:after {
				content: '/';
			}
			nav ul li:last-child:after {
				content: '';
			}
			.navUser {
				display: flex;
				align-items: center;
			}
			.navUser img {
				max-width: 40px;
				border-radius: 50%;
				margin-left: 8px;
			}
			.navUser a {
				display: block;
				padding: 12px 16px;
			}
			.navUser button {
				display: block;
				background: transparent;
				padding: 12px 16px;
			}
			.navUser button:hover {
				cursor: pointer;
			}
		`}</style>
	</nav>

	// <Menu pageWrapId='main'>
	// 	{isAuthenticated ? (
	// 		<div className='nav__user'>
	// 			<img src='https://via.placeholder.com/64' alt='user' className='nav__user-avatar' />
	// 			<div className='nav__user-name'>
	// 				<p> Bonjour {loggedUser}! </p>
	// 				<Link href='/profile'>
	// 					<a>Profile</a>
	// 				</Link>
	// 			</div>
	// 		</div>
	// 	) : (
	// 		<ul className='nav__user'>
	// 			{guestLinks.map(({ key, href, label }) => {
	// 				return (
	// 					<li key={label}>
	// 						<Link href={href}>
	// 							<a
	// 								onClick={() => {
	// 									store.dispatch(clear());
	// 								}}>
	// 								{label}
	// 							</a>
	// 						</Link>
	// 					</li>
	// 				);
	// 			})}
	// 		</ul>
	// 	)}
	// 	<ul className='nav__list'>
	// 		{defaultLinks.map(({ key, href, label }) => {
	// 			return (
	// 				<li key={label}>
	// 					<Link href={href}>
	// 						<a>{label}</a>
	// 					</Link>
	// 				</li>
	// 			);
	// 		})}
	// 	</ul>
	// 	<style global jsx>{`
	// 		.nav__user {
	// 			display: flex !important;
	// 			align-items: center;
	// 			background: rgba(255, 255, 255, 0.2);
	// 			padding: 16px 32px;
	// 			margin: 0 0 40px;
	// 		}

	// 		.nav__user-avatar {
	// 			border-radius: 50%;
	// 			margin-right: 16px;
	// 		}

	// 		.nav__user-name p {
	// 			color: white;
	// 			margin: 0 0 8px;
	// 		}

	// 		.nav__list {
	// 			list-style-type: none;
	// 			margin: 0;
	// 			padding: 0;
	// 		}

	// 		.nav__list a {
	// 			display: block;
	// 			color: white;
	// 			font-size: 14px;
	// 			text-transform: uppercase;
	// 			text-decoration: none;
	// 			background: transparent;
	// 			padding: 16px 32px;
	// 			transition: background 0.1s;
	// 		}

	// 		.nav__list a:hover {
	// 			background: rgba(0, 0, 0, 0.2);
	// 		}
	// 	`}</style>
	// </Menu>
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
