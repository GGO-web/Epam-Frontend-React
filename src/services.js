import { BACKEND_SERVER } from './constants';

export const gettingCourses = () => {
	return fetch(`${BACKEND_SERVER}/courses/all`)
		.then((response) => response.json())
		.then((result) => {
			return result.result;
		})
		.catch((error) => {
			console.log(error);
		});
};

export const gettingAuthors = () => {
	return fetch(`${BACKEND_SERVER}/authors/all`)
		.then((response) => response.json())
		.then((result) => {
			return result.result;
		})
		.catch((error) => {
			console.log(error);
		});
};
