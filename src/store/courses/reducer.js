import * as actionType from './actionTypes';

const coursesInitialState = [];

const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case actionType.ADD_COURSE:
			return [...state, action.payload];
		case actionType.REMOVE_COURSE:
			return state.filter((course) => course.id !== action.payload.id);
		case actionType.EDIT_COURSE:
			return [...state, ...action.payload];
		case actionType.GET_COURSES:
			return [...action.payload];
		default:
			return state;
	}
};

export default coursesReducer;
