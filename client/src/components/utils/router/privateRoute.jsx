import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = () => {
	const token = localStorage.getItem('token');

	if (!token) {
		return <Navigate to="/" />;
	}

	let role;
	try {
		const decodedToken = jwtDecode(token);
		role = decodedToken.roles[0]; // Извлекаем первую роль
	} catch (error) {
		console.error("Ошибка при декодировании токена:", error);
		return <Navigate to="/" />;
	}

	// Сохраняем роль в контексте или локальном состоянии (если нужно)
	return <Outlet context={role} />;
};

export default PrivateRoute;
