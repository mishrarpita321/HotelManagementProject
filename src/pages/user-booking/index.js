import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "src/components/Footer";
import NavBar from "src/components/NavBar";
import TitleBanner from "src/components/TitleBanner";
import { fetchUserBookingList } from "src/store/user/bookings";

export default function userBooking() {
    const [bookingList, setBookingList] = useState([])
    const dispatch = useDispatch()
    const [update, setUpdate] = useState(0)



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
                                            <td>{formatTimestamp(booking.arrivalDate)}</td>
                                            <td>
                                                {booking.parking.length > 0 ? 'Yes' : 'No'}
                                            </td>
                                            <td>{booking.numberOfGuests}</td>
                                            <td>
                                                <button onClick={handelOnEditClicked.bind(this, booking)} className="edit">Edit</button>
                                                <button onClick={handleOnDeleteClicked.bind(this, booking)} className="delete">Delete</button>
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