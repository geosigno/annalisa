import React from 'react';
import autosize from 'autosize';

const Textarea = ({ id, label, name, value, disabled, type, register, errors }) => {
	const handleChange = (e) => {
		autosize(e.target);
	};

	const handleFocus = (e) => {
		e.target.closest('div').classList.add('active');
	};

	const handleBlur = (e) => {
		const isFilled = !!e.target.value;
		!isFilled && e.target.closest('div').classList.remove('active');
	};

	const handleAutoFill = (e) => {
		if (e.animationName === 'onAutoFillStart') {
			e.target.closest('div').classList.add('active');
		}
	};

	const classNames = [];
	if (errors && Object.keys(errors).length > 0) classNames.push('error');
	if (value) classNames.push('active');
	if (disabled) classNames.push('disabled');

	return (
		<div className={classNames.join(' ')}>
			{label && <label htmlFor={id}>{label}</label>}
			<textarea
				id={id}
				name={name}
				defaultValue={value}
				disabled={!!disabled}
				type={type}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={handleChange}
				ref={register}
				onAnimationStart={handleAutoFill}
			/>
			<style jsx>{`
				div {
					position: relative;
				}
				label {
					position: absolute;
					top: 9px;
					pointer-events: none;
					font-size: 15px;
					color: #555;
					text-align: left;
					padding: 6px 13px;
					transition: all 0.2s;
				}
				.active label {
					top: 0;
					font-size: 12px;
					color: #a0a0a0;
				}
				textarea {
					font-size: 16px;
					padding: 22px 12px 4px;
					height: 50px;
					width: 100%;
					border: 1px solid #dedede;
					border-radius: 4px;
					background: #fbfbfb;
					margin: 0 0 8px;
				}
				.error textarea {
					border-color: rgba(237, 67, 55, 1);
					margin: 0 0 24px;
				}
				.error label {
					color: rgba(237, 67, 55, 1);
				}
				.disabled textarea {
					background: #efefef;
				}
			`}</style>
		</div>
	);
};

export default Textarea;
