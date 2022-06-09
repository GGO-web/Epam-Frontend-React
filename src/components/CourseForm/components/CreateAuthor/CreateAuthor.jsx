import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import inputLengthValidator from '../../../../helpers/inputLengthValidator';
import { getUserSelector } from '../../../../store/user/selectors';
import { makeAddAuthorRequest } from '../../../../store/authors/thunk';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

const CreateAuthor = ({ authors, setAuthors }) => {
	const dispatch = useDispatch();
	const [inputAuthor, setInputAuthor] = useState('');

	const user = useSelector(getUserSelector);

	const createAuthorHandler = () => {
		if (inputLengthValidator(inputAuthor)) {
			// add name of author to the list
			setAuthors([...authors, inputAuthor]);

			dispatch(makeAddAuthorRequest(user.token, inputAuthor));

			// clear input author field
			setInputAuthor('');
		}
	};

	return (
		<div className='course-form__item'>
			<h2 className='course-form__item-title'>Add author</h2>

			<Input
				labelText='Author name'
				placeholderText='Enter author name...'
				className='course-form__item-input'
				value={inputAuthor}
				onChange={(event) => setInputAuthor(event.target.value)}
				name='author'
			></Input>

			<Button
				className='course-form__item-button'
				buttonText='Create author'
				data-testid='create-author__button'
				onClick={() => createAuthorHandler()}
				type='button'
			></Button>
		</div>
	);
};

export default CreateAuthor;
