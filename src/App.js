import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Landingpage from './pages/Landingpage'
import Header from './components/Header';
import Footer from './components/Footer';
import History from './pages/History';
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
      <Route path='' element={<Landingpage></Landingpage>}></Route>
      <Route path='/home' element={ <Home></Home>}></Route>
      <Route path='/history' element={<History/>}/>
      </Routes>
     <Footer/>
     
    </div>
  );
}

export default App;
