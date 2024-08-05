import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';




function Login() {

  const [NIP, setNIP] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
      e.preventDefault();

      const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ NIP, Password }),
      });

      const data = await response.json();

      if (response.ok) {
          localStorage.setItem('token', data.token);
          const user = jwtDecode(data.token);

          if (user.role === 'pelayan') {
              navigate('/pelayan/reservasi');
          } else if (user.role === 'admin') {
              navigate('/admin/');
          } else if (user.role === 'kasir'){
              navigate('/kasir/');
          } else if (user.role === 'koki'){
              navigate('/koki/');
          }
      } else {
          alert(data.message);
      }
    };

  return (
    <div className='w-full h-screen bg-slate-50 flex flex-col items-center justify-center'>
      <form className='flex flex-col bg-white drop-shadow-lg items-center px-12 py-12 gap-6 rounded-xl' onSubmit={handleLogin}>
        <h1 className='text-2xl font-medium'>Login</h1>
        <div className='flex flex-col gap-4 mb-5'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="NIP">NIP</label>
            <input 
              className='outline-none border px-6 py-2 rounded-md focus:bg-slate-100' type="text" name="NIP" id="NIP" value={NIP}           
              onChange={(e) => setNIP(e.target.value)} 
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="pass">Password</label>
            <input 
              className='outline-none border px-6 py-2 rounded-md focus:bg-slate-100' type="password" name="pass" id="pass"
              value={Password} onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
        </div>
        <button type="submit" 
          className='bg-teal-600 w-full py-3 text-slate-50 rounded-md hover:bg-teal-500 transition-all duration-300'>
            Masuk
        </button>
      </form>
    </div>
  )
}

export default Login