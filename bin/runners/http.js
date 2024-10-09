// Імпорт налаштувань для підняття серверу
import http from 'http'; // Навіщо імпортувати модуль http і робити обгортку, якщо користуємось express.js?
import server from "../../http/server.js";

export default function startServer() {
	const httpServer = http.createServer(server);
	const PORT = process.env.PORT || 4000;
	
	httpServer.listen(PORT, () => {
		try {
		console.log(`HTTP Server is running on port ${PORT}`.bgGreen.black);
		}catch (err) {
			console.log('HTTP Server is not started!'.bgYellow.red.bold)
		}
		
	});
}


