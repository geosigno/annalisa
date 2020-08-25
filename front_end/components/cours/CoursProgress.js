import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FcCheckmark } from 'react-icons/fc';
import { MdDone } from 'react-icons/md';
import useScrollDirection from '../../hooks/useScrollDirection';
import { COLORS } from '../../constants';

const CoursProgress = ({ sections }) => {
	const [isActive, setIsActive] = useState([]);
	const [isSeen, setIsSeen] = useState([]);
	const [threeDots, setThreeDots] = useState('.');
	const scrollDirection = useScrollDirection();

	useEffect(() => {
		const dotsInterval = setInterval(() => {
			setThreeDots(threeDots.length < 3 ? threeDots+'.' : '');
		}, 1000);
		return () => clearInterval(dotsInterval);
	})

	const handleIsActive = (section) => {
		setIsActive([...isActive, section]);
		setIsSeen(isSeen.filter(item => item !== section));
	}

	const handleIsInactive = (section) => { 
		setIsActive(isActive.filter(item => item !== section));
		if (scrollDirection === 'down' && isSeen.indexOf(section) === -1) {
			setIsSeen([...isSeen, section]);
		}
	}

	return (
		<aside className={isActive.length ? 'active' : ''}>
			{sections && (
				<ul>
					{sections.map((section) => {
						const classNames = [];
						if (isActive.some(item => item === section.type)) classNames.push('active');
						if (isSeen.some(item => item === section.type)) classNames.push('seen');
						return (
							<li key={section.title} className={classNames.join(' ')}>
								<span>
									<MdDone size='16px' />
								</span>
								<ScrollLink
									to={section.type}
									spy
									smooth
									offset={scrollDirection === 'up' ? 0 : -64}
									duration={500}
									onSetActive={handleIsActive}
									onSetInactive={handleIsInactive}>
									{section.title+(classNames.includes('active') ? threeDots : '')}
								</ScrollLink>
							</li>
						)
					})}
					
				</ul>
			)}
			<style jsx>{`
						aside {
							position: fixed;
							left: 200px;
							top: 50%;
							transform: translateY(-50%);
							background: #fff;
							min-width: 220px;
							border-radius: 4px;
							opacity: 0;
							padding: 16px;
							box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
							transition: opacity 0.2s;
							will-change: opacity;
						}
						aside.active {
							opacity: 1;
						}
						ul {
							list-style-type: none;
							margin: 0;
							padding: 0 0 0 32px;
						}
						li {
							position: relative;
							padding: 16px 8px;
						}
						li:before {
							content: '';
							border: 1px dashed #EEEEEE;
							position: absolute;
							height: 50%;
							left: -13px;
							top: 75%;
						}
						li:last-child:before {
							display: none;
						}
						li span {
							display: flex;
							align-items: center;
							justify-content: center;
							position: absolute;
							top: 50%;
							left: -24px;
							transform: translateY(-50%);
							width: 24px;
							height: 24px;
							border-radius: 50%;
							background: #fff;
							border: 1px solid #EEEEEE;
							transition: all .2s;
						}
						li.seen span {
							background: ${COLORS.success};
							border-color: ${COLORS.success};
						}
						li:hover {
							cursor: pointer;
						}
					`}</style>
					<style global jsx>{`
						li a {
							color: ${COLORS.text};
						}
						li svg {
							color: #eee;
						}
						li.seen svg {
							color: #fff;
						}
						li.active a {
							font-weight: bold;
						}
					`}</style>
		</aside>
	);
};

export default CoursProgress;
