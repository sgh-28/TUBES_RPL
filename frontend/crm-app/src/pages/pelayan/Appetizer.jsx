import React from 'react';
import Navbar from '../../components/Navbar';
import SidebarAdmin from '../../components/sidebarAdmin';
import RightbarPelayan from '../../components/RightbarPelayan';


const Appetizer = () => {
  const items = [
    { id: 1, name: 'Spring Rolls', imageUrl: 'path/to/spring-rolls.jpg' },
    { id: 2, name: 'Bruschetta', imageUrl: 'path/to/bruschetta.jpg' },
    { id: 3, name: 'Stuffed Mushrooms', imageUrl: 'path/to/stuffed-mushrooms.jpg' }
  ];

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className='flex h-full'>
        <SidebarAdmin />
        <div className='flex-grow p-4 overflow-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {items.map(item => (
              <div key={item.id} className='border rounded p-2 flex flex-col items-center'>
                <img src={item.imageUrl} alt={item.name} className='w-full h-32 object-cover' />
                <h3 className='mt-2'>{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
        <RightbarPelayan/>
      </div>
    </div>
  );
}

export default Appetizer;
