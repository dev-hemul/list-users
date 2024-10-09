import userModel from '../model/user.js';

const createUser = async (userName) => {
  const result = await userModel.create({
    name: userName,
  });
  return result.id;
};

const showUser = async () => {
  try {
    const users = await userModel.find(); // Получаем массив пользователей
    console.log('Users from DB:', users); // Логируем пользователей для отладки
    return users; // Возвращаем массив
  } catch (error) {
    console.error('Error fetching users:', error); // Логируем ошибку
    return []; // Возвращаем пустой массив в случае ошибки
  }
};

// Заготовки для будущих функций
const updateUser = (userId) => {
  // логика обновления пользователя
};

const deleteUser = (userId) => {
  // логика удаления пользователя
};

export { createUser, showUser, updateUser, deleteUser };