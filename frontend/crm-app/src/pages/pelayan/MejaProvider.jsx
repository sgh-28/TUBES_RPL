// MejaContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const MejaContext = createContext();

export const MejaProvider = ({ children }) => {
  const [dataMeja, setDataMeja] = useState([]);
  
  const [selectedMeja, setSelectedMeja] = useState(null);

  const updateMejaStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/meja/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update meja status');
      }

      const updatedMeja = await response.json();
      
      setDataMeja(prevData => 
        prevData.map(meja => 
          meja._id === id ? { ...meja, status: newStatus } : meja
        )
      );
      if (selectedMeja && selectedMeja._id === id) {
        setSelectedMeja(prev => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error('Failed to update meja status:', error);
    }
  };

  const getMeja = async () =>{
    const response = await fetch('http://localhost:3000/api/meja');

    const data = await response.json();
    setDataMeja(data);
  }

  useEffect(()=>{
    getMeja()
  },[]);

  return (
    <MejaContext.Provider value={{ dataMeja, selectedMeja, setSelectedMeja, updateMejaStatus }}>
      {children}
    </MejaContext.Provider>
  );
};

export const useMeja = () => useContext(MejaContext);
