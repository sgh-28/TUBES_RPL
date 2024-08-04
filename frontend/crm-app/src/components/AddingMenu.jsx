import React from 'react'

const AddingMenu = () => {
    const [formDataMenu, setFormDataMenu] = useState({
        nama_menu: '',
        harga_menu: 0,
        jenis_menu: '',
      });
    
      const handleChange = (e) => {
        setFormDataMenu({
          ...formDataMenu,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
    
          const response = await fetch('http://localhost:3000/api/menu', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataMenu),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Network response was not ok');
          }
    
          const data = await response.json();
          alert('Pegawai berhasil ditambahkan');
        } catch (error) {
          alert('Terjadi kesalahan:', error.message);
        }
      };
  return (
    <div>AddingMenu</div>
  )
}

export default AddingMenu