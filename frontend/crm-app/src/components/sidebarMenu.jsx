import React from 'react';

function SidebarMenu({ setActiveCategory }) {
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className='flex flex-col px-6 py-10 gap-4 mt-2'>
      <button
        className='button-primary'
        onClick={() => handleCategoryChange('Makanan utama')}
      >
        Makanan Utama
      </button>
      <button
        className='button-primary'
        onClick={() => handleCategoryChange('Cemilan')}
      >
        Cemilan
      </button>
      <button
        className='button-primary'
        onClick={() => handleCategoryChange('Minuman')}
      >
        Minuman
      </button>
    </div>
  );
}

export default SidebarMenu;
