import React from 'react'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/sidebarAdmin'

function MejaAdmin() {
  return (
    <div className='flex flex-col h-screen'>
        <Navbar/>
        <div className='flex h-full'>
            <SidebarAdmin/>
            <div>
                Meja
            </div>
        </div>
    </div>
  )
}

export default MejaAdmin