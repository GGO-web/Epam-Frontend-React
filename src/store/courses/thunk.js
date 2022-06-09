import { BACKEND_SERVER } from '../../constants';
import { addNewCourse, getCourses, removeCourse } from './actionCreators';
import { gettingCourses } from '../../services';

export const makeRemoveCourseRequest =
	(AuthorizationToken, id) => async (dispatch) => {
		const response = await fetch(`${BACKEND_SERVER}/courses/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AuthorizationToken,
			},
		});

		if (response.ok) {
			dispatch(removeCourse(id));
		}
	};

export const makeAddCourseRequest =
	(AuthorizationToken, course) => async (dispatch) => {
		const response = await fetch(`${BACKEND_SERVER}/courses/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AuthorizationToken,
			},
			body: JSON.stringify({ ...course }),
		});

		if (response.ok) {
			const res = await response.json();

			dispatch(addNewCourse(res.result));
		}
	};

export const makeGetCoursesRequest = () => async (dispatch) => {
	gettingCourses().then((courses) => {
		dispatch(getCourses(courses));
	});
};

export const makeUpdateCourseRequest =
	(AuthorizationToken, course) => async (dispatch) => {
		const response = await fetch(`${BACKEND_SERVER}/courses/${course.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AuthorizationToken,
			},
			body: JSON.stringify({ ...course }),
		});

		if (response.ok) {
			dispatch(makeGetCoursesRequest());
		}
	};
