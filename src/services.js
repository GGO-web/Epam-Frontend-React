export const gettingCourses = () => {
	return fetch(`${process.env.REACT_APP_BACKEND_URL}/courses/all`)
		.then((response) => response.json())
		.then((result) => {
			return result.result;
		})
		.catch((error) => {
			console.log(error);
		});
};

export const gettingAuthors = () => {
	return fetch(`${process.env.REACT_APP_BACKEND_URL}/authors/all`)
		.then((response) => response.json())
		.then((result) => {
			return result.result;
		})
		.catch((error) => {
			console.log(error);
		});
};
