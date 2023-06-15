import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import BookingForm from "src/components/Admin/AdminBooking"
import SideBar4 from "src/components/Admin/SideBar4"
import AddBookingForm from "src/components/Admin/booking/AddBookingForm"
import EditBookingForm from "src/components/Admin/booking/EditBookingForm"
import AddCategoryDialog from "src/components/Admin/category/AddCategoryDialog"
import NavBar from "src/components/NavBar"
import NavBarAdmin from "src/components/NavBarAdmin"
import TitleBanner from "src/components/TitleBanner"
import NoCloseModal from "src/components/modal/NoCloseModal"
import { AlertContext } from "src/context/AlertContext"
import { checkoutAdminBooking, deleteAdminBooking, fetchAdminBookingList } from "src/store/admin/bookings"
import { fetchAdminParkingList } from "src/store/admin/parkings"
import { fetchAdminRoomsList } from "src/store/user/availableRooms"

export default function Booking() {
    const [bookingList, setBookingList] = useState([])
    // const [roomList, setRoomList] = useState([])
    const { showAlert } = useContext(AlertContext);

    const dispatch = useDispatch()
    const adminBookingStore = useSelector(state => state.adminBooking)
    const roomStore = useSelector(state => state.adminRoom)
    const parkingStore = useSelector(state => state.adminParking)

    const [showEditDialog, setShowEditDialog] = useState(false)
    const [update, setUpdate] = useState(0)


    useEffect(() => {
        dispatch(fetchAdminBookingList({}))
        dispatch(fetchAdminRoomsList({}))
        dispatch(fetchAdminParkingList({}))
    }, [dispatch, update])


    useEffect(() => {
        setBookingList(adminBookingStore.data)
        // setRoomList(roomStore.data)
    }, [adminBookingStore])


    const [showAddDialog, setShowAddDialog] = useState()


    // console.log(roomList)

    function formatTimestamp(timestamp) {
        const options = {
            // weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };

        return new Date(timestamp).toLocaleDateString('en-US', options);
    }

    function getRoomNumbersWithCategory(rooms) {
        return rooms
            .map((room) => `${room.roomNo}/${room.category.title}`)
            .join(", ");
    }


    function formatGuestsAndEmail(email, guests) {
        const otherGuests = guests.map((guest) => guest.name).join(", ");
        return `${email}, ${otherGuests}`;
    }

    function formatTotalCost(totalCost) {
        const formattedCost = totalCost.toLocaleString('en-US', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        return formattedCost;
    }

    const handleOnDeleteClicked = (booking) => {
        showAlert('confirmation', 'Are you sure to delete this booking?', () => {
            dispatch(deleteAdminBooking(booking?.id)).then((data) => {
                if (data?.payload?.status === 'success') {
                    setUpdate(update + 1)
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
    const handleOnCheckoutClicked = (booking) => {
        showAlert('confirmation', 'Are you sure to check out?', () => {
            dispatch(checkoutAdminBooking(booking)).then((data) => {
                if (data?.payload?.status === 'success') {
                    setUpdate(update + 1)
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

    const [editRow, setEditRow] = useState(null);
    const handelOnEditClicked = (booking) => {
        setEditRow(booking)
        setShowEditDialog(true)
    }

    return (
        <>
            <NavBarAdmin />
            <div className="row container">
                <div className='col-2'>
                    <SideBar4 />
                </div>
                <div className="col-10">
                    <TitleBanner marginBotton={'40px'} padding={'7'} title={"Bookings"} />
                    {/* <input placeholder="search" /><br /> */}
                    <button onClick={() => setShowAddDialog(true)} className="loginButton" style={{ marginTop: "30px" }}>Create New Booking</button>
                    <table className="table table-bordered table-hover transaction">
                        <thead className="thead-dark">
                            <tr style={{ backgroundColor: "#38325059" }}>
                                <th scope="col">Booking Id</th>
                                <th scope="col">Guest Email</th>
                                <th scope="col">Rooms</th>
                                <th scope="col">Payment Type</th>
                                <th scope="col">Total Cost</th>
                                <th scope="col">Arrival Dt</th>
                                <th scope="col">Departure Dt</th>
                                <th scope="col">Parking</th>
                                <th scope="col">Guests Count</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingList.length !== 0 && (
                                <>
                                    {bookingList.map((booking, i) => {
                                        console.log(booking)
                                        return (
                                            <tr key={booking.id}>
                                                <th scope="row">{booking.id}</th>
                                                <td>{formatGuestsAndEmail(booking.email, booking.guests)}</td>
                                                <td>{getRoomNumbersWithCategory(booking.rooms)}</td>
                                                <td>{booking.paymentType}</td>
                                                <td>{formatTotalCost(booking.totalCost)}</td>
                                                <td>{formatTimestamp(booking.arrivalDate)}</td>
                                                <td>{formatTimestamp(booking.departureDate)}</td>
                                                <td>
                                                    {booking.parking.length > 0 ? 'Yes' : 'No'}
                                                </td>
                                                <td>{booking.numberOfGuests}</td>
                                                <td style={{ display: "flex" }}>
                                                    <button onClick={handelOnEditClicked.bind(this, booking)} className="edit">Edit</button>
                                                    <button onClick={handleOnDeleteClicked.bind(this, booking)} className="delete">Delete</button>
                                                    <button onClick={handleOnCheckoutClicked.bind(this, booking)} className="delete" style={{ width: "auto" }}>Checkout</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                            )}
                        </tbody>
                    </table>
                    <NoCloseModal show={showAddDialog} onHide={() => { setShowAddDialog(false) }}>
                        {/* <BookingForm /> */}
                        <AddBookingForm setShowAddDialog={() => setShowAddDialog(false)} rooms={roomStore} parkingStore={parkingStore} update={update} setUpdate={setUpdate} />
                    </NoCloseModal>
                    <NoCloseModal show={showEditDialog} onHide={() => { setShowEditDialog(false) }}>
                        <EditBookingForm setShowEditDialog={() => { setShowEditDialog(false) }} rooms={roomStore} parkingStore={parkingStore} editRow={editRow} setEditRow={setEditRow} update={update} setUpdate={setUpdate} />
                    </NoCloseModal>
                </div >
            </div>
        </>
    )
}
Booking.guestGuard = false
Booking.authGuard = true
Booking.adminGuard = true