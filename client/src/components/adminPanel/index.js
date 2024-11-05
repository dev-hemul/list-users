import React, {useState} from 'react';
import axios from 'axios';

const ShowUsers = () => {
	const [data, setData] = useState([]); // Стан для зберігання користувачів
	const [loading, setLoading] = useState(false); // Стан для управління завантаженням
	const [error, setError] = useState(null); // Стан для обробки помилок
	
	const fetchData = async () => {
		setLoading(true);
		setError(null);
		
		const apiUrl = process.env.REACT_APP_API_AUTH || 'http://localhost:4000/api/auth';
		
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get(`${apiUrl}/users`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			console.log('Fetched users:', response.data); // Логируем полученные данные
			console.log('Full response:', response); // Логируем весь ответ
			
			// Проверка формата данных
			if (Array.isArray(response.data)) {
				setData(response.data);
			} else {
				console.error('Unexpected data format:', response.data);
				setError('Неожиданный формат данных');
			}
		} catch (error) {
			console.error('Error fetching users:', error);
			setError('Ошибка при загрузке пользователей');
		} finally {
			setLoading(false);
		}
	};
	
	
	return (
		<div className="flex flex-col justify-center items-center p-4">
			<button
				className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg mt-10 mb-5 transition-opacity duration-2000 transform opacity-0 animate-fade-in"
				onClick={fetchData}>Показати всіх юзерів
			</button>
			{loading && <p>Загрузка...</p>}
			{error && <p>{error}</p>}
			
			<ul className="flex flex-col flex-wrap justify-center">
				{data.map((user) => (
					<li className="mb-2" key={user._id}>
						<div
							className="flex flex-col gap-3 justify-between border border-amber-200 sm:w-full p-7 transition-opacity duration-2000 transform opacity-0 animate-fade-in bg-zinc-50">
							<span>Логін: {user.username}</span>
							<span>Роль: {user.roles.join(', ')}</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ShowUsers;