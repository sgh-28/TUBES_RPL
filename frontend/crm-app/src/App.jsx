// App.jsx
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
import Appetizer from './pages/pelayan/Appetizer';
import MainCourse from './pages/pelayan/MainCourse';
import Dessert from './pages/pelayan/Dessert';
import Drink from './pages/pelayan/Drink';
import Sidedish from './pages/pelayan/Sidedish';
import AppetizerAdmin from './pages/admin/AppetizerAdmin';
import MaincourseAdmin from './pages/admin/MaincourseAdmin';
import DessertAdmin from './pages/admin/DessertAdmin';
import DrinkAdmin from './pages/admin/DrinkAdmin';
import SidedishAdmin from './pages/admin/SidedishAdmin';
import Pembayaran from './pages/kasir/Pembayaran';

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
          path='/pelayan/appetizer' 
          exact 
          element={<ProtectedRoute allowedRoles={['pelayan']} element={<Appetizer />} />} 
        />
        <Route 
          path='/pelayan/main-course' 
          exact 
          element={<ProtectedRoute allowedRoles={['pelayan']} element={<MainCourse />} />} 
        />
        <Route 
          path='/pelayan/dessert' 
          exact 
          element={<ProtectedRoute allowedRoles={['pelayan']} element={<Dessert />} />} 
        />
         <Route 
          path='/pelayan/drink' 
          exact 
          element={<ProtectedRoute allowedRoles={['pelayan']} element={<Drink />} />} 
        />
         <Route 
          path='/pelayan/side-dish' 
          exact 
          element={<ProtectedRoute allowedRoles={['pelayan']} element={<Sidedish />} />} 
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
          path='/admin/menu/appetizer' 
          exact 
          element={<ProtectedRoute allowedRoles={['admin']} element={<AppetizerAdmin />} />} 
        />
        <Route 
          path='/admin/menu/main-course' 
          exact 
          element={<ProtectedRoute allowedRoles={['admin']} element={<MaincourseAdmin />} />} 
        />
        <Route 
          path='/admin/menu/dessert' 
          exact 
          element={<ProtectedRoute allowedRoles={['admin']} element={<DessertAdmin />} />} 
        />
        <Route 
          path='/admin/menu/drink' 
          exact 
          element={<ProtectedRoute allowedRoles={['admin']} element={<DrinkAdmin />} />} 
        />
        <Route 
          path='/admin/menu/side-dish' 
          exact 
          element={<ProtectedRoute allowedRoles={['admin']} element={<SidedishAdmin />} />} 
        />
        <Route 
          path='/admin/meja' 
          exact 
          element={<ProtectedRoute allowedRoles={['admin']} element={<MejaAdmin />} />} 
        />

        <Route 
          path='/kasir' 
          exact 
          element={<ProtectedRoute allowedRoles={['kasir']} element={<Pembayaran />} />} 
        />

        <Route path='*' element={<Error />} /> 
      </Routes>
    </Router>
  );
};

export default App;
