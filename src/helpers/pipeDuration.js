const pipeDuration = (duration) => {
	const hours = Math.floor(duration / 60);
	const minutes = duration - hours * 60;

	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
		2,
		'0'
	)}`;
};

export default pipeDuration;
