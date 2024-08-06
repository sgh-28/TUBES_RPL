import React from 'react';
import Navbar from '../../components/Navbar';
import SidebarAdmin from '../../components/sidebarAdmin';

const HomeKoki = () => {
  // Example data, replace with data from your backend or state management
  const orders = [
    {
      id: 1,
      tableNo: 5,
      quantity: 3,
      items: [
        { name: "Gado-Gado", quantity: 1 },
        { name: "Es Americano", quantity: 1 },
        { name: "Pancake", quantity: 1 }
      ]
    },
    {
      id: 2,
      tableNo: 10,
      quantity: 10,
      items: [
        { name: "Gado-Gado", quantity: 1 },
        { name: "Baso Tahu", quantity: 1 },
        { name: "Es Teh Tarik", quantity: 2 },
        { name: "Es Campur", quantity: 1 },
        { name: "Tahu Goreng", quantity: 1 },
        { name: "New York Cheese Cake", quantity: 2 },
        { name: "Nasi Padang", quantity: 1 }
      ]
    },
    {
      id: 3,
      tableNo: 5,
      quantity: 3,
      items: [
        { name: "Gado-Gado", quantity: 1 },
        { name: "Es Americano", quantity: 1 },
        { name: "Pancake", quantity: 1 }
      ]
    },
    {
      id: 4,
      tableNo: 5,
      quantity: 3,
      items: [
        { name: "Gado-Gado", quantity: 1 },
        { name: "Es Americano", quantity: 1 },
        { name: "Pancake", quantity: 1 }
      ]
    },
    {
      id: 5,
      tableNo: 5,
      quantity: 3,
      items: [
        { name: "Gado-Gado", quantity: 1 },
        { name: "Es Americano", quantity: 1 },
        { name: "Pancake", quantity: 1 }
      ]
    },
    {
      id: 6,
      tableNo: 5,
      quantity: 3,
      items: [
        { name: "Gado-Gado", quantity: 1 },
        { name: "Es Americano", quantity: 1 },
        { name: "Pancake", quantity: 1 }
      ]
    },
    {
      id: 7,
      tableNo: 5,
      quantity: 3,
      items: [
        { name: "Gado-Gado", quantity: 1 },
        { name: "Es Americano", quantity: 1 },
        { name: "Pancake", quantity: 1 }
      ]
    },
    {
      id: 8,
      tableNo: 5,
      quantity: 3,
      items: [
        { name: "Gado-Gado", quantity: 1 },
        { name: "Es Americano", quantity: 1 },
        { name: "Pancake", quantity: 1 }
      ]
    },
  ];

  return (
    <div className='flex flex-col h-screen w-full'>
      <Navbar/>
      <div className='flex h-full'>
        <SidebarAdmin />
        <div className='flex flex-col w-[80%]'>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
      {/* {orders.map((order, index) => (
        <div key={index} style={{ flex: '1 0 300px', border: '1px solid #ccc', borderRadius: '8px', padding: '10px', backgroundColor: 'white' }}>
          <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>#{order.id} NO.meja: {order.tableNo}</h2>
          <p>Kuantitas: {order.quantity}</p>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>{item.quantity}x {item.name}</li>
            ))}
          </ul>
          <button style={{ backgroundColor: 'teal', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }}>
            Proses
          </button>
        </div>
      ))} */}
    </div>
    </div>
    </div>
    </div>
  );
}

export default HomeKoki;
