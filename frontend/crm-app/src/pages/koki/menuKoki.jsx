import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import SidebarAdmin from '../../components/sidebarAdmin';
import SidebarMenu from '../../components/sidebarMenu';
import { Link } from 'react-router-dom';
import CardMenu from '../../components/cardMenu';

function MenuKoki() {
  // State to track active category
  const [activeCategory, setActiveCategory] = useState('Makanan utama'); // Default to 'utama'

  return (
    <div className='flex flex-col h-screen w-full'>
      <Navbar />
      <div className='flex h-full'>
        <SidebarAdmin />
        <div className='flex flex-col w-[80%]'>
          <div className='flex justify-between drop-shadow-sm bg-white p-4 items-center'>
            <h2 className='text-xl font-medium'>Daftar Menu</h2>
            <input
              type='text'
              className='outline-none border text-center focus:bg-slate-100 py-2 rounded-md px-8'
              placeholder='Cari Menu'
            />
            </div>
          <div className='flex h-full'>
            <div className='flex flex-col w-1/5 bg-gray-100'>
              <SidebarMenu setActiveCategory={setActiveCategory} />
            </div>
            <div className='flex flex-col w-4/5 p-4 overflow-y-auto drop-shadow-lg'>
              <CardMenu activeCategory={activeCategory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuKoki;
