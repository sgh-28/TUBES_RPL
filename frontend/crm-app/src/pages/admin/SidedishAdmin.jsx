import React from 'react'
import SidebarMenu from '../../components/sidebarMenu'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/sidebarAdmin'

const SidedishAdmin = () => {
  return (
    <div className='flex flex-col h-screen w-full'>
        <Navbar/>
        <div className='flex h-full'>
            <SidebarAdmin/>
            <div className='flex flex-col w-[80%]'>
                <div className='flex justify-between drop-shadow-sm bg-white p-4 items-center'>
                    <h2 className='text-xl font-medium'>Daftar Menu</h2>
                    <input 
                        type="text" 
                        className='outline-none border text-center focus:bg-slate-100 py-2 rounded-md px-8' 
                        placeholder='Cari Menu' 
                    />
                    <Link className='bg-teal-600 text-slate-50 px-8 py-2 rounded-md' to={'/admin/menu/add'}>Tambah Menu</Link>
                </div>
                <div className='flex flex-col p-4 overflow-y-auto h-[90vh] drop-shadow-lg'>
                  <SidebarMenu/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SidedishAdmin