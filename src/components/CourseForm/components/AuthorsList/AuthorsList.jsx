import React from 'react';

import PropTypes from 'prop-types';

import Button from '../../../../common/Button/Button';

const AuthorsList = ({
	authors,
	setAuthors,
	courseAuthors,
	setCourseAuthors,
}) => {
	const addAuthorHandler = (authorName) => {
		setCourseAuthors([...courseAuthors, authorName]);
		setAuthors(authors.filter((name) => name !== authorName));
	};

	return (
		<div className='course-form__item'>
			<h2 className='course-form__item-title'>Authors</h2>
			{authors.length === 0 ? (
				<p className='course-form__item-text'>Author list is empty</p>
			) : (
				<ul
					className='course-form__authors list-reset'
					data-testid='authors-list'
				>
					{authors.map((authorName, index) => {
						return (
							<li className='course-form__authors-item' key={index}>
								<span className='course-form__authors-name'>{authorName}</span>

								<Button
									className='course-form__authors-button'
									buttonText='Add author'
									onClick={() => addAuthorHandler(authorName)}
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

AuthorsList.propTypes = {
	authors: PropTypes.arrayOf(PropTypes.string).isRequired,
	setAuthors: PropTypes.func.isRequired,
	courseAuthors: PropTypes.arrayOf(PropTypes.string).isRequired,
	setCourseAuthors: PropTypes.func.isRequired,
};

export default AuthorsList;
