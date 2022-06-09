import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { makeLoginRequest } from '../../store/user/thunk';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Header from '../Header/Header';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [login, setLogin] = useState({
		email: '',
		password: '',
	});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setLogin({
			...login,
			[name]: value,
		});
	};

	const handleLogin = (event) => {
		event.preventDefault();

		dispatch(makeLoginRequest(login));

		navigate('/courses');
	};

	return (
		<>
			<Header></Header>

			<div className='form-wrapper container'>
				<form className='form' onSubmit={handleLogin}>
					<legend className='form__title'>Login</legend>

					<Input
						className='form__input'
						labelText='Email'
						placeholderText='Enter email'
						name='email'
						type='email'
						value={login.email}
						onChange={handleChange}
					></Input>

					<Input
						className='form__input'
						labelText='Password'
						placeholderText='Enter password'
						name='password'
						type='password'
						value={login.password}
						onChange={handleChange}
					></Input>

					<Button
						className='form__button'
						buttonText='Login'
						type='submit'
						data-testid='login__button'
					></Button>

					<p className='form__redirect'>
						If you have an account you can{' '}
						{
							<Link className='form__redirect-link' to='/registration'>
								Registration
							</Link>
						}
					</p>
				</form>
			</div>
		</>
	);
};

export default Login;
