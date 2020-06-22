import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

const Breadcrumb = (props) => {
	const { items } = props;
	console.log(items);
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
										// store.dispatch(clear());
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
		</div>
	);
};

export default Breadcrumb;
