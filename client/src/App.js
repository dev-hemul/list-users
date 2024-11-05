import './App.css';
import Layout from './components/layout/layout';
import LoginPage from './components/auth/login/index';
import axios from 'axios';
import {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRoute from './components/utils/router/privateRoute.jsx';
import Home from './components/home/index.js';
import AdminPanel from './components/adminPanel/index.js';

function App() {
	useEffect(() => {
		const fetchCookie = async () => {
			try {
				const apiCookie = process.env.REACT_APP_SEND_COOKIE || 'http://localhost:4000';
				const response = await axios.get(`${apiCookie}/get-cookie`, {withCredentials: true});
				console.log('Отриманий cookie:', JSON.stringify(response.data));
				
				await axios.post(
					`${apiCookie}/send-cookies`,
					{},
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
			<Routes>
				<Route path="/" element={<LoginPage/>}/>
				<Route path="/home" element={<Home/>}/>
				<Route element={<PrivateRoute/>}>
					<Route path="/admin" element={<AdminPanel/>}/>
				</Route>
			</Routes>
		
		</Layout>
	);
}

export default App;
