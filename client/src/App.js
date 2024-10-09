import './App.css';
import Layout from './components/layout/layout';
import CreateUser from './components/CreateUser.jsx';
import ShowUsers from './components/ShowUsers.jsx';

function App() {
  return (
    <Layout>
    <h1 className="text-center mb-5 text-3xl">Список покупців:</h1>
      <div className="flex justify-around">
     <CreateUser />
     <ShowUsers />
      </div>
    </Layout>
  );
}

export default App;
