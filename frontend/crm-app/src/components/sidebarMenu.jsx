import React, { useState } from 'react';

function SidebarMenu({ setActiveCategory }) {
  // State untuk melacak kategori aktif
  const [selectedCategory, setSelectedCategory] = useState('Makanan utama');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Perbarui kategori aktif
    setActiveCategory(category);
  };

  // Fungsi untuk menentukan kelas tombol berdasarkan kategori aktif
  const getButtonClass = (category) => {
    return selectedCategory === category ? 'button-primary-active' : 'button-primary';
  };

  return (
    <div className='flex flex-col gap-4 mt-2'>
      <button
        className={getButtonClass('Makanan utama')} // Gunakan fungsi untuk menentukan kelas
        onClick={() => handleCategoryChange('Makanan utama')}
      >
        Makanan Utama
      </button>
      <button
        className={getButtonClass('Cemilan')}
        onClick={() => handleCategoryChange('Cemilan')}
      >
        Cemilan
      </button>
      <button
        className={getButtonClass('Minuman')}
        onClick={() => handleCategoryChange('Minuman')}
      >
        Minuman
      </button>
    </div>
  );
}

export default SidebarMenu;
