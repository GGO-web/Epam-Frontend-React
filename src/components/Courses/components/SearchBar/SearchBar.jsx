import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import './SearchBar.css';

import { getCourses } from '../../../../store/courses/actionCreators';
import { gettingCourses } from '../../../../services';
import { makeGetCoursesRequest } from '../../../../store/courses/thunk';

import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

const SearchBar = ({ className }) => {
	const dispatch = useDispatch();
	const [inputValue, setInputValue] = useState('');

	const handleInput = (event) => {
		setInputValue(event.target.value);

		if (event.target.value === '') {
			dispatch(makeGetCoursesRequest());
		}

		return inputValue;
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (inputValue !== '') {
			// dispatch(makeGetCoursesRequest());

			gettingCourses().then((courses) => {
				dispatch(
					getCourses(
						[...courses].filter((course) => {
							const lowerCaseTitle = course.title.toLowerCase();
							const lowerCaseId = course.id.toLowerCase();
							const lowerCaseInput = inputValue.toLowerCase();

							return lowerCaseTitle.includes(lowerCaseInput) ||
								lowerCaseId.includes(lowerCaseInput)
								? true
								: false;
						})
					)
				);
			});
		}
	};

	return (
		<form {...{ className: className + ' searchbar' }} onSubmit={handleSubmit}>
			<Input
				placeholderText='Enter course name or id...'
				className='searchbar__input'
				onChange={handleInput}
				value={inputValue}
			></Input>

			<Button
				type='submit'
				buttonText='Search'
				className='searchbar__button'
				aria-label='Submit seact query'
			></Button>
		</form>
	);
};

SearchBar.propTypes = {
	className: PropTypes.string.isRequired,
};

export default SearchBar;
