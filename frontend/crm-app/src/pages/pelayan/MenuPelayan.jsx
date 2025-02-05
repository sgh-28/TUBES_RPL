import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import SidebarAdmin from '../../components/sidebarAdmin';
import CardMenu from '../../components/cardMenu';
import RightbarPelayan from '../../components/RightbarPelayan';
import { MejaProvider } from './MejaProvider';
import { json } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
// import RightbarPelayan from '../../components/rightbarPelayan';

function MenuPelayan() {
  const [activeCategory, setActiveCategory] = useState('Makanan utama');
  const [orderList, setOrderList] = useState([]);
  const [id_menu, setIdMenu] = useState("");
  const token = localStorage.getItem('token');

  const user = jwtDecode(token);

  const getIdMeja = () => {
    const data =  localStorage.getItem("id_menu");
    setIdMenu(data);
  }

  useEffect(()=>{
    getIdMeja();
  },[])

  return (

    <div className='flex flex-col h-screen overflow-hidden'>
      <Navbar />
      <div className='flex' style={{ height: 'calc(100vh - 60px)' }}>
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
        <RightbarPelayan orderList={orderList} setOrderList={setOrderList} selectedMeja={id_menu} pelayanNIP={user.NIP}/>
      </div>
    </div>
  );
}

export default MenuPelayan;
