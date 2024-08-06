import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function CardMeja({query}) {
    const [meja, setMeja] = useState([]);
    const [filteredMeja, setFilteredMeja] = useState([]);

    const getMeja = async () =>{
        const response = await fetch('http://localhost:3000/api/meja');

        const data = await response.json();
        setMeja(data);
    }

    const handleDelete = async (_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus meja ini?");
        if (!confirmDelete) {
          return;
        }
    
        try {
          const response = await fetch(`http://localhost:3000/api/meja/${_id}`, {
            method: 'DELETE',
          });
          
          if (response.ok) {
            setMeja((prevMeja) => prevMeja.filter((item) => item._id !== _id));
            alert(`Anda Berhasil Menghapus Meja Dengan ID: ${_id}`);
          } else {
            console.error('Failed to delete menu item', error);
          }
        } catch (error) {
          console.error('Failed to delete menu item', error);
        }
      };

    useEffect(()=>{
        getMeja();
    },[]);

    useEffect(()=>{
        const filtered = meja.filter((item) => 
            item.nama.toLowerCase().includes(query.toLowerCase()) ||
            // item._id == query ||
            item.kapasitas == query
        );

        setFilteredMeja(filtered);
    },[meja, query]);

    

  return (
    <div className='flex flex-col w-full h-auto'>
        {filteredMeja.map((item, index)=>
            <div className='flex justify-between border bg-white p-3' key={index}>
                <div className='flex flex-col px-4'>
                    <h2 className='font-medium'>ID: {item._id}</h2>
                    <h2>{item.nama}</h2>
                    <h2>Kapasitas: {item.kapasitas} Orang</h2>
                </div>
                <div className='flex flex-col gap-2'>
                    <Link 
                        to={`/admin/meja/edit/${item._id}`}
                        className='bg-gray-300 hover:bg-gray-400 px-6 py-1 text-center rounded-md transition-all duration-300'
                    >
                        Edit
                    </Link>
                    <button 
                        onClick={()=>handleDelete(item._id)}
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

export default CardMeja