import React, { useState, useEffect } from 'react';
import { useMeja } from '../pages/pelayan/MejaProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RightbarPelayan = ({ orderList, setOrderList, pelayanNIP, selectedMeja}) => {
  const navigate = useNavigate();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'button-alert-con ml-1',
      cancelButton: 'button-alert-can mr-1'
    },
    buttonsStyling: false
  });

  const handleRemoveOrder = (index) => {
    setOrderList((prevOrderList) => prevOrderList.filter((_, i) => i !== index));
  };

  const handleConfirmOrder = async () => {
    try {
      console.log(orderList, selectedMeja, pelayanNIP);
      const response = await fetch('http://localhost:3000/api/pesanan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          orders: orderList, 
          no_meja: selectedMeja,
          NIP: pelayanNIP
        }),
      });

      if (response.ok) {
        // alert('Pesanan berhasil dikonfirmasi!');
        swalWithBootstrapButtons.fire(
          'Data dikonfirmasi',
          'Data telah berhasil dikonfirmasi',
          'success'
        );
        setOrderList([]); // Clear the order list after successful confirmation
        localStorage.removeItem('id_menu');
        navigate('/pelayan/reservasi');
      } else {
        const errorData = await response.json();
        alert(`Gagal mengkonfirmasi pesanan: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Terjadi kesalahan: ${error.message}`);
    }
  };

  return (
    <div className='w-1/4 border-l p-4 flex flex-col justify-between h-full'>
      <div>
        <h2 className='font-bold mb-2'>Daftar Pesanan</h2>
        {orderList.length > 0 ? (
          orderList.map((orderItem, index) => (
            <div key={index} className='flex justify-between items-center mb-2'>
              <div>
                {orderItem.nama_menu} x {orderItem.quantity}
              </div>
              <button
                className='bg-red-400 hover:bg-red-500 ml-2 px-4 py-1 text-center rounded-md transition-all duration-300'
                onClick={() => handleRemoveOrder(index)}
              >
                Hapus
              </button>
            </div>
          ))
        ) : (
          <p>Tidak ada pesanan.</p>
        )}
      </div>
      {orderList.length > 0 && (
        <div className='flex justify-center'>
          <button
            className='bg-teal-600 hover:bg-teal-500 mt-4 px-6 py-2 text-white text-center rounded-md transition-all duration-300'
            onClick={handleConfirmOrder}
          >
            Konfirmasi Pesanan
          </button>
        </div>
      )}
    </div>
  );
};

export default RightbarPelayan;
