import * as actionType from './actionTypes';

export const addAuthor = (author) => {
	return {
		type: actionType.ADD_AUTHOR,
		payload: author,
	};
};

export const getAuthors = (authors) => {
	return {
		type: actionType.GET_AUTHORS,
		payload: authors,
	};
};
