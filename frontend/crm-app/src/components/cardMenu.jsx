import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CardMenu({ activeCategory }) {
  const [menu, setMenu] = useState([]);

  const getMenu = async () => {
    const response = await fetch('http://localhost:3000/api/menu');
    const data = await response.json();
    setMenu(data);
  };

  useEffect(() => {
    getMenu();
  }, []);

  // Filter menu items based on the active category
  const filteredMenu = menu.filter((item) => item.jenis_menu === activeCategory);

  return (
    <div className='flex flex-col w-full h-auto'>
      {filteredMenu.map((item, index) => (
        <div className='flex justify-between border bg-white p-3' key={index}>
          <div className='flex flex-col px-4'>
            <h2 className='font-medium'>{item.id_menu}</h2>
            <h2>{item.nama_menu}</h2>
            <h2>Rp. {item.harga_menu}</h2>
          </div>
          <div className='flex flex-col gap-2'>
            <Link className='bg-gray-300 hover:bg-gray-400 px-6 py-1 text-center rounded-md transition-all duration-300'>
              Edit
            </Link>
            <button className='bg-red-400 hover:bg-red-500 px-6 py-1 text-center rounded-md transition-all duration-300'>
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardMenu;
