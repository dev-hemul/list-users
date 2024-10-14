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
// Импорт CORS
import cors from 'cors';
import UsersRoute from './routes/users.js';


const app = express();
app.use(morgan('combined'));

app.use(cors({
  origin: '*'
}));
app.use(express.json());

//  import.meta.url это специальная переменная в ESM, которая содержит URL текущего модуля (файла).
// fileURLToPath(import.meta.url) - конвертирует этот URL в путь файловой системы.
// В результате, __filename будет содержать полный путь к текущему файлу (где находится этот код). Это аналог старой переменной __filename в CommonJS.
const __filename = fileURLToPath(import.meta.url);

// path.dirname(__filename) извлекает директорию, в которой находится файл, из полного пути __filename
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api', UsersRoute);

app.use((req, res, next) => {
	next(createHttpError(404));
})

// error hendler - midleware для обробки помилок. Тобто спочатку вище формуємо помилку, а потім всі помилки передаються сюди
app.use((err, req, res, next) => {
	const {status = 404, message = 'Internal Server Error'} = err; // Беремо статус помилки
	console.error(status);
	console.error(message);
	
	res.status(status).json({ error: message }); // Возврат сообщения об ошибке в формате JSON
});

export default app;