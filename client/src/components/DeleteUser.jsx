import React from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost';

// Оголошуємо userId та onUserDeleted як пропси в компоненті
const DeleteUser = ({ userId, onUserDeleted }) => {
  console.log('ID користувача для видалення:', userId); // Логуємо ID користувача

  const handleDelete = async () => {
  console.log(`Відправка запиту DELETE на: http://157.230.115.142:4000/deleteUser/${userId}`); // Логуємо URL
  try {
    const response = await axios.delete(`${apiUrl}/deleteUser/${userId}`);
    if (response.status === 200) {
      console.log('Користувач успішно видалений', response.data);
      onUserDeleted(userId);
    }
  } catch (error) {
    console.error('Помилка при видаленні користувача:', error);
  }
};

  return (
    <div>
      <button onClick={handleDelete}>
        <MdDelete className="size-5 ml-3" />
      </button>
    </div>
  );
};


export default DeleteUser;
