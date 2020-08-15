const getImage = (array, format) => {
	if (!array[0]) return;
	if (!array[0].formats || !format) return array[0].url;
	if (!array[0].formats[format]) return array[0].url;
	return array[0].formats[format].url;
};

export default getImage;
