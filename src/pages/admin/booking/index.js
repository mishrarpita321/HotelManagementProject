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


                <NoCloseModal show={showAddDialog} onHide={() => { setShowAddDialog(false) }}>
                    <AddCategoryDialog />
                </NoCloseModal>


            </div >
        </>
    )
}