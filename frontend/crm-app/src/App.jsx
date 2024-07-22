import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Pelayan from './pages/reservasi/Reservasi';
import LandingPage from './pages/LandingPage';
import Login from './pages/login/Login';
import Menu from './pages/menu/menu';
import Error from './error';


const routes = (
  <Router>
    <Routes>
      <Route path='/' exact element={<LandingPage />} />
      <Route path='/dashboard' exact element={<Home />} />
      <Route path='/login' exact element={<Login/>} />
      <Route path='/reservasi' exact element={<Pelayan />} />
      <Route path='/menu' exact element={<Menu/>} />
      <Route path='*' element={<Error />} /> 
    </Routes>
  </Router>
);

const App = () => {
  return <div>{routes}</div>
}

export default App