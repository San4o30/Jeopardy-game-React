import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Game from './containers/Game/Game';
import Home from './containers/Home/Home';
import Statisctic from './containers/Statistic/Statistic';

function App() {
  
    return (
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/game' element={<Game />}/>
          <Route path='/statistic' element={<Statisctic/>}/>
        </Routes>
      </Layout>
    );
  }

  export default App;
