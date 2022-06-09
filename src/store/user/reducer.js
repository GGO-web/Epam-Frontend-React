import * as actionType from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case actionType.IS_REGISTERED:
			return {
				...state,
				name: action.payload.name,
				email: action.payload.email,
			};
		case actionType.IS_LOGGED:
			return {
				...state,
				isAuth: true,
				token: action.payload.token,
			};
		case actionType.IS_LOGOUT:
			return {
				...state,
				isAuth: false,
				token: '',
			};
		case actionType.GET_USER:
			return {
				...state,
				isAuth: true,
				token: action.payload.token,
				name: action.payload.name || 'admin',
				email: action.payload.email,
				role: action.payload.role,
			};
		default:
			return state;
	}
};

export default userReducer;
