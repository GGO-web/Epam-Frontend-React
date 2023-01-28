import { addAuthor } from './actionCreators';

export const makeAddAuthorRequest =
	(AuthorizationToken, authorName) => async (dispatch) => {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/authors/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AuthorizationToken,
			},
			body: JSON.stringify({ name: authorName }),
		});

		if (response.ok) {
			const res = await response.json();

			dispatch(addAuthor(res.result));
		}
	};
