import React from 'react'
import Navbar from '../../components/Navbar'
import SidebarAdmin from '../../components/sidebarAdmin'

function Pembayaran() {
  // const [selectedTable, setSelectedTable] = useState(null);

  return (
    <div className='flex flex-col h-screen w-full'>
        <Navbar/>
        <div className='flex h-full'>
            <SidebarAdmin/>
        {/* {selectedTable ? (
          <OrderDetails tableId={selectedTable} />
        ) : (
          <div>Select a table to view order details.</div>
        )} */}
      </div>
    </div>
  );
}

export default Pembayaran