import React, { useState } from 'react';
import axios from 'axios';
import { BiSolidPencil } from "react-icons/bi";

// Приймаємо userId та onUserUpdated як пропси для використання у компоненті
const UpdateUser = ({ userId, onUserUpdated }) => {
  const [isEditing, setIsEditing] = useState(false); // Стан редагування
  const [newName, setNewName] = useState(''); // Стан нового імені

  // Обробник введення для зміни імені
  const handleInputChange = (e) => {
    console.log('Нове ім\'я:', e.target.value); // Логуємо нове ім'я
    setNewName(e.target.value);
  };

  // Обробник збереження змін
  const handleSaveClick = async () => {
    console.log('Збереження користувача...'); // Перевіряємо чи функція викликається
    try {
			const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      const response = await axios.put(`${apiUrl}/updateUser/${userId}`, { name: newName });
      console.log('Відповідь серверу:', response); // Перевіряємо відповідь від сервера
      if (response.status === 200) {
        console.log('Користувач успішно оновленений', response.data);
        onUserUpdated(userId, newName); // Оновлюємо дані користувача на фронті
        setIsEditing(false); // Закриваємо режим редагування
      }
    } catch (error) {
      console.error('Помилка при оновленні користувача:', error);
    }
  };

  // Відображаємо різні кнопки в залежності від того, чи редагується користувач, чи ні
  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newName}
            onChange={handleInputChange} // При введенні змінюємо ім'я
            placeholder="Введіть нове ім'я"
          />
          <div className="flex gap-10 mt-5">
          <button className="border border-green-500 p-2" onClick={handleSaveClick}>Зберегти</button> {/* Кнопка для збереження змін */}
          <button className="border border-red-500 p-2" onClick={() => setIsEditing(false)}>Скасувати</button> {/* Кнопка для скасування редагування */}
          </div>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)}> {/* Кнопка для увімкнення режиму редагування */}
          <BiSolidPencil className="size-5 mr-3" />
        </button>
      )}
    </div>
  );
};

export default UpdateUser;
