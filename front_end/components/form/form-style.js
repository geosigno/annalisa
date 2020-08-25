// styles/global.js
import css from 'styled-jsx/css';
import { COLORS } from '../../constants';

const formStyle = css.global`
	.form {
		width: 100%;
		text-align: center;
		border-radius: 8px;
		padding: 64px;
		background-color: white;
		box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
	}
	.form__social {
		margin-bottom: 32px;
	}
	.form__container {
		display: flex;
		flex-direction: column;
		margin: 0 0 16px;
	}
	.form__title {
		font-size: 32px;
		margin: 0 0 32px;
	}
	.form__info {
		font-size: 14px;
		margin: 16px 0 0;
	}
	.form__info a {
		margin-left: 4px;
	}
	.form__back {
		display: block;
		font-size: 12px;
		color: white;
		text-align: center;
		margin-top: 8px;
	}
	.input__error {
		font-style: italic;
		font-size: 12px;
		text-align: left;
		color: #e8616d;
		position: absolute;
		bottom: 8px;
		margin: 0;
	}
	.input__container {
		display: flex;
		flex-direction: column;
		position: relative;
	}
	button[type='submit'] {
		display: inline-block;
		font-size: 14px;
		font-weight: 600;
		text-transform: uppercase;
		color: white;
		background-image: linear-gradient(45deg, ${COLORS.primary} 30%, #ff9472 90%);
		padding: 12px 40px;
		border-radius: 32px;
	}
	button[type='submit']:hover {
		cursor: pointer;
		background-image: linear-gradient(45deg, #f183a8 30%, #f99f83 90%);
	}
	.btn {
		display: inline-flex;
		align-items: center;
		line-height: normal;
		white-space: nowrap;
		vertical-align: middle;
		text-align: center;
		cursor: pointer;
		user-select: none;
		box-sizing: border-box;
		color: rgba(0, 0, 0, 0.7);
		padding: 8px 24px;
		border-radius: 32px;
		background: white;
		border: 2px solid rgba(0, 0, 0, 0.7);
		text-transform: uppercase;
		text-decoration: none;
		font-size: 14px;
		font-weight: 600;
	}
	.btn svg {
		margin-right: 16px;
	}
`;

export default formStyle;
