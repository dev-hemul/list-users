import './App.css';
import Layout from './components/layout/layout';
import CreateUser from './components/CreateUser.jsx';
import ShowUsers from './components/ShowUsers.jsx';
import axios from 'axios';
import {useEffect} from 'react';

function App() {
	useEffect(() => {
		const fetchCookie = async () => {
			try {
				const apiCookie = process.env.REACT_APP_SEND_COOKIE || 'http://localhost:4000';
				const response = await axios.get(`${apiCookie}/get-cookie`, {withCredentials: true});
				console.log('Отриманий cookie:', JSON.stringify(response.data));
				
				await axios.post(
					`${apiCookie}/send-cookies`,
					{}, // тело запиту може бути пустим, якщо відправляються тільки файли cookie
					{withCredentials: true}
				);
				
			} catch (err) {
				console.log(err);
			}
		};
		
		fetchCookie();
	}, []);
	
	
	return (
		<Layout>
			<h1 className="text-center mb-5 text-3xl">Список покупців:</h1>
			<div
				className="flex justify-center sm:flex-col flex-wrap gap-3 md:flex-row">
				<div className="mb-10"><CreateUser/></div>
				<ShowUsers/>
			</div>
		</Layout>
	);
}

export default App;
