import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

const handleLogin = async (e) => {
	e.preventDefault();
	try {
		const apiUrl = process.env.REACT_APP_API_AUTH || 'http://localhost:4000/api/auth';
		const response = await axios.post(`${apiUrl}/login`, {
			username,
			password,
		});
		
		const { token } = response.data;
		if (token) {
			// Сохраняем токен в localStorage
			localStorage.setItem('token', token);

			// Декодируем токен, чтобы узнать роль
			const decodedToken = jwtDecode(token);
			const role = decodedToken.roles[0]; // Извлекаем первую роль

			// Перенаправление на основе роли
			if (role === 'ADMIN') {
				navigate('/admin');
			} else {
				navigate('/home');
			}
		} else {
			console.error("Токен отсутствует в ответе");
		}
	} catch (error) {
		console.error("Ошибка при авторизации:", error);
	}
};



	return (
		<div className="p-10">
			<h1 className='text-4xl text-center p-0 mt-10 mb-20'>Сторінка авторизації</h1>
			<form className="flex flex-col items-center justify-center" onSubmit={handleLogin}>
				<p className="flex flex-col w-full max-w-[600px]">
					<label className="text-center text-2xl mb-5" htmlFor="login">Введіть логін:</label>
					<input
						className="border border-amber-300 mb-5 p-5 w-full focus:border-amber-500 focus:outline-none"
						type="text"
						name="login"
						id="login"
						placeholder="Ваш логін"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</p>
				<p className="flex flex-col w-full max-w-[600px]">
					<label className="text-center text-2xl mb-5" htmlFor="password">Уведіть пароль:</label>
					<input
						className="border border-amber-300 mb-5 p-5 w-full focus:border-amber-500 focus:outline-none"
						type="password"
						name="password"
						id="password"
						placeholder="Ваш пароль"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</p>
				
				<button type="submit" className="mt-7 p-5 border border-amber-500 text-2xl bg-amber-500 text-white rounded-lg transition-all duration-200 ease-in-out hover:bg-amber-600 hover:scale-105">Відправити</button>
			</form>
		</div>
	);
};

export default LoginPage;
