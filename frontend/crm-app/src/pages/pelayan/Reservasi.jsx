import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Meja from '../../components/meja'
import DetailMeja from '../../components/detailMeja'
import { MejaProvider } from './MejaProvider'

const Pelayan = () => {

  return (
    <MejaProvider>
      <div className='w-full h-screen overflow-hidden'>
        <Navbar />
        <div className='w-full flex h-full'>
          <div className='w-full border overflow-auto' style={{ height: 'calc(100vh - 60px)' }}>
              <Meja/>
          </div>
          <div className='w-full border'>
              <DetailMeja/>
          </div>
        </div>
      </div>
    </MejaProvider>
  )
}

export default Pelayan