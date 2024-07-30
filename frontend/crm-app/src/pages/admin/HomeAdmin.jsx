import React from 'react'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/sidebarAdmin'
// import SidebarAdmin from '../../components/sidebarAdmin'

function HomeAdmin() {
  return (
    <div className='flex flex-col h-screen'>
        <Navbar/>
        <div className='flex h-full'>
            <SidebarAdmin/>
            <div>
                beranda
            </div>
        </div>
    </div>
  )
}

export default HomeAdmin