import React from 'react'
import SidebarAdmin from '../../components/sidebarAdmin'
import Navbar from '../../components/Navbar'

const Drink = () => {
  return (
    <div className='flex flex-col h-screen'>
    <Navbar/>
    <div className='flex h-full'>
        <SidebarAdmin/>
        <div>
            Drink
        </div>
    </div>
</div>
  )
}

export default Drink