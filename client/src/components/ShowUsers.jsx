import React, { useState } from 'react';
import axios from 'axios';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

const ShowUsers = () => {
  const [data, setData] = useState([]); // Стан для зберігання користувачів
  const [loading, setLoading] = useState(false); // Стан для управління завантаженням
  const [error, setError] = useState(null); // Стан для обробки помилок
  
  const fetchData = async () => {
    setLoading(true); // Встановлюємо стан завантаження
    setError(null); // Скидаємо стан помилки

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

    try {
      const response = await axios.get(`${apiUrl}/users`);
      console.log('Fetched users:', response.data); // Логуємо отримані дані

      if (Array.isArray(response.data)) {
        setData(response.data); // Встановлюємо масив користувачів
      } else {
        console.error('Unexpected data format:', response.data); // Логуємо несподіваний формат
        setError('Неочікуваний формат данних'); // Встановлюємо повідомлення про помилку
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Помилка при завантаженні користувачів'); // Встановлюємо повідомлення про помилку
    } finally {
      setLoading(false); // Скидаємо стан завантаження
    }
  };

  // Функція оновлення списку після видалення користувача
  const handleUserDeleted = (userId) => {
    setData(data.filter(user => user._id !== userId));
  };
  
  const handleUserUpdated = (userId, newName) => {
    setData(data.map(user => user._id === userId ? { ...user, name: newName } : user));
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 bg-zinc-50">
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg mb-5 transition-opacity duration-2000 transform opacity-0 animate-fade-in"
              onClick={fetchData}>Показати всіх покупців
      </button>
      {loading && <p>Загрузка...</p>} {/* Повідомлення про завантаження */}
      {error && <p>{error}</p>} {/* Повідомлення про помилку */}
      
      <ul className="flex flex-col flex-wrap justify-center">
        {data.map((user) => (
          <li className="mb-2" key={user._id}>
            <div className="flex justify-between border border-amber-200 sm:w-full p-7 transition-opacity duration-2000 transform opacity-0 animate-fade-in">
              {/* Відображаємо компонент UpdateUser, який керує станом редагування */}
              <UpdateUser userId={user._id} currentName={user.name} onUserUpdated={handleUserUpdated} />
              {/* Ім'я користувача відображатиметься у компоненті UpdateUser */}
              <DeleteUser userId={user._id} onUserDeleted={handleUserDeleted} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowUsers;
