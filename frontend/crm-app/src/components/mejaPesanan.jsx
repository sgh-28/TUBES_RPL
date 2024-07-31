import React, { useEffect, useState } from 'react';
import axios from 'axios';

function mejaPesanan({ setSelectedTable }) {
  const [dataMeja, setSelectedMeja] = useState([]);

  useEffect(() => {
    // Fetch tables with orders
    axios.get('/api/tables')
      .then(response => {
        setTables(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="w-1/4 bg-gray-100 h-screen p-4">
      <h2 className="text-xl font-bold">Daftar Meja</h2>
      <ul>
        {tables.map(table => (
          <li key={table.id} className="p-2 cursor-pointer" onClick={() => setSelectedTable(table.id)}>
            Meja {table.id} - {table.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default mejaPesanan;
