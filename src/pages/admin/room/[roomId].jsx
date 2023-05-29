import React from 'react';
import { useRouter } from 'next/router';

const RoomDetails = () => {
  const router = useRouter();
  const { roomId } = router.query;

  // Logic to fetch and display room details based on the roomId
  // Implement your own logic or API call here

  // Example room details for demonstration
  const room = {
    id: 1,
    name: 'Deluxe Room',
    category: 'deluxe',
    description: 'This is a deluxe room with all modern amenities.',
    // Add more room details as needed
  };

  return (
    <div>
      <h1>Room Details</h1>
      <h2>{room.name}</h2>
      <p>Category: {room.category}</p>
      <p>Description: {room.description}</p>
      {/* Add more room details as needed */}
    </div>
  );
};

export default RoomDetails;
