import React, { useState } from 'react';

const Adding = () => {
  const [formData, setFormData] = useState({
    nama: '',
    peran: '',
    jenisKelamin: '',
    tanggalLahir: '',
    alamat: '',
    noTelepon: '',
    tahunMasuk:'',
    pendidikanTerakhir: '',
    kewarganegaraan: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Network response was not ok');
        }

        const data = await response.json();
        console.log('Pegawai berhasil ditambahkan', data);
    } catch (error) {
        console.error('Terjadi kesalahan:', error.message);
    }
};


  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Tambah Pegawai</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="nama">Nama</label>
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={formData.nama}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="peran">Peran</label>
          <select
            name="peran"
            value={formData.peran}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Pilih Peran</option>
            <option value="kasir">Kasir</option>
            <option value="koki">Koki</option>
            <option value="pelayan">Pelayan</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="jenisKelamin">Jenis Kelamin</label>
          <select
            name="jenisKelamin"
            value={formData.jenisKelamin}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Pria">Pria</option>
            <option value="Wanita">Wanita</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="tanggalLahir">Tanggal Lahir</label>
          <input
            type="date"
            name="tanggalLahir"
            value={formData.tanggalLahir}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="alamat">Alamat</label>
          <input
            type="text"
            name="alamat"
            placeholder="Alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="noTelepon">No Telepon</label>
          <input
            type="text"
            name="noTelepon"
            placeholder="No Telepon"
            value={formData.noTelepon}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="tahunMasuk">Tahun Masuk</label>
          <input
            type="number"
            name="tahunMasuk"
            placeholder="Tahun Masuk"
            value={formData.tahunMasuk}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="pendidikanTerakhir">Pendidikan Terakhir</label>
          <input
            type="text"
            name="pendidikanTerakhir"
            placeholder="Pendidikan Terakhir"
            value={formData.pendidikanTerakhir}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="kewarganegaraan">Kewarganegaraan</label>
          <input
            type="text"
            name="kewarganegaraan"
            placeholder="Kewarganegaraan"
            value={formData.kewarganegaraan}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-md">
          Tambah Pegawai
        </button>
      </form>
    </div>
  );
};

export default Adding;
