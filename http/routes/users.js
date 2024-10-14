import {Router} from 'express';
// Импорт контроллера
import * as usersController from '../../controller/users.js';

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

router.post('/createUser', async (req, res) => {
	const {name} = req.body;
	console.log(name)
	await usersController.createUser(name);
	 res.status(200).json({ message: 'User created successfully', name });
})

router.get('/users', async (req, res) => {
	try {
		const users = await usersController.showUser(); // Получаем пользователей
		console.log('Response data before sending:', users); // Логируем ответ перед отправкой
		res.status(200).json(users); // Отправляем пользователей клиенту
	} catch (error) {
		console.error('Error fetching users:', error);
		res.status(500).json({message: 'Error fetching users'});
	}
})
	
	export default router;