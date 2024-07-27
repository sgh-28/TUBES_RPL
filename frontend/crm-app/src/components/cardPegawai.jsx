import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function CardPegawai() {
    const [pegawai, setPegawai] = useState([]);

    const getPegawai = async () =>{
        const response = await fetch('http://localhost:3000/api/users');

        const data = await response.json();
        setPegawai(data);
    }

    useEffect(()=>{
        getPegawai();
    },[]);

  return (
    <div className='flex flex-col w-full h-auto'>
        {pegawai.map((item, index)=>
            <div className='flex justify-between border bg-white p-3' key={index}>
                <div className='flex flex-col px-4'>
                    <h2 className='font-medium'>{item.NIP}</h2>
                    <h2>{item.Nama}</h2>
                    <h2>{item.Role}</h2>
                </div>
                <div className='flex flex-col gap-2'>
                    <Link 
                        className='bg-gray-300 hover:bg-gray-400 px-6 py-1 text-center rounded-md transition-all duration-300'
                    >
                        Edit
                    </Link>
                    <button 
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