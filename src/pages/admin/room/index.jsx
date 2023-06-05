import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { Tab } from 'react-bootstrap';
import Footer from 'src/components/Footer';
// import SideBar from 'src/components/Admin/SideBar';
// import NavBar from 'src/components/NavBar';
import NavBarAdmin from 'src/components/NavBarAdmin';
import TitleBanner from 'src/components/TitleBanner';

import SideBar4 from 'src/components/Admin/SideBar4';


const RoomList = () => {


  useEffect(() => {
    console.log('$$$$$$$$$$$$$$$$$$$i am from useEffect');
  }, []);





  const router = useRouter();
  const { query } = router;
  const [rooms, setRooms] = useState([
    { id: 1, roomNo: 122, status: true, inventory: true, cleaning: false, category: 'deluxe' },
    { id: 2, roomNo: 222, status: true, inventory: true, cleaning: false, category: 'deluxe' },
    { id: 3, roomNo: 322, status: true, inventory: true, cleaning: false, category: 'deluxe' },

  ]);
  console.log(rooms)
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


  const addRoomClick = () => {
    let newroom = { id: 4, roomNo: 322, status: true, inventory: true, cleaning: false, category: 'deluxe' }

    setRooms([...rooms, newroom]);
  }


  const deleteRoomClick = (id) => {
    // alert(id)
    let newroom = { id: 4, roomNo: 322, status: true, inventory: true, cleaning: false, category: 'deluxe' }
    setRooms(rooms.filter((item) => item.id != newroom.id));

  };


  const [showAddDialog, addRoomClick] = useState()


  return (
    <>
      <NavBarAdmin />

      <div className='row container' >
        <div className='col-2'>
          <SideBar4 />
        </div>
        <div className='col-10'>
          <TitleBanner marginBotton={'40px'} padding={'7'} title={"Rooms"} />
          <div className="">
            <button onClick={() => addRoomClick(true)} className="loginButton">+ Add Room</button>
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
                {rooms.map((room, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{room.roomNo}</th>
                      <td>{room.category}</td>
                      <td>{(room.status ? (<>true</>) : (<>false</>))}</td>
                      <td>{(room.inventory ? (<>true</>) : (<>false</>))}</td>
                      <td>{(room.cleaning ? (<>true</>) : (<>false</>))}</td>
                      <td>
                        <button className="edit">Edit</button>
                        <button onClick={deleteRoomClick.bind(this, 4)} className="delete">Delete</button>
                      </td>
                    </tr>
                  )

                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      {/* <div className='row' > */}
      {/* <div className='col-2'>
          Roshan Devkota
        </div> */}
      {/* </div> */}
      <Footer />
    </>


  );
};

export default RoomList;
