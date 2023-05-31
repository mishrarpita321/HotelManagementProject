import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Tab } from 'react-bootstrap';
import Footer from 'src/components/Footer';

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
      const response = await fetch(`/api/rooms?category=${query.category || ''}`);
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
      <div className="container">
        <button className="loginButton">+ Add Room</button>
        <table className="table table-bordered table-hover transaction">
          <thead className="thead-dark">
            <tr style={{ backgroundColor: "#38325059" }}>
              <th scope="col">Room No</th>
              <th scope="col">Category</th>
              <th scope="col">Status</th>
              <th scope="col">Inventory Available?</th>
              <th scope="col">Cleaning Status?</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>
                <button className="edit">Edit</button>
                <button className="delete">Delete</button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@fat</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer/>
    </div>
  );
};

export default RoomList;
