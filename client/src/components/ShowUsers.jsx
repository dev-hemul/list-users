import React, {useState} from 'react';
import axios from 'axios';

const ShowUsers = () => {
	const [data, setData] = useState([]); // Состояние для хранения пользователей
	const [loading, setLoading] = useState(false); // Состояние для управления загрузкой
	const [error, setError] = useState(null); // Состояние для обработки ошибок
	
	const fetchData = async () => {
		setLoading(true); // Устанавливаем состояние загрузки
		setError(null); // Сбрасываем состояние ошибки
		
		const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
		
		try {
			const response = await axios.get(`${apiUrl}/users`);
			console.log('Fetched users:', response.data); // Логируем полученные данные
			
			if (Array.isArray(response.data)) {
				setData(response.data); // Устанавливаем массив пользователей в состояние
			} else {
				console.error('Unexpected data format:', response.data); // Логируем неожиданный формат
				setError('Неожиданный формат данных'); // Устанавливаем сообщение об ошибке
			}
		} catch (error) {
			console.error('Error fetching users:', error);
			setError('Ошибка при загрузке пользователей'); // Устанавливаем сообщение об ошибке
		} finally {
			setLoading(false); // Сбрасываем состояние загрузки
		}
	};
	
	return (
		<div className="flex flex-col justify-center items-center p-4 bg-zinc-50">
			<button className="text-xl border-2 border-red-500 p-2 mb-9"
			        onClick={fetchData}>Показати всіх покупців
			</button>
			{loading && <p>Загрузка...</p>} {/* Сообщение о загрузке */}
			{error && <p>{error}</p>} {/* Сообщение об ошибке */}
			
			<ul className=" flex flex-col flex-wrap justify-center">
				{data.map((user) => (
					<li className="mb-2" key={user._id}>
						<p className="border border-amber-200 sm:w-full p-7">{user.name}</p>
					</li> // Отображаем имя пользователя
				))}
			</ul>
		
		</div>
	);
};

export default ShowUsers;
