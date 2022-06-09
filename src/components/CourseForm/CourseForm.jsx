import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import './CourseForm.css';

import { validateCourse } from '../../helpers/validateCourse';
import { getAuthors } from '../../store/authors/actionCreators';
import { gettingAuthors } from '../../services';
import { getAuthorsSelector } from '../../store/authors/selectors';
import { getUserSelector } from '../../store/user/selectors';
import { getCoursesSelector } from '../../store/courses/selectors';
import {
	makeAddCourseRequest,
	makeUpdateCourseRequest,
} from '../../store/courses/thunk';

import CreateAuthor from './components/CreateAuthor/CreateAuthor';
import AuthorsList from './components/AuthorsList/AuthorsList';
import Duration from './components/Duration/Duration';
import CourseAuthors from './components/CourseAuthors/CourseAuthors';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Textarea/Textarea';

const CourseForm = ({ isUpdate }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const authorsList = useSelector(getAuthorsSelector);

	const [authors, setAuthors] = useState(
		authorsList.map((author) => author.name)
	);
	const [courseAuthors, setCourseAuthors] = useState([]);

	const user = useSelector(getUserSelector);

	// get course info if press update course button
	const { courseID } = useParams();
	const coursesList = useSelector(getCoursesSelector);

	const [titleInput, setTitleInput] = useState('');
	const [descriptionInput, setDescriptionInput] = useState('');
	const [durationInput, setDurationInput] = useState('');

	const submitHandler = (event) => {
		event.preventDefault();

		const data = new FormData(event.target);

		const course = {
			title: data.get('title'),
			description: data.get('description'),
			duration: +data.get('duration'),
			authors: courseAuthors.map((authorName) => {
				return authorsList.find((author) => {
					return author.name === authorName;
				}).id;
			}),
		};

		if (validateCourse(course)) {
			setAuthors([...authors, ...courseAuthors.map((author) => author.name)]);

			if (isUpdate) {
				const courseInfo = coursesList.find((course) => {
					return course.id === courseID.substring(1);
				});

				dispatch(
					makeUpdateCourseRequest(user.token, {
						...course,
						id: courseInfo.id,
						creationDate: courseInfo.creationDate,
					})
				);
			} else dispatch(makeAddCourseRequest(user.token, course));

			navigate('/courses');
		} else alert('Please, fill in all fields');
	};

	useEffect(() => {
		gettingAuthors().then((authors) => {
			if (authorsList.length === 0) {
				dispatch(getAuthors(authors));

				setAuthors(authors.map((author) => author.name));
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	useEffect(() => {
		if (isUpdate) {
			const courseInfo = coursesList.find((course) => {
				return course.id === courseID.substring(1);
			});

			setTitleInput(courseInfo.title);
			setDescriptionInput(courseInfo.description);
			setDurationInput(courseInfo.duration);

			setAuthors(
				authorsList
					.filter((author) => {
						return !courseInfo.authors.find(
							(authorId) => author.id === authorId
						);
					})
					.map((author) => author.name)
			);

			setCourseAuthors(
				courseInfo.authors.map((authorId) => {
					return authorsList.find((author) => author.id === authorId).name;
				})
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<form
			className='course-form'
			data-testid='course-form'
			onSubmit={submitHandler}
		>
			<div className='course-top'>
				<Input
					labelText='Title'
					placeholderText='Enter title...'
					name='title'
					className='course-top__item'
					value={titleInput}
					onChange={(e) => setTitleInput(e.target.value)}
				/>
				<div className='course-top__item'>
					<Button
						buttonText={isUpdate ? 'Update course' : 'Create course'}
						className='course__create'
						type='submit'
					></Button>
				</div>
			</div>
			<Textarea
				labelText='Description'
				placeholderText='Enter description'
				name='description'
				value={descriptionInput}
				onChange={(e) => setDescriptionInput(e.target.value)}
			></Textarea>

			<div className='course-form__items'>
				<CreateAuthor {...{ authors, setAuthors }}></CreateAuthor>

				<AuthorsList
					{...{
						authors,
						setAuthors,
						courseAuthors,
						setCourseAuthors,
					}}
				></AuthorsList>

				<Duration {...{ durationInput, setDurationInput }}></Duration>

				<CourseAuthors
					{...{
						authors,
						setAuthors,
						courseAuthors,
						setCourseAuthors,
					}}
				></CourseAuthors>
			</div>
		</form>
	);
};

export default CourseForm;
