import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function SidebarAdmin({ setActiveCategory }) {
  const [selectedCategory, setSelectedCategory] = useState('Makanan utama');
  const location = useLocation();
  const { logout } = useAuth();

  const getLinkClass = (path) => {
    return location.pathname === path ? 'button-primary-active' : 'button-primary';
  };

  const getParentLinkClass = (parentPath) => {
    return location.pathname.startsWith(parentPath) ? 'button-primary-active' : 'button-primary';
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Perbarui kategori aktif
    setActiveCategory(category);
  };

  const getButtonClass = (category) => {
    return selectedCategory === category ? 'button-primary-active' : 'button-primary';
  };

  const renderLinks = () => {
    if (location.pathname.startsWith('/admin')) {
      return (
        <>
          <Link className={getLinkClass('/admin/')} to="/admin/">Beranda</Link>
          <Link className={getParentLinkClass('/admin/karyawan')} to="/admin/karyawan">Manajemen Pegawai</Link>
          <Link className={getLinkClass('/admin/menu')} to="/admin/menu">Manajemen Menu</Link>
          <Link className={getLinkClass('/admin/meja')} to="/admin/meja">Manajemen Meja</Link>
        </>
      );
    } else if (location.pathname.startsWith('/pelayan')) {
      return (
        <>
          <button
            className={getButtonClass('Makanan utama')}
            onClick={() => handleCategoryChange('Makanan utama')}
          >
            Makanan Utama
          </button>
          <button
            className={getButtonClass('Cemilan')}
            onClick={() => handleCategoryChange('Cemilan')}
          >
            Cemilan
          </button>
          <button
            className={getButtonClass('Minuman')}
            onClick={() => handleCategoryChange('Minuman')}
          >
            Minuman
          </button>
        </>
      );
    } else if (location.pathname.startsWith('/kasir/')) {
      return (
        <>
          <Link className={getLinkClass('/kasir/meja1')} to="/kasir/meja1">Meja 1</Link>
        </>
      );
    } else if (location.pathname.startsWith('/koki/')){
      return(
        <>
          <Link className={getLinkClass('/koki/')} to="/koki/">Pesanan</Link>
          <Link className={getLinkClass('/koki/menu')} to="/koki/menu">Menu</Link>
        </>
      );
    }
  };

  return (
    <div className="flex flex-col w-1/5 justify-between drop-shadow-lg bg-white z-40">
      <div className='flex flex-col px-6 py-12 gap-4'> 
        {renderLinks()}
      </div>
      <div className='flex flex-col px-6 py-12'>
        <button className="button-primary text-start" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default SidebarAdmin;
