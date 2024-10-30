import './App.css';
import Layout from './components/layout/layout';
import CreateUser from './components/CreateUser.jsx';
import ShowUsers from './components/ShowUsers.jsx';
import axios from 'axios';

axios.get('https://evgeniiviter.site/', {
    withCredentials: true // Включите куки для кросс-доменных запросов
})
.then(response => {
    console.log(response.data); // Отобразите значение куки
})
.catch(error => {
    console.error('Error getting cookie:', error);
});


function App() {
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
