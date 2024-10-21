import React, { useState } from 'react';
import axios from 'axios';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

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
        setData(response.data); // Устанавливаем массив пользователей
      } else {
        console.error('Unexpected data format:', response.data); // Логируем неожиданный формат
        setError('Непредвиденный формат данных'); // Устанавливаем сообщение об ошибке
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Ошибка при загрузке пользователей'); // Устанавливаем сообщение об ошибке
    } finally {
      setLoading(false); // Сбрасываем состояние загрузки
    }
  };

  // Функция обновления списка после удаления пользователя
  const handleUserDeleted = (userId) => {
    setData(data.filter(user => user._id !== userId));
  };
  
  const handleUserUpdated = (userId, newName) => {
    setData(data.map(user => user._id === userId ? { ...user, name: newName } : user));
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 bg-zinc-50">
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg mb-5 transition-opacity duration-2000 transform opacity-0 animate-fade-in"
              onClick={fetchData}>Показать всех пользователей
      </button>
      {loading && <p>Загрузка...</p>} {/* Сообщение о загрузке */}
      {error && <p>{error}</p>} {/* Сообщение об ошибке */}
      
      <ul className="flex flex-col flex-wrap justify-center">
        {data.map((user) => (
          <li className="mb-2" key={user._id}>
            <div className="flex justify-between border border-amber-200 sm:w-full p-7 transition-opacity duration-2000 transform opacity-0 animate-fade-in">
              {/* Отображаем компонент UpdateUser, который управляет состоянием редактирования */}
              <UpdateUser userId={user._id} currentName={user.name} onUserUpdated={handleUserUpdated} />
              {/* Имя пользователя будет отображаться в компоненте UpdateUser */}
              <DeleteUser userId={user._id} onUserDeleted={handleUserDeleted} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowUsers;
