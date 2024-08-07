import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function CardMeja({query}) {
    const [meja, setMeja] = useState([]);
    const [filteredMeja, setFilteredMeja] = useState([]);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'button-alert-con ml-1',
        cancelButton: 'button-alert-can mr-1'
      },
      buttonsStyling: false
    });

    const getMeja = async () =>{
        const response = await fetch('http://localhost:3000/api/meja');

        const data = await response.json();
        setMeja(data);
    }

    const handleDelete = async (_id) => {
    swalWithBootstrapButtons.fire({
      title: `Apakah anda yakin ingin menghapus ${_id}?`,
      text: "Anda tidak bisa mengembalikannya lagi!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus ini!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3000/api/meja/${_id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            setMeja((prevMeja) => prevMeja.filter((item) => item._id !== _id));
            swalWithBootstrapButtons.fire(
              'Data Terhapus!',
              'Data meja telah dihapus.',
              'success'
            );
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Terjadi kegagalan!',
              footer: 'Gagal untuk menghapus meja'
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi kegagalan!',
            footer: 'Gagal untuk menghapus meja'
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Batal',
          'Data meja anda aman :)',
          'error'
        );
      }
    });
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