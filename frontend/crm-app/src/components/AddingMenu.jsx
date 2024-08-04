import React, { useState } from 'react';

const AddingMenu = () => {
    const [formDataMenu, setFormDataMenu] = useState({
        nama_menu: '',
        harga_menu: 0,
        jenis_menu: '',
        status:''
      });
    
      const handleChange = (e) => {
        setFormDataMenu({
          ...formDataMenu,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
    
          const response = await fetch('http://localhost:3000/api/menu', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataMenu),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Network response was not ok');
          }
    
          const data = await response.json();
          alert('Menu berhasil ditambahkan');
        } catch (error) {
          alert('Terjadi kesalahan:', error.message);
        }
      };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Tambah Menu</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='flex flex-col'>
          <label className="mb-1 text-gray-700" htmlFor='nama'>Nama Menu</label>
          <input 
          type="text" 
          name="nama_menu"
          placeholder='Nama Menu'
          value={formDataMenu.nama_menu}
          onChange={handleChange}
          className='border border-gray-300 rounded-md p-2'/>
        </div>

        <div className='flex flex-col'>
          <label className="mb-1 text-gray-700" htmlFor='harga'>Harga Menu</label>
          <input 
          type="text" 
          name="harga_menu"
          placeholder='Harga Menu'
          value={formDataMenu.harga_menu}
          onChange={handleChange}
          className='border border-gray-300 rounded-md p-2'/>
        </div>

        <div className='flex flex-col'>
          <label className="mb-1 text-gray-700" htmlFor='kategori'>Kategori Menu</label>
          <select
            name="jenis_menu"
            value={formDataMenu.jenis_menu}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Pilih Jenis Menu</option>
            <option value="utama">Makanan Utama</option>
            <option value="cemilan">Cemilan</option>
            <option value="minuman">Minuman</option>
          </select>
        </div>
        
        <div className='flex flex-col'>
          <label className="mb-1 text-gray-700" htmlFor='status'>Status Menu</label>
          <select
            name="status"
            value={formDataMenu.status}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Pilih Status Menu</option>
            <option value="tersedia">Tersedia</option>
            <option value="kosong">Kosong</option>
          </select>
        </div>
        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-md">
          Tambah Menu
        </button>
      </form>
    </div>
  )
}

export default AddingMenu