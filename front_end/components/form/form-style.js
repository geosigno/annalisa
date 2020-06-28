// styles/global.js
import css from 'styled-jsx/css';
import { makeStyles } from '@material-ui/core/styles';

export const formStyle = css.global`
	.fullPage {
		display: flex;
		align-items: center;
		min-height: 100vh;
		background: linear-gradient(45deg, #83a4d4, #b6fbff);
		background-size: 150% 150%;
		-webkit-animation: AnimationName 8s ease infinite;
		-moz-animation: AnimationName 8s ease infinite;
		animation: AnimationName 8s ease infinite;
	}
	@-webkit-keyframes AnimationName {
		0% {
			background-position: 0% 90%;
		}
		50% {
			background-position: 100% 11%;
		}
		100% {
			background-position: 0% 90%;
		}
	}
	@-moz-keyframes AnimationName {
		0% {
			background-position: 0% 90%;
		}
		50% {
			background-position: 100% 11%;
		}
		100% {
			background-position: 0% 90%;
		}
	}
	@keyframes AnimationName {
		0% {
			background-position: 0% 90%;
		}
		50% {
			background-position: 100% 11%;
		}
		100% {
			background-position: 0% 90%;
		}
	}
	.fullPage__left,
	.fullPage__right {
		flex: 50% 0 0;
	}
	.fullPage__left svg {
		max-height: 70vh;
	}
	.fullPage__container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		min-height: 100vh;
	}
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	textarea:-webkit-autofill,
	textarea:-webkit-autofill:hover,
	textarea:-webkit-autofill:focus,
	select:-webkit-autofill,
	select:-webkit-autofill:hover,
	select:-webkit-autofill:focus {
		transition: background-color 5000s ease-in-out 0s;
	}
	.MuiButton-label {
		position: relative;
	}
	.form__wrapper {
		max-width: 480px;
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
		margin: 0 0 32px;
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
		color: red;
		position: absolute;
		bottom: 8px;
		margin: 0;
	}
	.input__container {
		display: flex;
		flex-direction: column;
		position: relative;
	}
`;

export const formStyleUI = makeStyles({
	input: {
		marginBottom: 32
	},
	cssFocused: {
		borderColor: 'green'
	},
	btnPrimary: {
		display: 'inline',
		width: 'auto',
		background: 'linear-gradient(45deg, #f2709c 30%, #ff9472 90%)',
		borderRadius: 32,
		color: 'white',
		height: 48,
		padding: '0 64px'
	},
	btnSecondary: {
		display: 'inline',
		width: 'auto',
		background: 'linear-gradient(45deg, #c3f0dc 30%, #84e6ba 90%)',
		borderRadius: 32,
		color: 'black',
		height: 48,
		padding: '0 64px'
	},
	loader: {
		position: 'absolute',
		color: 'white',
		left: -32
	}
});

// export const theme = createMuiTheme({
// 	overrides: {
// 		MuiInput: {
// 		  underline: {
// 			"&:hover&:before": {
// 			  borderBottom: `2px solid #ff9472`
// 			},
// 			"&$focused&:after": {
// 				borderBottom: `2px solid #ff9472`
// 			}
// 			"&$focused&:after": {
// 				borderBottom: `2px solid #ff9472`
// 			}
// 		  }
// 		}
// 	  }
//   });
