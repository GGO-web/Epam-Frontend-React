import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Header from '../Header/Header';
import { makeRegistrationRequest } from '../../store/user/thunk';

const Registration = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [registration, setRegistration] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setRegistration({
			...registration,
			[name]: value,
		});
	};

	const handleRegistration = (event) => {
		event.preventDefault();

		dispatch(makeRegistrationRequest(registration));

		navigate('/login');
	};

	return (
		<>
			<Header></Header>

			<div className='form-wrapper container'>
				<form className='form' onSubmit={handleRegistration}>
					<legend className='form__title'>Registration</legend>

					<Input
						className='form__input'
						labelText='Name'
						placeholderText='Enter name'
						name='name'
						type='text'
						value={registration.name}
						onChange={handleChange}
					></Input>

					<Input
						className='form__input'
						labelText='Email'
						placeholderText='Enter email'
						name='email'
						type='email'
						value={registration.email}
						onChange={handleChange}
					></Input>

					<Input
						className='form__input'
						labelText='Password'
						placeholderText='Enter password'
						name='password'
						type='password'
						value={registration.password}
						onChange={handleChange}
					></Input>

					<Button
						className='form__button'
						buttonText='Registration'
						type='submit'
					></Button>

					<p className='form__redirect'>
						If you have an account you can{' '}
						{
							<Link className='form__redirect-link' to='/login'>
								login
							</Link>
						}
					</p>
				</form>
			</div>
		</>
	);
};

export default Registration;
