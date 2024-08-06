import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import SidebarAdmin from '../../components/sidebarAdmin';

const HomeKoki = () => {
  const [dataPesanan, setDataPesanan] = useState([]);

  async function getPesanan(){
    const response = await fetch('http://localhost:3000/api/pesanan')

    const data = await response.json();

    const filteredData = data.filter((item)=>
      item.status == 'berlangsung'
    )
    setDataPesanan(filteredData);
  }

  async function handleChangeStatus(id){
    const choice = window.confirm('Apakah Anda Ingin Update Status Pesanan Menjadi Selesai?');
    if(!choice){
      return null
    }

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

      const data = await response.json();
      window.location.reload();
    }catch(error){
      console.log("Update Gagal", error)
    }
  }


  useEffect(()=>{
    getPesanan();
  })
  
  // const orders = [
  //   {
  //     id: 1,
  //     tableNo: 5,
  //     quantity: 3,
  //     items: [
  //       { name: "Gado-Gado", quantity: 1 },
  //       { name: "Es Americano", quantity: 1 },
  //       { name: "Pancake", quantity: 1 }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     tableNo: 10,
  //     quantity: 10,
  //     items: [
  //       { name: "Gado-Gado", quantity: 1 },
  //       { name: "Baso Tahu", quantity: 1 },
  //       { name: "Es Teh Tarik", quantity: 2 },
  //       { name: "Es Campur", quantity: 1 },
  //       { name: "Tahu Goreng", quantity: 1 },
  //       { name: "New York Cheese Cake", quantity: 2 },
  //       { name: "Nasi Padang", quantity: 1 }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     tableNo: 5,
  //     quantity: 3,
  //     items: [
  //       { name: "Gado-Gado", quantity: 1 },
  //       { name: "Es Americano", quantity: 1 },
  //       { name: "Pancake", quantity: 1 }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     tableNo: 5,
  //     quantity: 3,
  //     items: [
  //       { name: "Gado-Gado", quantity: 1 },
  //       { name: "Es Americano", quantity: 1 },
  //       { name: "Pancake", quantity: 1 }
  //     ]
  //   },
  //   {
  //     id: 5,
  //     tableNo: 5,
  //     quantity: 3,
  //     items: [
  //       { name: "Gado-Gado", quantity: 1 },
  //       { name: "Es Americano", quantity: 1 },
  //       { name: "Pancake", quantity: 1 }
  //     ]
  //   },
  //   {
  //     id: 6,
  //     tableNo: 5,
  //     quantity: 3,
  //     items: [
  //       { name: "Gado-Gado", quantity: 1 },
  //       { name: "Es Americano", quantity: 1 },
  //       { name: "Pancake", quantity: 1 }
  //     ]
  //   },
  //   {
  //     id: 7,
  //     tableNo: 5,
  //     quantity: 3,
  //     items: [
  //       { name: "Gado-Gado", quantity: 1 },
  //       { name: "Es Americano", quantity: 1 },
  //       { name: "Pancake", quantity: 1 }
  //     ]
  //   },
  //   {
  //     id: 8,
  //     tableNo: 5,
  //     quantity: 3,
  //     items: [
  //       { name: "Gado-Gado", quantity: 1 },
  //       { name: "Es Americano", quantity: 1 },
  //       { name: "Pancake", quantity: 1 }
  //     ]
  //   },
  // ];


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
