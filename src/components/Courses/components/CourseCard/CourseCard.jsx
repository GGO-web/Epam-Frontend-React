import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import './CourseCard.css';

import dateGenerator from '../../../../helpers/dateGenerator';
import getAuthorById from '../../../../helpers/getAuthorById';
import pipeDuration from '../../../../helpers/pipeDuration';
import { getAuthorsSelector } from '../../../../store/authors/selectors';
import { getUserSelector } from '../../../../store/user/selectors';
import {
	makeGetCoursesRequest,
	makeRemoveCourseRequest,
} from '../../../../store/courses/thunk';

import Button from '../../../../common/Button/Button';

const CourseCard = ({
	id,
	title,
	description,
	creationDate,
	duration,
	authors,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const authorsList = useSelector(getAuthorsSelector);
	const user = useSelector(getUserSelector);

	const isAdmin = user.role === 'admin';

	const courseCard = {
		id,
		title,
		description,
		authors: authors
			.map((author) => getAuthorById(authorsList, author))
			.filter((item) => item !== '')
			.join(', '),
		duration: pipeDuration(duration),
		creationDate: dateGenerator(creationDate),
	};

	const prepareCourseInfo = () => {
		dispatch(makeGetCoursesRequest());

		navigate(`/courses/:${courseCard.id}`);
	};

	const prepareRemoveCourse = () => {
		dispatch(makeRemoveCourseRequest(user.token, id));
	};

	const prepareUpdateCourse = () => {
		dispatch(makeGetCoursesRequest());

		navigate(`/courses/update/:${courseCard.id}`);
	};

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	return (
		<li className='course-list__item'>
			<div className='course-list__item-left'>
				<h2 className='course-list__item-title'>{courseCard.title}</h2>
				<p className='course-list__item-text'>{courseCard.description}</p>
			</div>

			<div className='course-list__item-right'>
				<ul className='course-list__item-details course-details list-reset'>
					<li
						className='course-details__item'
						data-testid='course__authors'
						key={1}
					>
						<strong className='course-details__item-name'>Authors: </strong>
						{courseCard.authors}
					</li>

					<li
						className='course-details__item'
						data-testid='course__duration'
						key={2}
					>
						<strong className='course-details__item-name'>Duration: </strong>
						{courseCard.duration} hours
					</li>

					<li
						className='course-details__item'
						data-testid='course__creation'
						key={3}
					>
						<strong className='course-details__item-name'>Created: </strong>
						{courseCard.creationDate}
					</li>
				</ul>

				{isAdmin ? (
					<div className='course-details__buttons'>
						<Button
							className='course-details__button'
							aria-label='Show detail info about course'
							buttonText='Show course'
							onClick={() => prepareCourseInfo()}
						></Button>

						<Button
							className='course-details__button course-details__button_icon'
							aria-label='Edit info about course'
							buttonText=''
							onClick={() => prepareUpdateCourse()}
						>
							<svg
								width='100%'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 512 512'
								fill='currentColor'
							>
								<path d='M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z' />
							</svg>
						</Button>

						<Button
							className='course-details__button course-details__button_icon'
							aria-label='Remove the course'
							buttonText=''
							onClick={() => prepareRemoveCourse()}
						>
							<svg
								width='100%'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 512 512'
								fill='currentColor'
							>
								<path d='M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z' />
							</svg>
						</Button>
					</div>
				) : (
					<div className='course-details__buttons' style={{ margin: '0 auto' }}>
						<Button
							className='course-details__button'
							aria-label='Show detail info about course'
							buttonText='Show course'
							onClick={() => prepareCourseInfo()}
						></Button>
					</div>
				)}
			</div>
		</li>
	);
};

CourseCard.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	creationDate: PropTypes.string,
	duration: PropTypes.number,
	authors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CourseCard;
