import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { MdArrowBack, MdHome, MdPlayArrow } from 'react-icons/md';
import useScrollDirection from '../../hooks/useScrollDirection';
import store from '../../redux/stores';
import { CLEAR_PAGE_FROM } from '../../redux/actions';
import { COLORS } from '../../constants';
import Container from '../Container';

const Breadcrumb = ({ items, size }) => {
	const scrollDirection = useScrollDirection();
	return (
		<div className={`breadcrumb ${scrollDirection}`}>
			<Container size={size}>
				<div className='breadcrumb__container'>
					<Link href='/'>
						<a
							onClick={(e) => {
								e.preventDefault();
								Router.back();
							}}>
							<MdArrowBack size='32px' />
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
							<MdPlayArrow />
						</li>
						{items.map(({ label, href }, index) => (
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
								{index < items.length - 1 && <MdPlayArrow />}
							</li>
						))}
					</ul>
				</div>
			</Container>

			<style jsx>{`
				.breadcrumb {
					background: ${COLORS.primary};
					color: #fff;
					position: fixed;
					height: 51px;
					top: 64px;
					left: 0;
					z-index: 0;
					width: 100%;
					box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
					transition: top 0.3s;
				}
				.breadcrumb.down {
					top: 0;
					z-index: 2;
				}
				.breadcrumb__container {
					display: flex;
					align-items: center;
					border-radius: 8px;
					padding: 8px 0;
					margin: 0 0 16px;
				}
				a {
					color: #fff;
					font-weight: 600;
					display: inline-flex;
					align-items: center;
					padding-right: 4px;
				}
				a:hover {
					color: #fff;
				}
				ul {
					display: flex;
					margin: 0 0 0 16px;
					padding: 0;
				}
				li {
					font-size: 14px;
					text-transform: uppercase;
					display: inline-flex;
					align-items: center;
					list-style-type: none;
					padding: 8px 4px;
				}
			`}</style>
			<style global jsx>{`
				body {
					padding-top: 115px;
				}
			`}</style>
		</div>
	);
};

export default Breadcrumb;
