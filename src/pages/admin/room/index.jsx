import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const RoomList = () => {
  const router = useRouter();
  const { query } = router;
  const [rooms, setRooms] = useState([
    { id: 1, category: 'deluxe', name: 'Deluxe Room 1' },
    { id: 2, category: 'deluxe', name: 'Deluxe Room 2' },
    { id: 3, category: 'standard', name: 'Standard Room 1' },
    { id: 4, category: 'standard', name: 'Standard Room 2' },
  ]);

  // Function to fetch the list of rooms from the API based on the category
  const fetchRooms = async () => {
    try {
      // Make API call with the appropriate endpoint and query parameters
      const response = await fetch(`/api/rooms?category=${query.categoyry || ''}`);
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [query.category]); // Fetch rooms whenever the category query parameter changes

  if (query.roomId) {
    // Redirect to dynamic room details page if roomId is provided in the query
    router.push(`/room/${query.roomId}`);
    return null;
  }

  return (
    <div>
      <h1>Rooms</h1>
      {rooms.map((room) => (
        <div key={room.id}>
          <h2>{room.name}</h2>
          <p>Category: {room.category}</p>
          {/* Add more room details as needed */}
        </div>
      ))}
    </div>
  );
};

export default RoomList;
