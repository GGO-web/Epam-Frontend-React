import { cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import coursesReducer from '../courses/reducer';

import * as actionTypes from '../courses/actionTypes';
import { mockedCoursesList } from '../../constants';

afterEach(cleanup);

describe('Reducer testing', () => {
	it('should return the initial state', () => {
		expect(coursesReducer(undefined, {})).toEqual([]);
	});

	it('should handle ADD_COURSE and returns new state', () => {
		expect(
			coursesReducer([mockedCoursesList[0]], {
				type: actionTypes.ADD_COURSE,
				payload: mockedCoursesList[1],
			})
		).toEqual([mockedCoursesList[0], mockedCoursesList[1]]);
	});

	it('should handle GET_COURSES and returns new state', () => {
		expect(
			coursesReducer(
				[
					{
						id: 'test id#2',
						title: 'Angular',
						description: `description 2`,
						creationDate: '23/6/2021',
						duration: 123,
						authors: ['authorId1', 'authorId2'],
					},
				],
				{
					type: actionTypes.GET_COURSES,
					payload: mockedCoursesList,
				}
			)
		).toStrictEqual(mockedCoursesList);
	});
});
