import {Router} from 'express';
// Імпорт контроллера
import * as usersController from '../../controller/users.js';
import path from 'path'; // Імпорт path для роботи зі шляхами
import axios from 'axios';

const router = Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

router.post('/createUser', async (req, res) => {
	const {name} = req.body;
	const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Отримання IP-адреси
  const userAgent = req.headers['user-agent']; // Це інформація про браузер користувача, який робить запит
  const referer=req.headers['referer'] || req.headers['referrer']; // Заголовок Referer (або Referrer) показує, з якого URL користувач перейшов на ваш сайт.
  const acceptLanguage = req.headers['accept-language']; // Цей заголовок показує, яка мова краща для користувача (наприклад, en-US або ru-RU).
	
	const getIPInfo = async (ipAddress) => {
  try {
    const response = await axios.get(`https://ipinfo.io/${ipAddress}/json?token=08e4b9cbfe36de`);
    console.log('IP Information:', response.data);
		return response.data.country;
  } catch (error) {
    console.error('Error fetching IP information:', error);
		return null;
  }
};

// Замените '8.8.8.8' на нужный IP-адрес
	const country = await getIPInfo(userIp);
	console.log(`"это идет в контроллер": ${country}`);
	
	console.log({
				name,
        userIp,
				country,
        userAgent,
        referer,
        acceptLanguage
    });
	
	await usersController.createUser(name, userIp, country, userAgent, referer, acceptLanguage);
	res.status(200).json({message: 'User created successfully', name});
});

router.get('/users', async (req, res) => {
	try {
		const users = await usersController.showUser(); // Отримуємо список користувачів
		console.log('Response data before sending:', users); // Логіруємо перед відправкою
		res.status(200).json(users); // Відправляємо користувачів клієнту
	} catch (error) {
		console.error('Error fetching users:', error);
		res.status(500).json({message: 'Error fetching users'});
	}
});

// Видалення користувача по ID
router.delete('/deleteUser/:id', async (req, res) => {
	const userId = req.params.id;
	console.log(`Отриманий на видалення користувача з ID: ${userId}`); // Логіруємо ID
	try {
		const deletedUser = await usersController.deleteUser(userId);
		console.log('Видалений користувач:', deletedUser); // Логіруємо видаленого користувача
		if (!deletedUser) {
			return res.status(404).json({message: 'Користувач не знайдений'});
		}
		res.status(200).json({
			message: 'Користувач успішно видалений',
			user: deletedUser
		});
	} catch (error) {
		console.error('Помилка при видаленні користувача:', error);
		res.status(500).json({message: 'Помилка при видаленні користувача', error});
	}
});

// Обробка PUT-запиту для оновлення користувача
router.put('/updateUser/:id', async (req, res) => {
	const userId = req.params.id; // Отримуємо ID користувача з параметрів запиту
	const {name} = req.body; // Отримуємо нове ім'я із тіла запиту
	
	try {
		// Виклик контролера для оновлення користувача
		const updatedUser = await usersController.updateUser(userId, name);
		
		if (!updatedUser) {
			return res.status(404).json({message: 'Користувача не знайдено'});
		}
		
		res.status(200).json({
			message: 'Користувача успішно оновлено',
			user: updatedUser
		});
	} catch (error) {
		console.error('Помилка при оновленні користувача:', error);
		res.status(500).json({message: 'Помилка під час оновлення користувача'});
	}
});

export default router;
