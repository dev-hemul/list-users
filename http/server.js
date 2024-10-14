import express from 'express';
import path from 'path';
// Эта строка импортирует функцию fileURLToPath из модуля url, который встроен в Node.js.
import {fileURLToPath} from 'url';
// Логи для консоли при запросах
import morgan from 'morgan';
// Обработка и отображение ошибок
import createHttpError from 'http-errors';
// Раскрашивание консоли
import colors from 'colors';
// Импорт контроллера
import * as usersController from '../controller/users.js';
// Импорт CORS
import cors from 'cors';


const app = express();
app.use(morgan('combined'));

//  import.meta.url это специальная переменная в ESM, которая содержит URL текущего модуля (файла).
// fileURLToPath(import.meta.url) - конвертирует этот URL в путь файловой системы.
// В результате, __filename будет содержать полный путь к текущему файлу (где находится этот код). Это аналог старой переменной __filename в CommonJS.
const __filename = fileURLToPath(import.meta.url);

app.use(express.json());
app.use(cors({
   origin: 'http://157.230.115.142', // Явно укажите URL фронтенда
   methods: ['GET', 'POST'], // Разрешите методы GET и POST
}));

// path.dirname(__filename) извлекает директорию, в которой находится файл, из полного пути __filename
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
	
	res.sendFile(path.join(__dirname, '../client/build/static', 'index.html'));
})

app.post('/createUser', async (req, res) => {
	const {name} = req.body;
	console.log(name)
	await usersController.createUser(name);
	 res.status(200).json({ message: 'User created successfully', name });
})

app.get('/users', async (req, res) => {
  try {
    const users = await usersController.showUser(); // Получаем пользователей
    console.log('Response data before sending:', users); // Логируем ответ перед отправкой
    res.status(200).json(users); // Отправляем пользователей клиенту
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.use((req, res, next) => {
	next(createHttpError(404));
})

// error hendler - midleware для обробки помилок. Тобто спочатку вище формуємо помилку, а потім всі помилки передаються сюди
app.use((err, req, res, next) => {
	const {status = 404, message = 'Internal Server Error'} = err; // Беремо статус помилки
	console.error(status);
	console.error(message);
	
	res
		.status(status) // Встановлюємо статус відповіді
});

export default app;