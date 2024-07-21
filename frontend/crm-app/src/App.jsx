import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Pelayan from './pages/Pelayan/Pelayan';


const routes = (
  <Router>
    <Routes>
      <Route path='/dashboard' exact element={<Home />} />
      <Route path='/pelayan' exact element={<Pelayan />} />
    </Routes>
  </Router>
);

const App = () => {
  return <div>{routes}</div>
}

export default App