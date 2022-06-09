import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import './Courses.css';

import { getAuthors } from '../../store/authors/actionCreators';
import { gettingAuthors } from '../../services';
import { getCoursesSelector } from '../../store/courses/selectors';
import { getAuthorsSelector } from '../../store/authors/selectors';
import { makeGetCoursesRequest } from '../../store/courses/thunk';

import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import Header from '../Header/Header';

const Courses = () => {
	const dispatch = useDispatch();

	const coursesList = useSelector(getCoursesSelector);
	const authorsList = useSelector(getAuthorsSelector);

	const prepareNewCourse = () => {
		dispatch(makeGetCoursesRequest());
	};

	useEffect(() => {
		// added courses & authors to the redux store when the application loads first time
		if (coursesList.length === 0) {
			dispatch(makeGetCoursesRequest());
		}

		if (authorsList.length === 0) {
			gettingAuthors().then((authors) => {
				dispatch(getAuthors(authors));
			});
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	return (
		<>
			<Header></Header>

			<main className='main container'>
				<div className='course'>
					{
						<>
							<div className='course-top'>
								<SearchBar className='course-top__item'></SearchBar>
								<div className='course-top__item'>
									<Link to='/courses/add'>
										<Button
											buttonText='Add new course'
											className='course__create'
											data-testid='course__create'
											onClick={() => prepareNewCourse()}
										></Button>
									</Link>
								</div>
							</div>

							<ul className='course-list list-reset' data-testid='course-list'>
								{coursesList.map((course) => {
									return <CourseCard {...course} key={course.id}></CourseCard>;
								})}
							</ul>
						</>
					}
				</div>
			</main>
		</>
	);
};

export default Courses;
