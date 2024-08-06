import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddingMenu = () => {
  const [formDataMenu, setFormDataMenu] = useState({
    nama_menu: '',
    harga_menu: 0,
    jenis_menu: '',
    status: '',
  });
  const { id } = useParams(); // Get id from route params
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/menu/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFormDataMenu({
            nama_menu: data[0].nama_menu,
            harga_menu: data[0].harga_menu,
            jenis_menu: data[0].jenis_menu,
            status: data[0].status,
          });
        })
        .catch((error) => {
          console.error('Failed to fetch menu data', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataMenu((prevState) => ({
      ...prevState,
      [name]: name === 'harga_menu' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = id ? 'PUT' : 'POST';
      const url = id
        ? `http://localhost:3000/api/menu/${id}`
        : 'http://localhost:3000/api/menu';

      const response = await fetch(url, {
        method,
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
      alert(id ? 'Menu berhasil diperbarui' : 'Menu berhasil ditambahkan');
      navigate('/admin/menu');
    } catch (error) {
      alert('Terjadi kesalahan:', error.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">
        {id ? 'Edit Menu' : 'Tambah Menu'}
      </h2>
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
          type="number"
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
            className='border border-gray-300 rounded-md p-2'>
            <option value="">Pilih Kategori</option>
            <option value="Makanan utama">Makanan Utama</option>
            <option value="Minuman">Minuman</option>
            <option value="Cemilan">Cemilan</option>
          </select>
        </div>

        <div className='flex flex-col'>
          <label className="mb-1 text-gray-700" htmlFor='status'>Status</label>
          <select
            name="status"
            value={formDataMenu.status}
            onChange={handleChange}
            className='border border-gray-300 rounded-md p-2'>
            <option value="">Pilih Status</option>
            <option value="Tersedia">Tersedia</option>
            <option value="Kosong">Kosong</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {id ? 'Perbarui' : 'Tambah'}
        </button>
      </form>
    </div>
  );
};

export default AddingMenu;
