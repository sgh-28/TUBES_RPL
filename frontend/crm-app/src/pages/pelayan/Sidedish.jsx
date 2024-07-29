import React from 'react'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/sidebarAdmin'

const Sidedish = () => {
  return (
    <div className='flex flex-col h-screen'>
    <Navbar/>
    <div className='flex h-full'>
        <SidebarAdmin/>
        <div>
            Side dish
        </div>
    </div>
</div>
  )
}

export default Sidedish