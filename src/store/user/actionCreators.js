import * as actionType from './actionTypes';

export const doRegistration = (user) => {
	return {
		type: actionType.IS_REGISTERED,
		payload: user,
	};
};

export const doLogin = (token) => {
	return {
		type: actionType.IS_LOGGED,
		payload: {
			token,
		},
	};
};

export const doLogout = () => ({
	type: actionType.IS_LOGOUT,
});

export const getUser = (user) => ({
	type: actionType.GET_USER,
	payload: user,
});
