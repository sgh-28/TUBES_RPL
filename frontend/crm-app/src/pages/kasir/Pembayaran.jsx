import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import SidebarAdmin from '../../components/sidebarAdmin';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Pembayaran() {
  const [dataMeja, setDataMeja] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [pesanan, setPesanan] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [jenisPembayaran, setJenisPembayaran] = useState('');
  const [uangBayar, setUangBayar] = useState("");
  const [kembalian, setKembalian] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);

  const handleChangeUang = (e) => {
     setUangBayar(e.target.value);
  }

  useEffect(() => {
    const calculatedKembalian = uangBayar - totalHarga;
    setKembalian(calculatedKembalian > 0 ? calculatedKembalian : 0);
  }, [uangBayar, totalHarga]);

  async function getMeja() {
    const response = await fetch("http://localhost:3000/api/meja", { method: "GET" });
    const data = await response.json();

    const filteredData = data.filter((item) => item.status === 'terisi');
    setDataMeja(filteredData);
  }

  async function getPesanan(no_meja) {
    const response = await fetch(`http://localhost:3000/api/pesanan/nomeja/${no_meja}`, { method: "GET" });
    const data = await response.json();
    setPesanan(data);
    setTotalHarga(data.reduce((acc, item) => acc + item.total_harga, 0));
    setModalIsOpen(true);
  }

  const handleLihatTagihan = (no_meja) => {
    setSelectedTable(no_meja);
    getPesanan(no_meja);
    // getTotalHarga();
  };

  const handleBayar = async () => {
    if(jenisPembayaran == ''){
      alert("Mohon Isi Jenis Pembayaran");
      return null
    }

    console.log(pesanan);
    if(pesanan.length == 0){
      alert("Meja Ini Belum Ada Pesanan");
      return null
    }

    try {
      await Promise.all(
        pesanan.map(pesanan =>
          fetch(`http://localhost:3000/api/pesanan/${pesanan.no_pesanan}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...pesanan, status: 'lunas', jenis_pembayaran:jenisPembayaran})
          })
        )
      );
      await fetch(`http://localhost:3000/api/meja/${selectedTable}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'kosong' })
      });
      alert("Update Status Pembayaran Berhasil")
      setModalIsOpen(false);
      getMeja();
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  

  useEffect(() => {
    getMeja();
  }, []);

  return (
    <div className='flex flex-col h-screen w-full'>
      <Navbar />
      <div className='flex' style={{ height: 'calc(100vh - 60px)' }}>
        <SidebarAdmin />
        <div className='flex flex-col w-[80%]'>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }} className='justify-center overflow-auto'>
            {dataMeja.map((item) => (
              <div key={item._id} className='flex flex-col drop-shadow-lg bg-white rounded-lg items-center'>
                <h2 style={{ borderBottom: '1px solid #eee'}} className='p-4'>{item.nama}</h2>
                <button onClick={() => handleLihatTagihan(item._id)} 
                  className='bg-teal-600 hover:bg-teal-500 transition-all duration-200 text-slate-50 rounded-md px-8 py-4 m-2'
                  >
                    Lihat Tagihan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-[60] min-w-[350px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        <h2 className='text-xl font-medium mb-4'>Tagihan Meja {selectedTable}</h2>
        <div className='flex flex-col gap-4'>
          {pesanan.map(pesanan => (
            <div key={pesanan.no_pesanan} className='border-b-2 pb-2'>
              <h3>Pesanan #{pesanan.no_pesanan}</h3>
              <ul>
                {pesanan.items.map(item => (
                  <li key={item.id_menu}>
                    {item.nama_menu} - {item.harga_menu} x {item.quantity} = {item.harga_menu * item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <h3>Total Harga: Rp. {totalHarga}</h3>
          <select value={jenisPembayaran} onChange={(e) => setJenisPembayaran(e.target.value)} className='py-3 border'>
            <option value="">Pilih Jenis Pembayaran</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="ewallet">E-Wallet</option>
          </select>
          {jenisPembayaran=='cash' && (
            <>
            <label htmlFor="bayar">Nominal Uang</label>
            <input type="number"
             value={uangBayar}
             name='bayar' 
             onChange={handleChangeUang}
             placeholder='Masukan Uang'
             className='py-3 font-normal px-2 border'
             />

            <label htmlFor="kembalian">Kembalian Uang</label>
             <input type="number"
             name='kembalian'
             disabled
             value={kembalian} 
             className='py-3 font-normal px-2 border bg-white'
             />
            </>
          )}
          <button onClick={handleBayar} className='bg-teal-600 hover:bg-teal-500 transition-all duration-200 py-3 text-slate-50 rounded-lg'>Bayar</button>
        </div>
      </Modal>
    </div>
  );
}

export default Pembayaran;
