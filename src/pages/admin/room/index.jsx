import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { Tab } from 'react-bootstrap';
import Footer from 'src/components/Footer';
// import SideBar from 'src/components/Admin/SideBar';
// import NavBar from 'src/components/NavBar';
import NavBarAdmin from 'src/components/NavBarAdmin';
import TitleBanner from 'src/components/TitleBanner';
import PropertyForm from "src/components/Admin/category/AddCategoryForm"
import NoCloseModal from "src/components/modal/NoCloseModal"
import SideBar4 from 'src/components/Admin/SideBar4';
import AddRoomDialog from 'src/components/Admin/room/AddRoomDialog';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAdminRooms, fetchAdminRoomsList } from 'src/store/admin/rooms';
import { fetchCategoriesList } from 'src/store/admin/category';
import ImageModal from 'src/components/modal/ImageModal';
import EditRoomDialog from 'src/components/Admin/room/EditRoomDialog';
import { AlertContext } from 'src/context/AlertContext';
const RoomList = () => {
  const [rooms, setRooms] = useState([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const dispatch = useDispatch()
  const categoryStore = useSelector(state => state.category)
  const adminRoomStore = useSelector(state => state.adminRoom)
  // const store = useSelector(state => state.category)
  const { showAlert } = useContext(AlertContext);



  useEffect(() => {
    dispatch(fetchAdminRoomsList({}))
    dispatch(fetchCategoriesList({}))
  }, [dispatch])


  useEffect(() => {
    setRooms(adminRoomStore.data)
  }, [adminRoomStore])


  console.log(adminRoomStore.data)

  const getImageFormat = (data) => {
    // Identify the image format based on the data
    const mimeType = 'image/png'; // Default to PNG format if not recognized

    // Extract the first few bytes of the data
    const bytes = data.substring(0, 8);

    // Check for known file signatures to identify the format
    if (bytes.startsWith('data:image/jpeg') || bytes.startsWith('/9j/')) {
      return 'image/jpeg';
    }
    if (bytes.startsWith('data:image/png') || bytes.startsWith('iVBORw')) {
      return 'image/png';
    }
    if (bytes.startsWith('data:image/gif') || bytes.startsWith('R0lGOD')) {
      return 'image/gif';
    }
    // Add more format checks if necessary

    return mimeType; // Return the default MIME type if the format is not recognized
  };


  const [editRow, setEditRow] = useState(null);
  const handelOnEditClicked = (room) => {
    setEditRow(room)
    setShowEditDialog(true)
  }

  const onAlertErrorHandle = (message) => {
    showAlert('error', message, () => {
      console.log('Ok button clicked');
    });
  };

  const onAlertSuccessHandle = (message) => {
    showAlert('success', message, () => { }, () => { }, () => {
      setShowEditDialog(false)
    });
  };
  const handleOnDeleteClicked = (room) => {
    showAlert('confirmation', 'Are you sure to delete this Room?', () => {
      dispatch(deleteAdminRooms(room?.id)).then((data) => {
        if (data?.payload?.status === 'success') {
          onAlertSuccessHandle(data?.payload?.message);
        } else {
          onAlertErrorHandle(data?.payload?.message);
        }
      })
    }, () => {
      console.log('Cancel is clicked')
    });
    // setEditRow(category)
    // setShowEditDialog(true)
  }




  const [selectedImage, setSelectedImage] = useState(null);
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
            <button onClick={() => setShowAddDialog(true)} className="loginButton">+ Add Room</button>
            <table className="table table-bordered table-hover transaction">
              <thead className="thead-dark">
                <tr style={{ backgroundColor: "#38325059" }}>
                  <th scope="col">Room No</th>
                  <th scope="col">Image</th>
                  <th scope="col">Category</th>
                  <th scope="col">Available</th>
                  <th scope="col">Inventory Available?</th>
                  <th scope="col">Cleaning Status?</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {rooms.length !== 0 && (
                  <>
                    {rooms.map((room, i) => {
                      console.log(room)
                      return (
                        <tr key={room?.id}>
                          <th scope="row">{room?.roomNo}</th>
                          <td>
                            {/* <img src={`data:${getImageFormat(category?.imageData)};base64,${category?.imageData}`} alt="Category Image" style={{ height: "200px", width: "200px" }}></img> */}
                            <img
                              src={`data:${getImageFormat(room?.imageData)};base64,${room?.imageData}`}
                              alt="Category Image"
                              style={{ height: "200px", width: "200px", cursor: "pointer" }}
                              onClick={() => setSelectedImage(`data:${getImageFormat(room?.imageData)};base64,${room?.imageData}`)}
                            />
                          </td>
                          <td>{room?.category?.title}</td>
                          <td>{(room?.isActive ? (<>Yes</>) : (<>No</>))}</td>
                          <td>{(room?.isInventoryAvailable ? (<>Yes</>) : (<>No</>))}</td>
                          <td>{(room?.isCleaned ? (<>Yes</>) : (<>No</>))}</td>
                          <td>
                            <button onClick={handelOnEditClicked.bind(this, room)} className="edit">Edit</button>
                            <button onClick={handleOnDeleteClicked.bind(this, room)} className="delete">Delete</button>

                          </td>
                        </tr>
                      )

                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
          <NoCloseModal show={showAddDialog} onHide={() => { setShowAddDialog(false) }}>
            {/* <AddCategoryDialog /> */}
            <AddRoomDialog setShowAddDialog={() => { setShowAddDialog(false) }} categoryStore={categoryStore} />
          </NoCloseModal>
          <ImageModal show={!!selectedImage} onHide={() => setSelectedImage(null)} image={selectedImage} />
          <NoCloseModal show={showEditDialog} onHide={() => { setShowEditDialog(false) }}>
            <EditRoomDialog setShowEditDialog={() => { setShowEditDialog(false) }} categoryStore={categoryStore} editRow={editRow} setEditRow={setEditRow} />
          </NoCloseModal>
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
RoomList.guestGuard = false
RoomList.authGuard = true
RoomList.adminGuard = true

export default RoomList;
