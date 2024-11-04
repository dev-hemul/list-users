import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	const token = localStorage.getItem('token');
	const role = localStorage.getItem('role');

	if (!token) {
		return <Navigate to="/login" />;
	}

	return (
		<Outlet />
	);
};

export default PrivateRoute;
