import Link from "next/link"
import { useState } from "react"
import BookingForm from "src/components/Admin/AdminBooking"
import SideBar4 from "src/components/Admin/SideBar4"
import AddBookingForm from "src/components/Admin/booking/AddBookingForm"
import AddCategoryDialog from "src/components/Admin/category/AddCategoryDialog"
import NavBar from "src/components/NavBar"
import NavBarAdmin from "src/components/NavBarAdmin"
import TitleBanner from "src/components/TitleBanner"
import NoCloseModal from "src/components/modal/NoCloseModal"

export default function Categories() {
    const [bookingList, setBookingList] = useState(
        [
            {
                id: 1,
                name: 'Booking-1',
                roomsNo: 1,

            }, {
                id: 2,
                name: 'Booking-2',
                rooms: 2,

            }, {
                id: 3,
                name: 'Booking-3',
                rooms: 3,
            }
        ]
    )


    const [showAddDialog, addBookingClick] = useState()

    return (
        <>
            <NavBarAdmin />
            <div className="row container">
                <div className='col-2'>
                    <SideBar4 />
                </div>
                <div className="col-10">
                    <TitleBanner marginBotton={'40px'} padding={'7'} title={"Bookings"} />
                    <input placeholder="search" /><br />
                    <button onClick={() => addBookingClick(true)} className="loginButton" style={{ marginTop: "30px" }}>Create New Booking</button>
                    <table className="table table-bordered table-hover transaction">
                        <thead className="thead-dark">
                            <tr style={{ backgroundColor: "#38325059" }}>
                                <th scope="col">Booking Id</th>
                                <th scope="col">Guest Name</th>
                                <th scope="col">Roomcategory</th>
                                <th scope="col">RoomNo</th>
                                <th scope="col">Payment Id</th>
                                <th scope="col">Arrival Dt</th>
                                <th scope="col">Departure Dt</th>
                                <th scope="col">Parking</th>
                                <th scope="col">Guests</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1234</th>
                                <td>Arpita Mishra</td>
                                <td>Deluxe</td>
                                <td>750</td>
                                <td><a href='/admin/finance'>500</a></td>
                                <td>01June,2023</td>
                                <td>05June,2023</td>
                                <td>
                                    No
                                </td>
                                <td>2</td>
                                <td>
                                    <button className="edit">Edit</button>
                                    <button className="delete">Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">1234</th>
                                <td>Arpita Mishra</td>
                                <td>Deluxe</td>
                                <td>750</td>
                                <td>500</td>
                                <td>01June,2023</td>
                                <td>05June,2023</td>
                                <td>No</td>
                                <td>2</td>
                                <td>
                                    <button className="edit">Edit</button>
                                    <button className="delete">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <NoCloseModal show={showAddDialog} onHide={() => { addBookingClick(false) }}>
                        {/* <BookingForm /> */}
                        <AddBookingForm />
                    </NoCloseModal>
                </div >
            </div>
        </>
    )
}