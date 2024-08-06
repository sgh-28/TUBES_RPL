import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddingMeja = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formDataMeja, setFormDataMeja] = useState({
        _id: 0,
        nama: '',
        status: 'kosong',
        kapasitas:0
      });
    
      const handleChange = (e) => {
        setFormDataMeja({
          ...formDataMeja,
          [e.target.name]: e.target.value,
        });
      };

      useEffect(() => {
        if (id) {
          fetch(`http://localhost:3000/api/meja/${id}`)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setFormDataMeja({
                nama: data[0].nama,
                kapasitas: data[0].kapasitas,
              });
            })
            .catch((error) => {
              console.error('Failed to fetch menu data', error);
            });
        }
      }, [id]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const method = id ? 'PUT' : 'POST';
          const url = id
            ? `http://localhost:3000/api/meja/${id}`
            : 'http://localhost:3000/api/meja';
    
          const response = await fetch(url, {
            method,
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
          alert(id ? 'Menu berhasil diperbarui' : 'Menu berhasil ditambahkan');
          navigate('/admin/meja');
        } catch (error) {
          alert('Terjadi kesalahan:', error.message);
        }
      };
    
      return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">{id ? 'Edit Meja' : 'Tambah Meja'}</h2>
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
            {/* <label className="mb-1 text-gray-700" htmlFor='status'>status</label> */}
            <input
              hidden
              name="status"
              value={formDataMeja.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          
          <div className='flex flex-col'>
            <label className="mb-1 text-gray-700" htmlFor='kapasitas'>Kapasitas</label>
            <select
              name="kapasitas"
              value={formDataMeja.kapasitas}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">Pilih Kapasitas Menu</option>
              <option value="2">2</option>
              <option value="4">4</option>
            </select>
          </div>
          <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-md">
            {id ? 'Edit Meja' : 'Tambah Meja'}
          </button>
        </form>
      </div>
      )
      
}

export default AddingMeja