import * as actionType from './actionTypes';

const authorsInitialState = [];

const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case actionType.ADD_AUTHOR:
			return [...state, action.payload];
		case actionType.GET_AUTHORS:
			return [...action.payload];
		default:
			return state;
	}
};

export default authorsReducer;
