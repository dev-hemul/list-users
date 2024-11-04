import { Router } from 'express';
import AuthController from './../../controller/authController.js';
import {check} from 'express-validator';
import authMiddleware from './../../middlewares/authMiddleware.js';
import roleMiddleware from './../../middlewares/roleMiddleware.js';

const router = new Router();
const controller = new AuthController(); // Создаем экземпляр класса

router.post('/registration', [
	check('username', 'Ім\'я юзера ен може бути пустим').notEmpty(),
	check('password', 'Пароль не може бути менше 4 символів і більше 10').isLength({min: 4, max: 10}),
], controller.registration);
router.post('/login', controller.login);
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers);

export default router;