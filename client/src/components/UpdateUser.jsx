import React, { useState } from 'react';
import axios from 'axios';
import { BiSolidPencil } from "react-icons/bi";

const UpdateUser = ({ userId, currentName, onUserUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(currentName); // Инициализируем с текущим именем

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSaveClick = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      const response = await axios.put(`${apiUrl}/updateUser/${userId}`, { name: newName });
      if (response.status === 200) {
        onUserUpdated(userId, newName);
        setIsEditing(false); // Закрываем режим редактирования
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="flex items-center">
      {isEditing ? (
        <div className="flex flex-wrap items-center">
          <input
            type="text"
            value={newName}
            onChange={handleInputChange}
            placeholder="Введите новое имя"
            className="border border-gray-300 p-1 rounded w-full mb-5"
          />
          <div className="flex">
          <button className="border border-green-500 p-2" onClick={handleSaveClick}>Сохранить</button>
          <button className="border border-red-500 p-2 ml-2" onClick={() => setIsEditing(false)}>Отмена</button>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <span className="mr-2">{currentName}</span> {/* Имя пользователя отображается здесь */}
          <button onClick={() => setIsEditing(true)}>
            <BiSolidPencil className="size-5 mr-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
