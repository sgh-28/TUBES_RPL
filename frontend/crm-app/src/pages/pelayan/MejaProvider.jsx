// MejaContext.jsx
import { createContext, useState, useContext } from 'react';

const MejaContext = createContext();

export const MejaProvider = ({ children }) => {
  const [dataMeja, setDataMeja] = useState([
    {
        id: 1,
        nama: "Meja 1",
        status: "kosong",
        kapasitas: 4
    }, 
    {
        id: 2,
        nama: "Meja 2",
        status: "kosong",
        kapasitas: 2
    },
    {
        id: 3,
        nama: "Meja 3",
        status: "kosong",
        kapasitas: 4
    },
    {
        id: 4,
        nama: "Meja 4",
        status: "kosong",
        kapasitas: 2
    },
    {
        id: 5,
        nama: "Meja 5",
        status: "terisi",
        kapasitas: 2
    },
    {
        id: 6,
        nama: "Meja 6",
        status: "terisi",
        kapasitas: 2
    },
    {
        id: 7,
        nama: "Meja 7",
        status: "terisi",
        kapasitas: 2
    },
    {
        id: 8,
        nama: "Meja 8",
        status: "terisi",
        kapasitas: 2
    },
    {
        id: 9,
        nama: "Meja 9",
        status: "terisi",
        kapasitas: 2
    },
    {
        id: 10,
        nama: "Meja 10",
        status: "terisi",
        kapasitas: 4
    }
  ]);
  
  const [selectedMeja, setSelectedMeja] = useState(null);

  const updateMejaStatus = (id, newStatus) => {
    setDataMeja(prevData => 
      prevData.map(meja => 
        meja.id === id ? { ...meja, status: newStatus } : meja
      )
    );
    if (selectedMeja && selectedMeja.id === id) {
      setSelectedMeja(prev => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <MejaContext.Provider value={{ dataMeja, selectedMeja, setSelectedMeja, updateMejaStatus }}>
      {children}
    </MejaContext.Provider>
  );
};

export const useMeja = () => useContext(MejaContext);
