import React from 'react';

const Input = ({ id, label, name, value, disabled, type, onChange, register, errors }) => {
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
			<input
				id={id}
				name={name}
				defaultValue={value}
				disabled={!!disabled}
				type={type}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={onChange}
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
					padding: 6px 8px;
					transition: all 0.2s;
				}
				.active label {
					top: 0;
					font-size: 12px;
					color: #a0a0a0;
				}
				input {
					font-size: 16px;
					padding: 16px 8px 4px;
					height: 48px;
					width: 100%;
					border: 1px solid #dedede;
					border-radius: 4px;
					background: #fbfbfb;
					margin: 0 0 8px;
				}
				input:-webkit-autofill,
				input:-webkit-autofill:hover,
				input:-webkit-autofill:focus {
					animation-name: onAutoFillStart;
					transition: background-color 5000s ease-in-out 0s;
				}

				.input:not(:-webkit-autofill) {
					animation-name: onAutoFillCancel;
				}
				.error input {
					border-color: rgba(237, 67, 55, 1);
					margin: 0 0 24px;
				}
				.error label {
					color: rgba(237, 67, 55, 1);
				}
				.disabled input {
					background: #efefef;
				}
			`}</style>
		</div>
	);
};

export default Input;
