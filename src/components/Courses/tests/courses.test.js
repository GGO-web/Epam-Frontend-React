import React from 'react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';

import thunk from 'redux-thunk';

import {
	cleanup,
	fireEvent,
	render as rtlRender,
	screen,
} from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import configureStore from 'redux-mock-store';

import Courses from '../Courses';
import CourseForm from '../../CourseForm/CourseForm';

// mock some data for testing
const mockedState = {
	user: {
		isAuth: true,
		name: 'admin',
		email: 'admin@email.com',
		token: 'Test token',
		role: 'admin',
	},
	courses: [
		{
			id: 'test-id-of-the-course',
			title: 'title1',
			description: 'description1',
			creationDate: '9/3/2021',
			duration: 23,
			authors: ['idOfAuthor1', 'idOfAuthor2'],
		},
	],
	authors: [
		{ id: 'idOfAuthor1', name: 'author1' },
		{ id: 'idOfAuthor2', name: 'author2' },
	],
};

const mockStore = configureStore([thunk]);
const store = mockStore(mockedState);

// wrapper component to a Redux-Provider
const render = (ui, { actions = [], route = '/' } = {}) => {
	actions.forEach((action) => store.dispatch(action));

	return {
		...rtlRender(
			<MemoryRouter initialEntries={[route]}>
				<Provider store={store}>{ui}</Provider>
			</MemoryRouter>
		),
		store,
	};
};

afterEach(cleanup);

describe('Courses component', () => {
	it('should display amount of CourseCard equal length of courses array', () => {
		render(<Courses></Courses>);

		expect(store.getState().courses).toHaveLength(
			screen.getByTestId('course-list').childElementCount
		);
	});

	test("CourseForm should be showed after a click on a button 'Add new course'", async () => {
		const { getByTestId } = render(
			<Routes>
				<Route path='/courses' element={<Courses></Courses>}></Route>
				<Route path='/courses/add' element={<CourseForm></CourseForm>}></Route>
			</Routes>,
			{ route: '/courses' }
		);

		fireEvent.click(getByTestId('course__create'));

		expect(screen.getByTestId('course-form')).toBeInTheDocument();
		expect(screen.queryByTestId('course__create')).not.toBeInTheDocument();
	});
});
