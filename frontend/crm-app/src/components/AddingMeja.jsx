import React, { useState } from 'react';

const AddingMeja = () => {
    const [formDataMeja, setFormDataMeja] = useState({
        _id: 0,
        nama: '',
        status: '',
        kapasitas:0
      });
    
      const handleChange = (e) => {
        setFormDataMeja({
          ...formDataMeja,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:3000/api/meja', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataMeja),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Network response was not ok');
          }
    
          const data = await response.json();
          alert('Meja berhasil ditambahkan');
        } catch (error) {
          alert('Terjadi kesalahan:', error.message);
        }
      };
    
      return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Tambah Meja</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div className='flex flex-col'>
            <label className="mb-1 text-gray-700" htmlFor='id'>ID</label>
            <input 
            type="text" 
            name="_id"
            placeholder='id'
            value={formDataMeja._id}
            onChange={handleChange}
            className='border border-gray-300 rounded-md p-2'/>
          </div> */}
    
          <div className='flex flex-col'>
            <label className="mb-1 text-gray-700" htmlFor='nama'>Nama</label>
            <input 
            type="text" 
            name="nama"
            placeholder='Nama'
            value={formDataMeja.nama}
            onChange={handleChange}
            className='border border-gray-300 rounded-md p-2'/>
          </div>
    
          <div className='flex flex-col'>
            <label className="mb-1 text-gray-700" htmlFor='status'>status</label>
            <select
              name="status"
              value={formDataMeja.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">Pilih Status Meja</option>
              <option value="kosong">Kosong</option>
              <option value="terisi">Terisi</option>
            </select>
          </div>
          
          <div className='flex flex-col'>
            <label className="mb-1 text-gray-700" htmlFor='kapasitas'>Kapasitas</label>
            <select
              name="kapasitas"
              value={formDataMeja.kapasitas}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">Pilih Status Menu</option>
              <option value="2">2</option>
              <option value="4">4</option>
            </select>
          </div>
          <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-md">
            Tambah Meja
          </button>
        </form>
      </div>
      )
      
}

export default AddingMeja