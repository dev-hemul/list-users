// Підключення до бази даних
import mongoose from 'mongoose';

const connectDB = async () => {
	// TODO: Нужно явно указывать имя базы данных в ссылке на подключение, иначе будет бд "test" по умолчанию
	const dbName = 'mongodb+srv://yevhen:88888888@cluster1.xm5y8.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster1';
	try {
		await mongoose.connect(dbName);
		console.log(`Connected to DB: ${dbName}`.bgGreen.black);
	} catch (err) {
		console.log(`'not connected', err`.bgYellow.red.bold);
	}
}

export default connectDB;



