import FontFaceObserver from 'fontfaceobserver';

const Fonts = () => {
	const link = document.createElement('link');
	link.href = 'https://fonts.googleapis.com/css?family=Abril+Fatface:400';
	link.rel = 'stylesheet';

	document.head.appendChild(link);

	const AbrilFatface = new FontFaceObserver('Abril Fatface');

	AbrilFatface.load().then(() => {
		document.documentElement.classList.add('abril-fatface');
	});
};

export default Fonts;
