import FontFaceObserver from 'fontfaceobserver';

const Fonts = () => {
	const link = document.createElement('link');
	link.href = 'https://fonts.googleapis.com/css?family=Raleway:400,500,700';
	link.rel = 'stylesheet';

	document.head.appendChild(link);

	const AbrilFatface = new FontFaceObserver('Raleway');

	AbrilFatface.load().then(() => {
		document.documentElement.classList.add('raleway');
	});
};

export default Fonts;
