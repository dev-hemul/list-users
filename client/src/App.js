import React, { useEffect } from 'react'; // Импортируйте React и useEffect
import './App.css';
import Layout from './components/layout/layout';
import CreateUser from './components/CreateUser.jsx';
import ShowUsers from './components/ShowUsers.jsx';
import axios from 'axios';

function App() {
    useEffect(() => {
        const fetchCookies = async () => {
            try {
                // Установка куки
                await axios.get('https://evgeniiviter.site/api/set-cookie', {
                    withCredentials: true // Включите куки для кросс-доменных запросов
                });
                
                // Получение куки
                const response = await axios.get('https://evgeniiviter.site/api/get-cookie', {
                    withCredentials: true // Включите куки для кросс-доменных запросов
                });
                console.log(response.data); // Отобразите значение куки
            } catch (error) {
                console.error('Error fetching cookies:', error);
            }
        };

        fetchCookies(); // Вызовите асинхронную функцию
    }, []); // Пустой массив зависимостей для вызова при монтировании

    return (
        <Layout>
            <h1 className="text-center mb-5 text-3xl">Список покупців:</h1>
            <div className="flex justify-center sm:flex-col flex-wrap gap-3 md:flex-row">
                <div className="mb-10"><CreateUser /></div>
                <ShowUsers />
            </div>
        </Layout>
    );
}

export default App;
