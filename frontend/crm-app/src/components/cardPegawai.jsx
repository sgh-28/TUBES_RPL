import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function CardPegawai({query}) {
    const [pegawai, setPegawai] = useState([]);
    const [filteredKaryawan, setFilteredKaryawan] = useState([]);

    const getPegawai = async () =>{
        const response = await fetch('http://localhost:3000/api/users');

        const data = await response.json();
        setPegawai(data);
    }

    const handleDelete = async (NIP) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pegawai ini?");
        if (!confirmDelete) {
          return;
        }
    
        try {
          const response = await fetch(`http://localhost:3000/api/users/${NIP}`, {
            method: 'DELETE',
          });
          
          if (response.ok) {
            setPegawai((prevMeja) => prevMeja.filter((item) => item.NIP !== NIP));
            alert(`Anda Berhasil Menghapus Pegawai Dengan NIP: ${NIP}`);
          } else {
            console.error('Failed to delete menu item', error);
          }
        } catch (error) {
          console.error('Failed to delete menu item', error);
        }
      };

    useEffect(()=>{
        getPegawai();
    },[]);

    useEffect(()=>{
        const filteredKaryawan = () => {
            const lowerCaseQuery = query.toLowerCase();
            return pegawai.filter((item) =>
                item.NIP == query ||
                item.Nama.toLowerCase().includes(lowerCaseQuery) ||
                item.Role.toLowerCase().includes(lowerCaseQuery)
            );
          };
      
          setFilteredKaryawan(filteredKaryawan());
    },[pegawai, query]);

  return (
    <div className='flex flex-col w-full  '>
        {filteredKaryawan.map((item, index)=>
            <div className='flex justify-between border bg-white p-3' key={index}>
                <div className='flex flex-col px-4'>
                    <h2 className='font-medium'>{item.NIP}</h2>
                    <h2>{item.Nama}</h2>
                    <h2>{item.Role}</h2>
                </div>
                <div className='flex flex-col gap-2'>
                    <Link 
                        to={`/admin/karyawan/edit/${item.NIP}`}
                        className='bg-gray-300 hover:bg-gray-400 px-6 py-1 text-center rounded-md transition-all duration-300'
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(item.NIP)}
                        className='bg-red-400 hover:bg-red-500 px-6 py-1 text-center rounded-md transition-all duration-300'
                    >
                        Hapus
                    </button>
                </div>
            </div>
        )}
    </div>
  )
}

export default CardPegawai