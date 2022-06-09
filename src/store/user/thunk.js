import { BACKEND_SERVER } from '../../constants';
import { doLogin, doLogout, doRegistration, getUser } from './actionCreators';

export const makeLogoutRequest = (AuthorizationToken) => async (dispatch) => {
	const response = await fetch(`${BACKEND_SERVER}/logout`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: AuthorizationToken,
		},
	});

	if (response.ok) {
		dispatch(doLogout());
	}
};

export const makeGetUserRequest = (AuthorizationToken) => async (dispatch) => {
	const response = await fetch(`${BACKEND_SERVER}/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: AuthorizationToken,
		},
	});

	if (response.ok) {
		const res = await response.json();

		dispatch(getUser({ token: AuthorizationToken, ...res.result }));
	}
};

export const makeRegistrationRequest = (registration) => async (dispatch) => {
	const response = await fetch(`${BACKEND_SERVER}/register`, {
		method: 'POST',
		body: JSON.stringify(registration),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		dispatch(
			doRegistration({
				name: registration.name,
				email: registration.email,
			})
		);
	}
};

export const makeLoginRequest = (login) => async (dispatch) => {
	const response = await fetch(`${BACKEND_SERVER}/login`, {
		method: 'POST',
		body: JSON.stringify(login),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		const res = await response.json();
		const token = res.result;

		dispatch(makeGetUserRequest(token));
		dispatch(doLogin(token));
	}
};
