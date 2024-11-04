import express from 'express';
import path from 'path';
// Цей рядок імпортує функцію fileURLToPath із модуля url, вбудованого в Node.js.
import {fileURLToPath} from 'url';
// Лог для консолі при запитах
import morgan from 'morgan';
// Обробка та відображення помилок
import createHttpError from 'http-errors';
// Розфарбовування консолі
import colors from 'colors';
// Імпорт CORS
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {v4 as uuidv4} from 'uuid';
import UsersRoute from './routes/users.js';
import AuthRouter from './routes/authRouter.js';

const app = express();
app.use(morgan('combined'));

app.use(cookieParser());

app.use(cors({
	origin: ['http://localhost:3000', 'https://evgeniiviter.site/'],
	credentials: true
}));

app.use(express.json());
app.use('/api', UsersRoute);
app.use('/api/auth', AuthRouter);

// import.meta.url це спеціальна змінна ESM, яка містить URL поточного модуля (файлу).
// fileURLToPath(import.meta.url) - конвертує цей URL шлях файлової системи.
// В результаті __filename буде містити повний шлях до поточного файлу (де знаходиться цей код). Це аналог старої змінної __filename в CommonJS.
const __filename = fileURLToPath(import.meta.url);

// path.dirname(__filename) отримує директорію, в якій знаходиться файл, з повного шляху __filename
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
	console.log(`Request to ${req.path}`);
	next();
});

app.get('/get-cookie', (req, res) => {
    const uniqueId = uuidv4();
    res.cookie('ID', uniqueId); // Встановлення cookie
    console.log(`Згенерований cookie: ${uniqueId}`); // Виводимо cookie в консоль серверу
    res.send({ ID: uniqueId });
});

app.post('/send-cookies', (req, res) => {
  console.log('Отриманий cookie:', req.cookies); // Логіруємо cookies на сервері
  res.send(`Кукі сервером отримані: ${JSON.stringify(req.cookies)}`); // Отправляем ответ клиенту
});


app.use((req, res, next) => {
	next(createHttpError(404));
})

// error hendler - midleware для обробки помилок. Тобто спочатку вище формуємо помилку, а потім всі помилки передаються сюди
app.use((err, req, res, next) => {
	const {status = 404, message = 'Internal Server Error'} = err; // Беремо статус помилки
	console.error(status);
	console.error(message);
	res.sendFile(path.join(__dirname, './public/404.html'));
});

export default app;