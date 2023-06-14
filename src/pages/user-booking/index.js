import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "src/components/Footer";
import NavBar from "src/components/NavBar";
import TitleBanner from "src/components/TitleBanner";
import { AlertContext } from "src/context/AlertContext";
import { deleteAdminBooking } from "src/store/admin/bookings";
import { fetchUserBookingList } from "src/store/user/bookings";

export default function userBooking() {
    const [bookingList, setBookingList] = useState([])
    const dispatch = useDispatch()
    const [update, setUpdate] = useState(0)
    const { showAlert } = useContext(AlertContext);


    const userBookingStore = useSelector(state => state.userBooking)
    useEffect(() => {
        setBookingList(userBookingStore.data)
        // setRoomList(roomStore.data)
    }, [userBookingStore])

    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(false);
    useEffect(() => {
        if ((JSON.parse(window.localStorage.getItem("userData"))?.role == '[ADMIN]')) {
            setUserType('admin')
        } else {
            setUserType('user')
        }
        // let userData= strin window.localStorage.getItem('userData')
        if (window.localStorage.getItem("accessToken")) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);


    const [showLogin, setShowLogin] = useState(
        () => {
            return !!router.query.requireAuth ?? false;
        }
    )


    useEffect(() => {
        // alert('asd')
        dispatch(fetchUserBookingList({}))
    }, [dispatch, update])





    function formatGuestsAndEmail(email, guests) {
        const otherGuests = guests.map((guest) => guest.name).join(", ");
        return `${email}, ${otherGuests}`;
    }


    function getRoomNumbersWithCategory(rooms) {
        return rooms
            .map((room) => `${room.roomNo}/${room.category.title}`)
            .join(", ");
    }

    function formatTimestamp(timestamp) {
        const options = {
            // weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };

        return new Date(timestamp).toLocaleDateString('en-US', options);
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

    return (
        <>
            <NavBar showLogin={showLogin} setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} userType={userType} />
            <div className="container">
                <TitleBanner marginBotton={'40px'} padding={'7'} title={"Bookings"} />
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
                                        <tr>
                                            <th scope="row">{booking.id}</th>
                                            <td>{formatGuestsAndEmail(booking.email, booking.guests)}</td>
                                            <td>{getRoomNumbersWithCategory(booking.rooms)}</td>
                                            <td>{booking.paymentType}</td>
                                            <td><a href='/admin/finance'>{formatTotalCost(booking.totalCost)}</a></td>
                                            <td>{formatTimestamp(booking.arrivalDate)}</td>
                                            <td>{formatTimestamp(booking.departureDate)}</td>
                                            <td>
                                                {booking.parking.length > 0 ? 'Yes' : 'No'}
                                            </td>
                                            <td>{booking.numberOfGuests}</td>
                                            <td>
                                                {/* <button onClick={handelOnEditClicked.bind(this, booking)} className="edit">Edit</button> */}
                                                <button onClick={handleOnDeleteClicked.bind(this, booking)} className="delete">Cancel</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                        )}
                    </tbody>
                </table>
            </div >
            <Footer />
        </>
    )
}

userBooking.guestGuard = false
userBooking.authGuard = true
userBooking.adminGuard = false