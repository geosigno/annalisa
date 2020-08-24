import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FcCheckmark } from 'react-icons/fc';
import useScrollDirection from '../../hooks/useScrollDirection';

const CoursProgress = ({ sections }) => {
	const [isActive, setIsActive] = useState([]);
	const [isSeen, setIsSeen] = useState([]);
	const scrollDirection = useScrollDirection();

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
		<aside>
			{sections && (
				<ul className={isActive.length ? 'active' : ''}>
					{sections.map((section) => {
						const classNames = [];
						if (isActive.some(item => item === section.type)) classNames.push('active');
						if (isSeen.some(item => item === section.type)) classNames.push('seen');
						return (
							<li key={section.title} className={classNames.join(' ')}>
								<span style={{color: 'blue'}}>
									{classNames.indexOf('seen') !== -1 &&
										<FcCheckmark size='24px' />
									}
								</span>
								<ScrollLink
									to={section.type}
									spy
									smooth
									offset={scrollDirection === 'up' ? 0 : -64}
									duration={500}
									onSetActive={handleIsActive}
									onSetInactive={handleIsInactive}>
									{section.title}
								</ScrollLink>
							</li>
						)
					})}
					<style jsx>{`
						ul {
							list-style-type: none;
							position: fixed;
							left: 200px;
							top: 50%;
							transform: translateX(-50%);
							opacity: 0;
							transition: opacity 0.2s;
							will-change: opacity;
						}
						ul.active {
							opacity: 1;
						}
						li {
							position: relative;
							padding: 16px 8px;
						}
						li span {
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
							border: 1px solid #C0C0C0;
						}
						li:hover {
							cursor: pointer;
						}
					`}</style>
					<style global jsx>{`
						li.active a {
							color: red;
							font-weight: bold;
						}
					`}</style>
				</ul>
			)}
			;
		</aside>
	);
};

export default CoursProgress;
