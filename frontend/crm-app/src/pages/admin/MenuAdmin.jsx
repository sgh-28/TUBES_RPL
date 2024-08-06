import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import SidebarAdmin from '../../components/sidebarAdmin';
import SidebarMenu from '../../components/sidebarMenu';
import { Link } from 'react-router-dom';
import CardMenu from '../../components/cardMenu';

function MenuAdmin() {
  // State to track active category
  const [activeCategory, setActiveCategory] = useState('Makanan utama'); // Default to 'utama'
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log(query);
  }

  return (
    <div className='flex flex-col h-screen w-full overflow-hidden'>
      <Navbar />
      <div className='flex' style={{ height: 'calc(100vh - 60px)' }}>
        <SidebarAdmin />
        <div className='flex flex-col w-[80%]'>
          <div className='flex justify-between drop-shadow-sm bg-white p-4 items-center'>
            <h2 className='text-xl font-medium'>Daftar Menu</h2>
            <input
              type='text'
              value={query}
              onChange={handleChange}
              className='outline-none border text-center focus:bg-slate-100 py-2 rounded-md px-8'
              placeholder='Cari Menu'
            />
            <Link className='bg-teal-600 text-slate-50 px-8 py-2 rounded-md' to={'/admin/menu/add'}>
              Tambah Menu
            </Link>
          </div>
          <div className='flex' style={{ height: 'calc(100vh - 60px)' }}>
            <div className='flex flex-col w-1/5 p-4 bg-gray-100'>
              <SidebarMenu setActiveCategory={setActiveCategory} />
            </div>
            <div className='flex flex-col w-4/5 overflow-y-auto drop-shadow-lg max-h-[83vh]'>
              <CardMenu activeCategory={activeCategory} query={query}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuAdmin;
