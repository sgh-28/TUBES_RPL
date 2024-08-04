import React from 'react'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/sidebarAdmin'
import { Link } from 'react-router-dom'

function MejaAdmin() {
  return (
    <div className='flex flex-col h-screen w-full'>
        <Navbar/>
        <div className='flex h-full'>
            <SidebarAdmin/>
            <div className='flex flex-col w-[80%]'>
                <div className='flex justify-between drop-shadow-sm bg-white p-4 items-center'>
                    <h2 className='text-xl font-medium'>Penambahan Meja</h2>
                    <Link className='bg-teal-600 text-slate-50 px-8 py-2 rounded-md' to={'/admin/meja/add'}>Tambah Meja</Link>

                </div>

            </div>

        </div>

    </div>
  )
}

export default MejaAdmin