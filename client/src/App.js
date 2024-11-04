import './App.css';
import Layout from './components/layout/layout';
import CreateUser from './components/CreateUser.jsx';
import ShowUsers from './components/ShowUsers.jsx';
import LoginPage from './components/auth/login/index';
import axios from 'axios';
import {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRoute from './components/utils/router/privateRoute.jsx';
import Home from './components/home/index';

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
				console.log('Кукі відправлені серверу')
			} catch (err) {
				console.log(err);
			}
		};
		
		fetchCookie();
	}, []);
	
	
	return (
		<Layout>
			{/*<h1 className="text-center mb-5 text-3xl">Список покупців:</h1>*/}
			<Routes>
				<Route path="/" element={<LoginPage/>}/>
				<Route element={<PrivateRoute/>}>
					<Route path="/home" element={<Home/>}/>
				</Route>
				
			</Routes>
			
			{/*<div className="flex justify-center sm:flex-col flex-wrap gap-3 md:flex-row">
				<div className="mb-10"><CreateUser/></div>
				<ShowUsers/>
			</div>*/}
		</Layout>
	);
}

export default App;
