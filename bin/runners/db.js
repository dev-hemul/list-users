// Підключення до бази даних
import mongoose from 'mongoose';

const connectDB = async () => {
	// Потрібно явно вказувати ім'я бази даних у посиланні на підключення, інакше буде бд "test" за замовчуванням
	const dbName = 'mongodb+srv://yevhen:88888888@cluster1.xm5y8.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster1';
	try {
		await mongoose.connect(dbName);
		console.log(`Connected to DB: ${dbName}`.bgGreen.black);
	} catch (err) {
		console.log(`'not connected', err`.bgYellow.red.bold);
	}
}

export default connectDB;



