import React, {useState} from 'react';
import axios from 'axios';

const ShowUsers = () => {
	const [data, setData] = useState([]); // Состояние для хранения пользователей
	const [loading, setLoading] = useState(false); // Состояние для управления загрузкой
	const [error, setError] = useState(null); // Состояние для обработки ошибок
	
	const fetchData = async () => {
		setLoading(true); // Устанавливаем состояние загрузки
		setError(null); // Сбрасываем состояние ошибки
		
		try {
			const response = await axios.get('http://157.230.115.142/api/users');
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
		<div>
			<button className="text-xl border-2 border-red-500 p-2 mb-5"
			        onClick={fetchData}>Показати всіх покупців
			</button>
			{loading && <p>Загрузка...</p>} {/* Сообщение о загрузке */}
			{error && <p>{error}</p>} {/* Сообщение об ошибке */}
			
			<ul className="list-disc">
				{data.map((user) => (
					<li key={user._id}>{user.name}</li> // Отображаем имя пользователя
				))}
			</ul>
		
		</div>
	);
};

export default ShowUsers;
