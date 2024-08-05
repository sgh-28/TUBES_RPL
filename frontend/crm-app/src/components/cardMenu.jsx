import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function CardMenu({ activeCategory, orderList, setOrderList }) {
  const [menu, setMenu] = useState([]);
  const [quantity, setQuantity] = useState({});
  const location = useLocation();

  const getMenu = async () => {
    const response = await fetch('http://localhost:3000/api/menu');
    const data = await response.json();
    setMenu(data);
  };

  useEffect(() => {
    getMenu();
  }, []);

  const filteredMenu = menu.filter((item) => item.jenis_menu === activeCategory);

  const handleAddToOrder = (item) => {
    if (!quantity[item.id_menu] || quantity[item.id_menu] <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }
    setOrderList((prevOrderList) => [
      ...prevOrderList,
      { ...item, quantity: quantity[item.id_menu] },
    ]);
    setQuantity((prev) => ({ ...prev, [item.id_menu]: '' }));
  };

  const isAdmin = location.pathname.startsWith('/admin');

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
            {isAdmin ? (
              <>
                <Link
                  to={`/admin/menu/edit/${item.id_menu}`}
                  className='bg-gray-300 hover:bg-gray-400 px-6 py-1 text-center rounded-md transition-all duration-300'
                >
                  Edit
                </Link>
                <button className='bg-red-400 hover:bg-red-500 px-6 py-1 text-center rounded-md transition-all duration-300'>
                  Hapus
                </button>
              </>
            ) : (
              <div className='flex items-center'>
                <input
                  type='number'
                  min='1'
                  value={quantity[item.id_menu] || ''}
                  onChange={(e) =>
                    setQuantity({ ...quantity, [item.id_menu]: e.target.value })
                  }
                  className='border rounded-md p-1 w-16'
                  placeholder='Qty'
                />
                <button
                  className='bg-teal-600 hover:bg-teal-500 ml-2 px-6 py-1 text-center rounded-md transition-all duration-300'
                  onClick={() => handleAddToOrder(item)}
                >
                  Tambah
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardMenu;
