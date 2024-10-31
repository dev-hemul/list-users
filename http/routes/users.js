import {Router} from 'express';
// Імпорт контроллера
import * as usersController from '../../controller/users.js';
import path from 'path'; // Імпорт path для роботи зі шляхами
import axios from 'axios';
import Ajv from 'ajv';
import { userSchema } from '../helpers/userSchemaValidation.js';
import {fileURLToPath} from 'url';
const router = Router();
const ajv = new Ajv();
const validate = ajv.compile(userSchema);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post('/createUser', async (req, res) => {
	const {name} = req.body;
	  // Валідуємо данні
  const valid = validate(req.body);
  if (!valid) {
	  console.log(validate.errors);
    return res.status(400).json({ errors: validate.errors }); // Повертаємо помилки валідації
  }
	const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Отримання IP-адреси
  const userAgent = req.headers['user-agent']; // Це інформація про браузер користувача, який робить запит
  const referer=req.headers['referer'] || req.headers['referrer']; // Заголовок Referer (або Referrer) показує, з якого URL користувач перейшов на ваш сайт.
  const acceptLanguage = req.headers['accept-language']; // Цей заголовок показує, яка мова краща для користувача (наприклад, en-US або ru-RU).
	
	const getIPInfo = async (ipAddress) => {
  try {
    const response = await axios.get(`https://ipinfo.io/${ipAddress}/json?token=08e4b9cbfe36de`);
    console.log('IP Information:', response.data.country);
		return response.data.country;
  } catch (error) {
    console.error('Error fetching IP information:', error);
		return null;
  }
};

	const country = await getIPInfo(userIp);
	console.log(`"Це іде в контроллер": ${country}`);
	
	console.log({
				name,
        userIp,
				country,
        userAgent,
        referer,
        acceptLanguage
    });
	
	await usersController.createUser(name, userIp, country, userAgent, referer, acceptLanguage);
	res.status(200).json({message: 'Користувач успішно створений!', name});
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
	console.log(`Отриманий на видалення користувач з ID: ${userId}`); // Логіруємо ID
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
			return res.status(404).json({message: 'Користувач не знайдений'});
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
