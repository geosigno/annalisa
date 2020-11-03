import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import { MdDone } from 'react-icons/md';
import useScrollDirection from '../../hooks/useScrollDirection';
import { COLORS } from '../../constants';
import { GET_USER_COURS_FINISHED } from '../../apollo/query/profile';
import UPDATE_USER from '../../apollo/mutation/updateUser';

const CoursProgress = ({ sections, coursID }) => {
	const { loading, error, data } = useQuery(GET_USER_COURS_FINISHED);
	const [updateUser] = useMutation(UPDATE_USER, { 
		onCompleted: () => setIsFinished(true)
	});
	const [isActive, setIsActive] = useState([]);
	const [isSeen, setIsSeen] = useState([]);
	const [threeDots, setThreeDots] = useState('.');
	const [isFinished, setIsFinished] = useState(false);
	const scrollDirection = useScrollDirection();

	let timeout;

	useEffect(() => {
		if (data?.self?.cours_finished && !isFinished) {
			const hasAlreadyFinishedThisCourse = data?.self?.cours_finished.some(item => item.id === coursID);
			if (hasAlreadyFinishedThisCourse){
				setIsFinished(true);
				setIsSeen([...isSeen, ...sections.map(section => section.type)]);
			} 
		}
	}, []);

	useEffect(() => {
		if (isSeen.length === sections.length && !isFinished) {
			timeout = setTimeout(() => {
				swal('Dois-je considérer que vous avez finit ce cours?', {
					buttons: ["Pas encore...", "Oui!"]
				}).then(value => {
					if (value === true) {
						const userID = Cookies.get('userID');
						updateUser({
							variables: { id: userID, cours_finished: coursID }
						});
					}
				})
			}, 1500);

		} else {
			clearTimeout(timeout);
		}
		return () => clearInterval(timeout);
	}, [isSeen]);

	useEffect(() => {
		const dotsInterval = setInterval(() => {
			setThreeDots(threeDots.length < 3 ? `${threeDots}.` : '');
		}, 1000);
		return () => clearInterval(dotsInterval);
	}, [threeDots]);

	const handleIsActive = (section) => {
		setIsActive([...isActive, section]);
		!isFinished && setIsSeen(isSeen.filter((item) => item !== section));
	};

	const handleIsInactive = (section) => {
		setIsActive(isActive.filter((item) => item !== section));
		if (!isFinished && scrollDirection === 'down'){
			setIsSeen([...isSeen, section]);
		} 
	};

	return (
		<aside className={isActive.length || isSeen.length ? 'active' : ''}>
			{sections && (
				<ul>
					{sections.map((section) => {
						const classNames = [];
						if (isActive.some((item) => item === section.type)) classNames.push('active');
						if (isSeen.some((item) => item === section.type)) classNames.push('seen');
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
									{section.title + (classNames.includes('active') ? threeDots : '')}
								</ScrollLink>
							</li>
						);
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
					border: 1px dashed #eeeeee;
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
					border: 1px solid #eeeeee;
					transition: all 0.2s;
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
