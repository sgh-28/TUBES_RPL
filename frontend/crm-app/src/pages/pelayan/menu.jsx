import React from 'react'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/sidebarAdmin'


function Menu() {
  return (
    <div className='w-full h-screen overflow-hidden flex flex-col'>
        <Navbar />
        <div className='flex h-full'>
            <SidebarAdmin/>
            <div>
                Beranda
            </div>
        </div>
    </div>
  )
}

export default Menu