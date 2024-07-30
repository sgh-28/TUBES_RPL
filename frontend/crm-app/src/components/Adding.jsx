import React, { useState, useEffect } from 'react';

const Adding = () => {
  const [nip, setNip] = useState('');
  const [nama, setNama] = useState('');
  const [peran, setPeran] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [alamat, setAlamat] = useState('');
  const [noTelepon, setNoTelepon] = useState('');
  const [tahunMasuk, setTahunMasuk] = useState('');
  const [pendidikanTerakhir, setPendidikanTerakhir] = useState('');
  const [kewarganegaraan, setKewarganegaraan] = useState('');
  const [password, setPassword] = useState('');
  const [idAdmin] = useState('12345'); // Contoh ID admin (ini seharusnya didapat dari konteks aplikasi atau state)

  // Simulasi mendapatkan NIP otomatis dari database
  useEffect(() => {
    const fetchNip = async () => {
      // Panggilan API ke backend untuk mendapatkan NIP
      // Misalnya: const response = await fetch('/api/get-nip');
      // const data = await response.json();
      // setNip(data.nip);

      // Untuk sekarang, kita akan gunakan nilai dummy
      setNip('20240730');
    };

    fetchNip();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan pengiriman data form ke backend
    console.log({
      nip,
      nama,
      peran,
      jenisKelamin,
      tanggalLahir,
      alamat,
      noTelepon,
      tahunMasuk,
      pendidikanTerakhir,
      kewarganegaraan,
      password,
      idAdmin
    });
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 space-y-4'>
      <div className='flex flex-col'>
        <label className='font-medium'>NIP (Otomatis)</label>
        <input
          type='text'
          value={nip}
          readOnly
          className='border p-2 rounded-md'
        />
      </div>

      <div className='flex flex-col'>
        <label className='font-medium'>Nama Pegawai</label>
        <input
          type='text'
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className='border p-2 rounded-md'
        />
      </div>

      <div className='flex flex-col'>
        <label className='font-medium'>Peran</label>
        <select
          value={peran}
          onChange={(e) => setPeran(e.target.value)}
          className='border p-2 rounded-md'
        >
          <option value=''>Pilih Peran</option>
          <option value='kasir'>Kasir</option>
          <option value='pelayan'>Pelayan</option>
          <option value='koki'>Koki</option>
        </select>
      </div>

      <div className='flex flex-col'>
        <label className='font-medium'>Jenis Kelamin</label>
        <div className='flex items-center space-x-4'>
          <label>
            <input
              type='radio'
              name='jenisKelamin'
              value='pria'
              checked={jenisKelamin === 'pria'}
              onChange={(e) => setJenisKelamin(e.target.value)}
              className='mr-2'
            />
            Pria
          </label>
          <label>
            <input
              type='radio'
              name='jenisKelamin'
              value='wanita'
              checked={jenisKelamin === 'wanita'}
              onChange={(e) => setJenisKelamin(e.target.value)}
              className='mr-2'
            />
            Wanita
          </label>
        </div>
      </div>

      <div className='flex flex-col'>
        <label className='font-medium'>Tanggal Lahir</label>
        <input
          type='date'
          value={tanggalLahir}
          onChange={(e) => setTanggalLahir(e.target.value)}
          className='border p-2 rounded-md'
        />
      </div>

      <div className='flex flex-col'>
        <label className='font-medium'>Alamat</label>
        <input
          type='text'
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          className='border p-2 rounded-md'
        />
      </div>

      <div className='flex flex-col'>
        <label className='font-medium'>No Telepon</label>
        <input
          type='text'
          value={noTelepon}
          onChange={(e) => setNoTelepon(e.target.value)}
          className='border p-2 rounded-md'
        />
      </div>

      <div className='flex flex-col'>
        <label className='font-medium'>Tahun Masuk</label>
        <input
          type='text'
          value={tahunMasuk}
          onChange={(e) => setTahunMasuk(e.target.value)}
          className='border p-2 rounded-md'
        />
      </div>

      <div className='flex flex-col'>
        <label className='font-medium'>Pendidikan Terakhir</label>
        <input
          type='text'
          value={pendidikanTerakhir}
          onChange={(e) => setPendidikanTerakhir(e.target.value)}
          className='border p-2 rounded-md'
        />
      </div>

      <div className='flex flex-col'>
        <label className='font-medium'>Kewarganegaraan</label>
        <input
          type='text'
          value={kewarganegaraan}
          onChange={(e) => setKewarganegaraan(e.target.value)}
          className='border p-2 rounded-md'
        />
      </div>

      <div className='flex flex-col'>
        <label className='font-medium'>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border p-2 rounded-md'
        />
      </div>

      <button type='submit' className='bg-teal-600 text-white px-4 py-2 rounded-md'>
        Simpan
      </button>
    </form>
  );
};

export default Adding;
