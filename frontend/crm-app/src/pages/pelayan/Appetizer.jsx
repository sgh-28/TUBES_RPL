import React from 'react'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/sidebarAdmin'

const Appetizer = () => {
  return (
    <div className='flex flex-col h-screen'>
        <Navbar/>
        <div className='flex h-full'>
            <SidebarAdmin/>
            <div>
                Appetizer
            </div>
        </div>
    </div>
  )
}

export default Appetizer