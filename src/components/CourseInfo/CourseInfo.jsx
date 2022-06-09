import React from 'react';

import { Link, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import './CourseInfo.css';

import dateGenerator from '../../helpers/dateGenerator';
import pipeDuration from '../../helpers/pipeDuration';
import getAuthorById from '../../helpers/getAuthorById';
import { getCoursesSelector } from '../../store/courses/selectors';
import { getAuthorsSelector } from '../../store/authors/selectors';

import Header from '../Header/Header';

const CourseInfo = () => {
	const coursesList = useSelector(getCoursesSelector);
	const authorsList = useSelector(getAuthorsSelector);

	const { courseID } = useParams();

	const courseInfo = coursesList.find((course) => {
		return course.id === courseID.substring(1);
	});

	const getAuthorsList = () => {
		return courseInfo.authors.map((authorID) => {
			const authorName = getAuthorById(authorsList, authorID);

			return (
				<span className='course-info__list-author' key={authorID}>
					{authorName}
				</span>
			);
		});
	};

	return (
		<>
			<Header></Header>

			<main className='main container'>
				<div className='course-info'>
					<Link to='/courses' className='course-info__courses'>
						Back to courses
					</Link>

					<h1 className='course-info__title'>{courseInfo.title}</h1>

					<div className='course-info__content'>
						<p className='course-info__content-left'>
							{courseInfo.description}
						</p>

						<ul className='course-info__content-right course-info__list list-reset'>
							<li className='course-info__list-item' key={1}>
								<strong>Id: </strong>
								{courseInfo.id}
							</li>

							<li className='course-info__list-item' key={2}>
								<strong>Duration: </strong>
								{pipeDuration(courseInfo.duration)} hours
							</li>

							<li className='course-info__list-item' key={3}>
								<strong>Created: </strong>
								{dateGenerator(courseInfo.creationDate)}
							</li>

							<li className='course-info__list-item' key={4}>
								<strong>Authors: </strong>
								{getAuthorsList()}
							</li>
						</ul>
					</div>
				</div>
			</main>
		</>
	);
};

export default CourseInfo;
