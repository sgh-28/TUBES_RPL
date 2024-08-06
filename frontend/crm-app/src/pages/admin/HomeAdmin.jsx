import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import SidebarAdmin from '../../components/sidebarAdmin';

function HomeAdmin() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [topMenus, setTopMenus] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());



  const fetchTotalRevenue = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/pendapatan?month=${selectedMonth}&year=${selectedYear}`);
      const data = await response.json();
      console.log(data);
      setTotalRevenue(data.total);
    } catch (error) {
      console.error('Failed to fetch total revenue:', error);
    }
  };

  const fetchTopMenus = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/topmenus?month=${selectedMonth}&year=${selectedYear}`);
      const data = await response.json();
      console.log(data.topMenus);

      setTopMenus(data.topMenus);
    } catch (error) {
      console.error('Failed to fetch top menus:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/transaksi?month=${selectedMonth}&year=${selectedYear}`);
      const {data} = await response.json();
      setTransactions(data);
      console.log(data);

    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  useEffect(() => {
    fetchTotalRevenue();
    fetchTopMenus();
    fetchTransactions();
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className='flex h-full bg-gray-50'>
        <SidebarAdmin />
        <div className='flex flex-col w-full p-4'>
          <div className='flex justify-between mb-4 gap-3'>
            <div className='bg-white px-8 py-4 shadow-md w-1/2 rounded-lg flex flex-col justify-center gap-1'>
              <h2 className='text-3xl font-medium'>Total Pendapatan</h2>
              <p className='text-lg'>Rp. {totalRevenue}</p>
            </div>
            <div className='bg-white px-8 py-4 shadow-md w-1/2 rounded-lg flex flex-col justify-center gap-1'>
              <h2 className='text-3xl font-medium'>Top 3 Menu</h2>
              <ul>
                {topMenus.map((menu, index) => (
                  <li key={index}>{index + 1}. {menu.nama} - {menu.count} orders</li>
                ))}
              </ul>
            </div>
          </div>
          <div className='flex justify-start mb-4 gap-3'>
            <div className='flex flex-col bg-white drop-shadow-md p-4 rounded-lg'>
            {/* <label htmlFor="">Bulan</label> */}
            <select value={selectedMonth} onChange={handleMonthChange} className='outline-none'>
              {[...Array(12).keys()].map((month) => (
                <option key={month + 1} value={month + 1}>{
                  month == 0?"Januari":month==1?"Februari":month==2?"Maret":month==3?"April":month==4?"Mei":
                  month==5?"Juni":month==6?"Juli":month==7?"Agustus":month==8?"September":month==9?"Oktober":
                  month==10?"November":month==11?"Desember":""}</option>
              ))}
            </select>
            </div>
            <div className='flex flex-col bg-white drop-shadow-md p-4 rounded-lg'>
            {/* <label htmlFor="">Tahun</label> */}
            <select value={selectedYear} onChange={handleYearChange} className='outline-none'>
              {[...Array(8).keys()].map((year) => (
                <option key={year + 2017} value={year + 2017}>{year + 2017}</option>
              ))}
            </select>
            </div>
          </div>
          <div className='bg-white px-4 py-8 shadow-md rounded-lg max-h-[420px] overflow-auto'>
            <h2 className='text-3xl font-medium border-b pb-2 mb-4'>Daftar Transaksi</h2>
            <table className='w-full'>
              <thead>
                <tr className='font-medium border-b'>
                  <td className='py-2'>No Pesanan</td>
                  <td className='py-2'>NIP</td>
                  <td className='py-2'>Status</td>
                  <td className='py-2'>Total Harga</td>
                  <td className='py-2'>Tanggal</td>
                  <td className='py-2'>Jenis Pembayaran</td>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className='border-b'>
                    <td className='py-2'>{transaction.no_pesanan}</td>
                    <td className='py-2'>{transaction.NIP}</td>
                    <td className='py-2'>{transaction.status=="lunas"?"Lunas":transaction.status=="tagihan"?"Tagihan":"Berlangsung"}</td>
                    <td className='py-2'>Rp. {transaction.total_harga}</td>
                    <td className='py-2'>{transaction.tanggal_pesanan}</td>
                    <td className='py-2'>{transaction.jenis_pembayaran=="card"?"Card":transaction.jenis_pembayaran=="cash"?"Cash":transaction.jenis_pembayaran=="card"?"E-Wallet":"Belum Bayar"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
