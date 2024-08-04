import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderDetails({ tableId }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (tableId) {
      // Fetch order details
      axios.get(`/api/orders/${tableId}`)
        .then(response => {
          setOrder(response.data);
        })
        .catch(error => console.error(error));
    }
  }, [tableId]);

  const handlePayment = (method, amount) => {
    // Handle payment logic
    console.log(`Payment method: ${method}, amount: ${amount}`);
  };

  return (
    <div>
      {order ? (
        <div>
          <h2>Pesanan Meja {tableId}</h2>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>{item.name} - {item.quantity} - {item.price}</li>
            ))}
          </ul>
          <div>Total: {order.total}</div>
          <div>
            <h3>Metode Pembayaran</h3>
            <button onClick={() => handlePayment('Cash', order.total)}>Cash</button>
            <button onClick={() => handlePayment('Card', order.total)}>Card</button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default OrderDetails;
