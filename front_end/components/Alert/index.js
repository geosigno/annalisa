import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

const Alert = (props) => {
	const { text, type } = props;
	return (
		<div className="alert">
			<div className="alert__container">
				<div className="alert__icon">
					<FontAwesomeIcon icon={faExclamation} size="2x" color="#ff6961" />
				</div>
				<div className="alert__content">
					<p>{text}</p>
				</div>
			</div>
			<style jsx>{`
				.alert {
					padding: 16px;
					background: #fff1f0;
					border-radius: 8px;
					border: 2px solid #ff6961;
					margin: 0 0 32px;
				}
				.alert__container {
					display: flex;
					align-items: center;
				}
				.alert__icon {
					padding: 0 24px 0 8px;
				}
				.alert__content p {
					color: #ff6961;
					text-align: left;
					margin: 0;
				}
			`}</style>
		</div>
	);
};

export default Alert;
