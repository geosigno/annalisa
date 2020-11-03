import FontFaceObserver from 'fontfaceobserver';

const Fonts = () => {
	const fonts = [
		'https://fonts.googleapis.com/css?family=Raleway:400,500,700',
		'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500'
	];

	fonts.forEach((font) => {
		const link = document.createElement('link');
		link.href = font;
		link.rel = 'stylesheet';
		document.head.appendChild(link);
	});

	const AbrilFatface = new FontFaceObserver('Raleway');
	const OpenSans = new FontFaceObserver('Open Sans');

	AbrilFatface.load().then(() => {
		document.documentElement.classList.add('raleway');
	});

	OpenSans.load().then(() => {
		document.documentElement.classList.add('open-sans');
	});
};

export default Fonts;
