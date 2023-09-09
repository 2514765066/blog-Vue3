export const getTime = () => {
	const date = new Date();
	let hour = date.getHours();
	let minute = date.getMinutes();
	let second = date.getSeconds();

	hour = hour.toString().padStart(2, "0");
	minute = minute.toString().padStart(2, "0");
	second = second.toString().padStart(2, "0");

	return hour + ":" + minute + ":" + second;
};

export const getDate = () => {
	return new Date()
		.toLocaleDateString("zh-CN", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		})
		.replace(/\//g, "-");
};

export const getFullTime = () => getDate() + "  " + getTime();

export const getTimeInterval = (y, m, d, h, min, sec) => {
	const diff = Date.now() - new Date(y, m - 1, d, h, min, sec).getTime();
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((diff % (1000 * 60)) / 1000);	
	return `${days}天${hours}时${minutes}分${seconds}秒`;
};
