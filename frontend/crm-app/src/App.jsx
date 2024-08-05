import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Pelayan from './pages/pelayan/Reservasi';
import LandingPage from './pages/LandingPage';
import Login from './pages/login/Login';
import HomeAdmin from './pages/admin/HomeAdmin';
import KaryawanAdmin from './pages/admin/KaryawanAdmin';
import MejaAdmin from './pages/admin/MejaAdmin';
import MenuAdmin from './pages/admin/MenuAdmin';
import Error from './error';
import ProtectedRoute from './components/ProtectedRoute';
import TambahPegawai from './pages/admin/TambahPegawai';
import Pembayaran from './pages/kasir/Pembayaran';
import TambahMenu from './pages/admin/TambahMenu';
import TambahMeja from './pages/admin/TambahMeja';
import HomeKoki from './pages/koki/homeKoki';
import MenuPelayan from './pages/pelayan/MenuPelayan';
import MenuKoki from './pages/koki/menuKoki';

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
          element={<ProtectedRoute allowedRoles={['pelayan']} element={<MenuPelayan />} />} 
        />
        
        <Route
          path='/admin/'
          exact
          element={<ProtectedRoute allowedRoles={['admin']} element={<HomeAdmin />} />}
        />
        <Route
          path='/admin/karyawan/'
          exact
          element={<ProtectedRoute allowedRoles={['admin']} element={<KaryawanAdmin />} />}
        />
        <Route
          path='/admin/karyawan/add'
          exact
          element={<ProtectedRoute allowedRoles={['admin']} element={<TambahPegawai />} />}
        />
        <Route 
          path='/admin/menu' 
          exact 
          element={<ProtectedRoute allowedRoles={['admin']} element={<MenuAdmin />} />} 
        />
        <Route 
          path='/admin/menu/add' 
          exact 
          element={<ProtectedRoute allowedRoles={['admin']} element={<TambahMenu />} />} 
        />
        <Route 
          path='/admin/menu/edit/:id' 
          exact 
          element={<ProtectedRoute allowedRoles={['admin']} element={<TambahMenu />} />} 
        />
        <Route 
          path='/admin/meja' 
          exact 
          element={<ProtectedRoute allowedRoles={['admin']} element={<MejaAdmin />} />} 
        />
        <Route 
          path='/admin/meja/add' 
          exact 
          element={<ProtectedRoute allowedRoles={['admin']} element={<TambahMeja />} />} 
        />

        <Route 
          path='/kasir/' 
          exact 
          element={<ProtectedRoute allowedRoles={['kasir']} element={<Pembayaran />} />} 
        />

        <Route 
          path='/koki/' 
          exact 
          element={<ProtectedRoute allowedRoles={['koki']} element={<HomeKoki />} />} 
        />
        <Route 
          path='/koki/menu' 
          exact 
          element={<ProtectedRoute allowedRoles={['koki']} element={<MenuKoki />} />} 
        />

        <Route path='*' element={<Error />} /> 
      </Routes>
    </Router>
  );
};

export default App;
