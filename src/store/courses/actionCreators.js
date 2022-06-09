import * as actionType from './actionTypes';

export const addNewCourse = (course) => {
	return {
		type: actionType.ADD_COURSE,
		payload: course,
	};
};

export const removeCourse = (id) => {
	return {
		type: actionType.REMOVE_COURSE,
		payload: {
			id,
		},
	};
};

export const editCourse = (course) => {
	return {
		type: actionType.EDIT_COURSE,
		payload: course,
	};
};

export const getCourses = (courses) => {
	return {
		type: actionType.GET_COURSES,
		payload: courses,
	};
};
