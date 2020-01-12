import { makeStyles } from '@material-ui/core/styles';

export const buttonStyle = makeStyles({
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
		background: 'linear-gradient(45deg, #83a4d4 30%, #b6fbff 90%)',
		borderRadius: 32,
		color: 'black',
		height: 48,
		padding: '0 64px'
	}
});
