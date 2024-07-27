// import { useEffect, useState } from 'react'
import { useMeja } from '../pages/pelayan/MejaProvider';

function Meja() {
    const { dataMeja, setSelectedMeja } = useMeja();



    const handleButtonClick = (item) => {
        setSelectedMeja(item);
    };


  return (
    <div className='flex flex-col'>
        {dataMeja.map((item, index)=>
            <div key={index} className='flex justify-between px-12 py-4 items-center border'>
                <h1 className='text-lg'>{item.nama}</h1>
                <button
                    onClick={() => handleButtonClick(item)} 
                    className={`min-w-32 py-3 rounded-lg transition-all duration-300 ${item.status == 'kosong'?'bg-teal-600 hover:bg-teal-500 text-slate-50':'bg-slate-300 hover:bg-slate-400 text-slate-800'}`}
                    >
                        {item.status == 'kosong'?'Kosong':'Terisi'}
                    </button>
            </div>
        )}
    </div>
  )
}

export default Meja