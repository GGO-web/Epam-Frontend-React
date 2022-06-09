import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import { cleanup, render as rtlRender, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import CourseCard from '../CourseCard';

// mock some data for testing
const mockedState = {
	user: {},
	courses: [],
	authors: [
		{ id: 'idOfAuthor1', name: 'author1' },
		{ id: 'idOfAuthor2', name: 'author2' },
	],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const mockedCourseCard = {
	id: 'Test id',
	title: 'Test title',
	description: 'Test description',
	authors: ['idOfAuthor1', 'idOfAuthor2'],
	duration: 130,
	creationDate: '16/05/2022',
};

// wrapper component to a Redux-Provider
const render = (component) => {
	rtlRender(
		<MemoryRouter>
			<Provider store={mockedStore}>{component}</Provider>
		</MemoryRouter>
	);
};

afterEach(cleanup);

describe('Course card content', () => {
	it('should display title', () => {
		render(<CourseCard {...mockedCourseCard}></CourseCard>);
		expect(screen.getByText('Test title')).toBeInTheDocument();
	});

	it('should display description', () => {
		render(<CourseCard {...mockedCourseCard}></CourseCard>);
		expect(screen.getByText('Test description')).toBeInTheDocument();
	});

	it('should display duration in the correct format', () => {
		render(<CourseCard {...mockedCourseCard}></CourseCard>);
		expect(screen.getByTestId('course__duration')).toHaveTextContent('02:10');
	});

	it('should display authors list', () => {
		render(<CourseCard {...mockedCourseCard}></CourseCard>);
		expect(screen.getByTestId('course__authors')).toHaveTextContent(
			'author1, author2'
		);
	});

	it('should display created date in the correct format', () => {
		render(<CourseCard {...mockedCourseCard}></CourseCard>);
		expect(screen.getByTestId('course__creation')).toHaveTextContent(
			'16.05.2022'
		);
	});
});
