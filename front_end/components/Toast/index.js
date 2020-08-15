import { ToastContainer, toast } from 'react-toastify';
import { MdClose } from 'react-icons/md';
import toastStyle from './style';

function Toast() {
	const CloseButton = ({ closeToast }) => (
		<button className='Toastify__close-button' onClick={closeToast}>
			<MdClose size='24px' />
			<p className='sr-only'>Fermez la notification</p>
		</button>
	);
	return (
		<div>
			<ToastContainer
				position='bottom-center'
				autoClose={3000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				pauseOnHover
				closeButton={CloseButton}
			/>
			<style global jsx>
				{toastStyle}
			</style>
		</div>
	);
}

export default Toast;
