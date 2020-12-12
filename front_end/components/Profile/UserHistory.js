import React from 'react';
import Link from 'next/link';
import { FcGraduationCap } from 'react-icons/fc';
import { MdDone } from 'react-icons/md';
import { COLORS } from '../../constants';

import Heading from '../Heading';

const UserHistory = (props) => {
	const {
		data: { cours_finished }
	} = props;

	return (
		<div>
			<Heading text='Cours complétés' size='1' />
			{cours_finished && (
				<ul>
					{cours_finished.map((item) => (
						<Link href={`/cours?id=${item.slug}`} as={`/cours/${item.slug}`}>
							<a>
								<li key={`cours_finished${item.id}`}>
									<span>
										<MdDone size='24px' />
									</span>
									<div>
										<div className='title'>
											<Heading text={item.name} size='3' />
											<span>-</span>
											{item.level && (
												<div className='level'>
													<FcGraduationCap size='16px' />
													<p>niveau {item.level.name}</p>
												</div>
											)}
										</div>
										{/* {item.categories && item.categories.map(category => (
											<p>{category.Name}</p>
										))} */}
									</div>
								</li>
							</a>
						</Link>
					))}
				</ul>
			)}
			<style jsx>{`
				ul {
					list-style-type: none;
				}
				a {
					color: inherit;
				}
				a:hover {
					color: inherit;
					text-decoration: none;
				}
				li {
					position: relative;
				}
				li > span {
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					top: 50%;
					left: -32px;
					transform: translateY(-50%);
					width: 32px;
					height: 32px;
					border-radius: 50%;
					background: ${COLORS.success};
					border-color: ${COLORS.success};
				}
				li > div {
					padding-left: 32px;
				}
				.title {
					display: flex;
				}
				.title span {
					font-size: 24px;
					margin: 0 8px;
				}
				.title .level {
					//margin-left: 8px;
				}
				.level {
					display: flex;
					align-items: center;
				}
				.level p {
					color: #999;
					font-size: 14px;
					margin-left: 8px;
				}
			`}</style>
			<style global jsx>{`
				li span svg {
					color: white;
				}
				h3 {
					color: inherit;
					margin: 0 !important;
				}
			`}</style>
		</div>
	);
};

export default UserHistory;
