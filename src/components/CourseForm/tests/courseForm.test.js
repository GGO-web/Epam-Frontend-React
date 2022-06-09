import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { Provider, useDispatch } from 'react-redux';

import {
	cleanup,
	fireEvent,
	render as rtlRender,
	screen,
} from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import configureStore from 'redux-mock-store';

import CourseForm from '../CourseForm';
import thunk from 'redux-thunk';

// mock some data for testing
const mockedState = {
	user: {
		isAuth: true,
		name: 'admin',
		token: 'Test token',
		role: 'admin',
	},
	courses: [],
	authors: [
		{ id: 'idOfAuthor1', name: 'author1' },
		{ id: 'idOfAuthor2', name: 'author2' },
		{ id: 'idOfAuthor3', name: 'author3' },
		{ id: 'idOfAuthor4', name: 'author4' },
	],
};

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: jest.fn(),
}));

const useDispatchMock = useDispatch;

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

describe('Course form component', () => {
	it('should show authors lists (all and course authors)', () => {
		render(<CourseForm></CourseForm>);

		expect(store.getState().authors).toHaveLength(
			screen.getByTestId('authors-list').childElementCount
		);

		expect(screen.getByText('Author list is empty')).toBeInTheDocument();
	});

	it("'Add author' button click should add an author to course authors list", () => {
		useDispatchMock.mockImplementation(() => jest.fn());

		render(<CourseForm></CourseForm>);

		fireEvent.change(screen.getByLabelText('Author name'), {
			target: { value: 'Test author' },
		});

		expect(useDispatchMock).toHaveBeenCalledTimes(3);

		fireEvent.click(screen.getByTestId('create-author__button'));

		expect(useDispatchMock).toHaveBeenCalledTimes(5);
	});

	it("'Add author' button click should add an author to course authors list", () => {
		render(<CourseForm></CourseForm>);

		fireEvent.click(screen.getByText('author1').nextElementSibling);

		expect(screen.getByTestId('course-authors')).toHaveTextContent('author1');
	});

	it("'Delete author' button click should delete an author from the course list", () => {
		render(<CourseForm></CourseForm>);

		fireEvent.click(screen.getByText('author1').nextElementSibling);
		fireEvent.click(screen.getByText('author2').nextElementSibling);

		// author2 should be present in the CourseAuthors component
		expect(screen.queryByTestId('course-authors')).toHaveTextContent('author2');

		// remove author2 from the CourseAuthors list
		fireEvent.click(screen.getByText('author2').nextElementSibling);

		// author2 should not be present in the CourseAuthors component
		expect(screen.queryByTestId('course-authors')).not.toHaveTextContent(
			'author2'
		);
	});
});
