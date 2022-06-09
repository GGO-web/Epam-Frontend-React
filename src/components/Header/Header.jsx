import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import './Header.css';

import { AUTH_TOKEN } from '../../constants';
import { getUserSelector } from '../../store/user/selectors';
import { makeGetUserRequest, makeLogoutRequest } from '../../store/user/thunk';

import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';

const Header = () => {
	const dispatch = useDispatch();

	const user = useSelector(getUserSelector);

	const setLogout = () => {
		localStorage.removeItem(AUTH_TOKEN);

		dispatch(makeLogoutRequest(user.token));
	};

	useEffect(() => {
		const getUserFromStorage = () => {
			const authToken = JSON.parse(localStorage.getItem(AUTH_TOKEN));

			if (!authToken) {
				localStorage.setItem(AUTH_TOKEN, JSON.stringify(user.token));
			} else if (authToken && !user.token) {
				dispatch(makeGetUserRequest(authToken));
			}
		};

		getUserFromStorage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<header className='header'>
			<div className='header__inner container'>
				<Logo />

				{user?.token && (
					<div className='header__login'>
						<p className='header__login-name' data-testid='header__login-name'>
							{user.name}
						</p>
						<Button
							className='header__login-button'
							buttonText='Logout'
							aria-label='Sign Out Button'
							onClick={setLogout}
						></Button>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
