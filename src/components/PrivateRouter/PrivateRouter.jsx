import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';

const PrivateRouter = ({ path }) => {
	const user = useSelector((state) => state.user);
	const isAdmin = user.role === 'admin';

	return isAdmin ? <Outlet></Outlet> : <Navigate to={path}></Navigate>;
};

export default PrivateRouter;
