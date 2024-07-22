// import React from 'react'

function Login() {
  return (
    <div className='w-full h-screen bg-slate-50 flex flex-col items-center justify-center'>
      <div className='flex flex-col bg-white drop-shadow-lg items-center px-12 py-12 gap-6 rounded-xl'>
        <h1 className='text-2xl font-medium'>Login</h1>
        <div className='flex flex-col gap-4 mb-5'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="NIP">NIP</label>
            <input className='outline-none border px-6 py-2 rounded-md focus:bg-slate-100' type="text" name="NIP" id="NIP" />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="pass">Password</label>
            <input className='outline-none border px-6 py-2 rounded-md focus:bg-slate-100' type="password" name="pass" id="pass" />
          </div>
        </div>
        <button className='bg-teal-600 w-full py-3 text-slate-50 rounded-md hover:bg-teal-500 transition-all duration-300'>Masuk</button>
      </div>
    </div>
  )
}

export default Login