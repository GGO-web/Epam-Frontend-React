import React from 'react';

import PropTypes from 'prop-types';

import Button from '../../../../common/Button/Button';

const CourseAuthors = ({
	authors,
	setAuthors,
	courseAuthors,
	setCourseAuthors,
}) => {
	const deleteAuthorHandler = (authorName) => {
		setAuthors([...authors, authorName]);
		setCourseAuthors(courseAuthors.filter((name) => name !== authorName));
	};

	return (
		<div className='course-form__item'>
			<h2 className='course-form__item-title'>Course Authors</h2>

			{courseAuthors.length === 0 ? (
				<p className='course-form__item-text'>Author list is empty</p>
			) : (
				<ul
					className='course-form__authors list-reset'
					data-testid='course-authors'
				>
					{courseAuthors.map((authorName, index) => {
						return (
							<li className='course-form__authors-item' key={index}>
								<span className='course-form__authors-name'>{authorName}</span>
								<Button
									className='course-form__authors-button'
									buttonText='Delete author'
									onClick={() => deleteAuthorHandler(authorName)}
									type='button'
								></Button>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

CourseAuthors.propTypes = {
	authors: PropTypes.arrayOf(PropTypes.string).isRequired,
	setAuthors: PropTypes.func.isRequired,
	courseAuthors: PropTypes.arrayOf(PropTypes.string).isRequired,
	setCourseAuthors: PropTypes.func.isRequired,
};

export default CourseAuthors;
