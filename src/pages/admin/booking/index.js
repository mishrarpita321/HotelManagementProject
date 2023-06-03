import Link from "next/link"
import { useState } from "react"
import AddCategoryDialog from "src/components/Admin/category/AddCategoryDialog"
import NavBar from "src/components/NavBar"
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


    const [showAddDialog, setShowAddDialog] = useState()

    return (
        <>
            <NavBar />
            <div className="container">
                <h1>Booking List</h1>
                <input placeholder="search" /><br />
                <button onClick={() => setShowAddDialog(true)} > add +</button>
                <ul>
                    {bookingList.map((booking, i) => {
                        return (
                            <li key={booking.id}>
                                <Link href={`/admin/booking/${booking.id}`} >
                                    {booking.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                <table className="table table-bordered table-hover transaction">
                    <thead className="thead-dark">
                        <tr style={{ backgroundColor: "#38325059" }}>
                            <th scope="col">Booking Id</th>
                            <th scope="col">Guest Name</th>
                            <th scope="col">PaymentMethod</th>
                            <th scope="col">Roomcategory</th>
                            <th scope="col">RoomNo</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Arrival Dt</th>
                            <th scope="col">Departure Dt</th>
                            <th scope="col">Parking</th>
                            <th scope="col">No. of Guest</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1234</th>
                            <td>Arpita Mishra</td>
                            <td>Credit</td>
                            <td>Deluxe</td>
                            <td>750</td>
                            <td>500</td>
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
                            <td>Credit</td>
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
                <NoCloseModal show={showAddDialog} onHide={() => { setShowAddDialog(false) }}>
                    <AddCategoryDialog />
                </NoCloseModal>


            </div >
        </>
    )
}