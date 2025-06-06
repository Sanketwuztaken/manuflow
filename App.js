import React, { useState } from 'react';

function App() {
  const [orders, setOrders] = useState([]);
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [client, setClient] = useState('');

  const handleAdd = () => {
    const newOrder = { item, quantity, client, status: 'Pending' };
    setOrders([...orders, newOrder]);
    setItem(''); setQuantity(''); setClient('');
  };

  const handleShare = (order) => {
    const msg = `Order: ${order.item} x${order.quantity} for ${order.client} [${order.status}]`;
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const toggleStatus = (index) => {
    const updated = [...orders];
    updated[index].status = updated[index].status === 'Pending' ? 'Done' : 'Pending';
    setOrders(updated);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>🛠 ManuFlow</h2>
      <input placeholder="Item" value={item} onChange={e => setItem(e.target.value)} />
      <input placeholder="Qty" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <input placeholder="Client" value={client} onChange={e => setClient(e.target.value)} />
      <button onClick={handleAdd}>Add Order</button>
      <hr />
      <ul>
        {orders.map((order, idx) => (
          <li key={idx}>
            {order.item} x{order.quantity} ({order.client}) - {order.status}
            <button onClick={() => toggleStatus(idx)}>Toggle</button>
            <button onClick={() => handleShare(order)}>Share</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;