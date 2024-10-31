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
import cookie from 'cookie';

import UsersRoute from './routes/users.js';

const app = express();
app.use(morgan('combined'));

app.use(cors({
    origin: '*',
    credentials: true
}));


app.use(cookieParser());

app.use(express.json());

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

app.get('/', (req, res) => {
    const cookieValue = cookie.serialize("name", "bar", {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'none',  // Если вы используете разные источники (например, http и https)
        secure: false      // Убедитесь, что используется false, если вы работаете по http
    });

    console.log("Setting cookie:", cookieValue);
    res.setHeader("Set-Cookie", cookieValue);
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Логируем заголовки ответа
    console.log("Response Headers:", res.getHeaders());

    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});





app.use('/api', UsersRoute);

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