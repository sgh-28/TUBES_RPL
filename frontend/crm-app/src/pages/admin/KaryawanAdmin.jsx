import React from 'react'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/sidebarAdmin'
import { Link } from 'react-router-dom'
import CardPegawai from '../../components/cardPegawai'

function KaryawanAdmin() {
  return (
    <div className='flex flex-col h-screen w-full'>
        <Navbar/>
        <div className='flex h-full'>
            <SidebarAdmin/>
            <div className='flex flex-col w-[80%]'>
                <div className='flex justify-between drop-shadow-sm bg-white p-4 items-center'>
                    <h2 className='text-xl font-medium'>Daftar Pegawai</h2>
                    <input 
                        type="text" 
                        className='outline-none border text-center focus:bg-slate-100 py-2 rounded-md px-8' 
                        placeholder='Cari Pegawai' 
                    />
                    <Link className='bg-teal-600 text-slate-50 px-8 py-2 rounded-md' to={'/admin/karyawan/add'}>Tambah Pegawai</Link>
                </div>
                <CardPegawai/>
            </div>
        </div>
    </div>
  )
}

export default KaryawanAdmin