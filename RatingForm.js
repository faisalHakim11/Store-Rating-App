import React, { useState } from 'react';
import axios from 'axios';

function RatingForm({ user }) {
  const [storeId, setStoreId] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8081/api/ratings', {
      storeId,
      rating,
      userId: user.id
    });
    alert('Rating submitted!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Store ID"
        value={storeId}
        onChange={(e) => setStoreId(e.target.value)}
        required
      />
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <button type="submit">Submit Rating</button>
    </form>
  );
}

export default RatingForm;