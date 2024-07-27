import React from 'react'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/sidebarAdmin'

function KaryawanAdmin() {
  return (
    <div className='flex flex-col h-screen'>
        <Navbar/>
        <div className='flex h-full'>
            <SidebarAdmin/>
            <div>
                Karyawan
            </div>
        </div>
    </div>
  )
}

export default KaryawanAdmin