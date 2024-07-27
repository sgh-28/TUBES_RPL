// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Pelayan from './pages/pelayan/Reservasi';
import LandingPage from './pages/LandingPage';
import Login from './pages/login/Login';
import Menu from './pages/pelayan/menu';
import HomeAdmin from './pages/admin/HomeAdmin';
import KaryawanAdmin from './pages/admin/KaryawanAdmin';
import MejaAdmin from './pages/admin/MejaAdmin';
import MenuAdmin from './pages/admin/MenuAdmin';
import Error from './error';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<LandingPage />} />
        <Route path='/dashboard' exact element={<Home />} />
        <Route path='/login' exact element={<Login />} />
        
        <Route 
          path='/pelayan/reservasi' 
          exact 
          element={<ProtectedRoute allowedRoles={['pelayan']} element={<Pelayan />} />} 
        />
        <Route 
          path='/pelayan/menu' 
          exact 
          element={<ProtectedRoute allowedRoles={['pelayan']} element={<Menu />} />} 
        />
        
        <Route 
          path='/admin/' 
          exact 
          element={<ProtectedRoute allowedRoles={['admin']} element={<HomeAdmin />} />} 
        />
        <Route 
          path='/admin/karyawan' 
          exact 
          element={<ProtectedRoute allowedRoles={['admin']} element={<KaryawanAdmin />} />} 
        />
        <Route 
          path='/admin/menu' 
          exact 
          element={<ProtectedRoute allowedRoles={['admin']} element={<MenuAdmin />} />} 
        />
        <Route 
          path='/admin/meja' 
          exact 
          element={<ProtectedRoute allowedRoles={['admin']} element={<MejaAdmin />} />} 
        />

        <Route path='*' element={<Error />} /> 
      </Routes>
    </Router>
  );
};

export default App;
