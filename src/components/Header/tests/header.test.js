import React from 'react';

import { Provider } from 'react-redux';

import { cleanup, render as rtlRender, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import Header from '../Header';

// mock some data for testing
const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		token: 'Test token',
	},
	courses: [],
	authors: [],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

// wrapper component to a Redux-Provider
const render = (component) => {
	rtlRender(<Provider store={mockedStore}>{component}</Provider>);
};

afterEach(cleanup);

describe('Header functions shows', () => {
	it('should have logo', () => {
		render(<Header></Header>);
		expect(screen.getByTestId('logo')).toBeInTheDocument();
	});

	it("should have user's name", () => {
		render(<Header />);

		expect(screen.getByTestId('header__login-name')).toHaveTextContent(
			'Test Name'
		);
	});
});
