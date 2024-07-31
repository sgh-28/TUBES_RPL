import React from 'react'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/sidebarAdmin'

function App() {
  const [selectedTable, setSelectedTable] = useState(null);

  return (
    <div className="flex">
      <Navbar />
      <SidebarAdmin setSelectedTable={setSelectedTable} />
      <div className="flex-1 p-4">
        {selectedTable ? (
          <OrderDetails tableId={selectedTable} />
        ) : (
          <div>Select a table to view order details.</div>
        )}
      </div>
    </div>
  );
}

export default Pembayaran