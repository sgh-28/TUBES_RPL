import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import SidebarAdmin from '../../components/sidebarAdmin';
import CardMenu from '../../components/cardMenu';
import RightbarPelayan from '../../components/RightbarPelayan';
// import RightbarPelayan from '../../components/rightbarPelayan';

function MenuPelayan() {
  const [activeCategory, setActiveCategory] = useState('Makanan utama');
  const [orderList, setOrderList] = useState([]);

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className='flex h-full'>
        <SidebarAdmin setActiveCategory={setActiveCategory} />
        <div className='flex-grow p-4 overflow-auto'>
          <div className='flex flex-col w-full h-full'>
            <CardMenu
              activeCategory={activeCategory}
              orderList={orderList}
              setOrderList={setOrderList}
            />
          </div>
        </div>
        <RightbarPelayan orderList={orderList} setOrderList={setOrderList} />
      </div>
    </div>
  );
}

export default MenuPelayan;
