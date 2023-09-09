export const fontCount = str => {
	let count = str.length;
	if (count > 1000) {
		count = (count / 1000).toFixed(1) + "k";
	}
	return count;
};
