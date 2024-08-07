import React from 'react'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/sidebarAdmin'
import { Link } from 'react-router-dom'
import Adding from '../../components/Adding'

function TambahPegawai() {
  return (
    <div className='flex flex-col h-screen w-full'>
        <Navbar/>
        <div className='flex h-full'>
            <SidebarAdmin/>
            <div className='flex flex-col w-[80%]'>
              <Adding/>
            </div>
        </div>
    </div>
  )
}

export default TambahPegawai