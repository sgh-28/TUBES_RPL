import React from 'react'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/sidebarAdmin'

const Pembayaran = () => {
  return (
    <div className='flex flex-col h-screen'>
        <Navbar/>
        <div className='flex h-full'>
          <SidebarAdmin/>
        </div>
    </div>
  )
}

export default Pembayaran