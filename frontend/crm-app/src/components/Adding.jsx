import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


const Adding = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'button-alert-con ml-1',
      cancelButton: 'button-alert-can mr-1'
    },
    buttonsStyling: false
  });

  const [formData, setFormData] = useState({
    Role: '',
    Nama: '',
    Password: '',
    Tanggal_lahir: '',
    Jenis_kelamin: '',
    Alamat: '',
    No_telp: '',
    Tahun_masuk: 0,
    Pend_terakhir: '',
    kewarganegaraan: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (id) {
      console.log(id);
      fetch(`http://localhost:3000/api/users/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFormData({
            Role: data.Role,
            Nama: data.Nama,
            Password: data.Password,
            Tanggal_lahir: data.Tanggal_lahir,
            Jenis_kelamin: data.Jenis_kelamin,
            Alamat: data.Alamat,
            No_telp: data.No_telp,
            Tahun_masuk: data.Tahun_masuk,
            Pend_terakhir: data.Pend_terakhir,
            kewarganegaraan: data.kewarganegaraan
          });
        })
        .catch((error) => {
          console.error('Failed to fetch menu data', error);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = id ? 'PUT' : 'POST';
      const url = id
        ? `http://localhost:3000/api/users/${id}`
        : 'http://localhost:3000/api/users';

      const response = await fetch(url, {
        method,
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

      const header = id ? 'Data Diubah!' : 'Data Ditambah!' 
      const footer = id ? 'Data anda telah diubah': 'Data anda telah berhasil ditambah'
      swalWithBootstrapButtons.fire(
        header,
        footer,
        'success'
      );
      navigate('/admin/karyawan');
    } catch (error) {
      alert('Terjadi kesalahan:', error.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">{id ? 'Edit Pegawai' : 'Tambah Pegawai'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="nama">Nama</label>
          <input
            type="text"
            name="Nama"
            placeholder="Nama"
            value={formData.Nama}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="peran">Peran</label>
          <select
            name="Role"
            value={formData.Role}
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
            name="Jenis_kelamin"
            value={formData.Jenis_kelamin}
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
            name="Tanggal_lahir"
            value={formData.Tanggal_lahir}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="alamat">Alamat</label>
          <input
            type="text"
            name="Alamat"
            placeholder="Alamat"
            value={formData.Alamat}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="noTelepon">No Telepon</label>
          <input
            type="text"
            name="No_telp"
            placeholder="No Telepon"
            value={formData.No_telp}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="tahunMasuk">Tahun Masuk</label>
          <input
            type="number"
            name="Tahun_masuk"
            placeholder="Tahun Masuk"
            value={formData.Tahun_masuk}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="pendidikanTerakhir">Pendidikan Terakhir</label>
          <input
            type="text"
            name="Pend_terakhir"
            placeholder="Pendidikan Terakhir"
            value={formData.Pend_terakhir}
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
            name="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-md">
          {id ? 'Edit Pegawai' : 'Tambah Pegawai'}
        </button>
      </form>
    </div>
  );
};

export default Adding;
