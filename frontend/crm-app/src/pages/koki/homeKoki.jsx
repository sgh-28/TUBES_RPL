import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import SidebarAdmin from '../../components/sidebarAdmin';
import Swal from 'sweetalert2';


const HomeKoki = () => {
  const [dataPesanan, setDataPesanan] = useState([]);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'button-alert-con ml-1',
      cancelButton: 'button-alert-can mr-1'
    },
    buttonsStyling: false
  });

  async function getPesanan(){
    const response = await fetch('http://localhost:3000/api/pesanan')

    const data = await response.json();

    const filteredData = data.filter((item)=>
      item.status == 'berlangsung'
    )
    setDataPesanan(filteredData);
  }

  async function handleChangeStatus(id){
    
    swalWithBootstrapButtons.fire({
      title: `Apakah anda yakin ingin mengkonfirmasi ${id}?`,
      text: "Anda tidak bisa mengembalikannya lagi!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, konfirmasi!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {

      try{
        const response = await fetch(`http://localhost:3000/api/pesanan/${id}`,{
          method:"PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({status:"tagihan"}),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Network response was not ok');
        }

        swalWithBootstrapButtons.fire(
          'Pesanan dikonfirmasi',
          'Pesanan telah berhasil dikonfirmasi',
          'success'
        );
        const data = await response.json();
        window.location.reload();
      }catch(error){
        console.log("Update Gagal", error)
      }
    }
  }
)}


  useEffect(()=>{
    getPesanan();
  })

  return (
    <div className='flex flex-col h-screen w-full overflow-hidden'>
      <Navbar/>
      <div className='flex' style={{ height: 'calc(100vh - 60px)' }}>
        <SidebarAdmin />
        <div className='flex flex-col w-[80%]'>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }} className='justify-center overflow-auto'>
      {dataPesanan.map((order, index) => (
        <div key={index} className='flex flex-col drop-shadow-lg bg-white rounded-lg'>
          <h2 style={{ borderBottom: '1px solid #eee'}} className='p-4'>#{order.no_pesanan} NO.meja: {order.no_meja}</h2>
          {/* <p>Kuantitas: {order.quantity}</p> */}
          <div className='flex flex-col justify-between h-full gap-4 px-6 py-4 min-w-[250px]'>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>{item.quantity}x {item.nama_menu}</li>
            ))}
          </ul>
          <button style={{ color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }}
            className='hover:bg-teal-500 bg-teal-600 transition-all duration-200'
            onClick={()=> handleChangeStatus(order.no_pesanan)}
          >
            Selesai
          </button>
          </div>
        </div>
      ))}
    </div>
    </div>
    </div>
    </div>
  );
}

export default HomeKoki;
