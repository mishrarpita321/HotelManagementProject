import SideBar4 from "src/components/Admin/SideBar4";
import Footer from "src/components/Footer";
import NavBarAdmin from "src/components/NavBarAdmin";
import TitleBanner from "src/components/TitleBanner";
import { useState } from "react"
import NoCloseModal from "src/components/modal/NoCloseModal"
import BookingForm from "src/components/Admin/AdminBooking";
import ParkingForm from "src/components/Admin/category/ParkingForm";

export default function parking() {
    const [showAddDialog, addParkingClick] = useState()
    return (
        <div>
            <NavBarAdmin />
            <div className="row container">
                <div className="col-2">
                    <SideBar4 />
                </div>
                <div className="col-10">
                    <TitleBanner title={"Parking"} marginBotton={'40px'} padding={'7'} />
                    <button onClick={() => addParkingClick(true)} className="loginButton">+ Add Parking</button>
                    <table className="table table-bordered table-hover transaction">
                        <thead className="thead-dark">
                            <tr style={{ backgroundColor: "#38325059" }}>
                                <th scope="col">Name</th>
                                <th scope="col">Rooms Available</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2-Wheeler</td>
                                <td>67</td>
                                <td>
                                    <button className="edit">Edit</button>
                                    <button className="delete">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <NoCloseModal show={showAddDialog} onHide={() => { addParkingClick(false) }}>
                        {/* <BookingForm /> */}
                        <ParkingForm />
                    </NoCloseModal>
                </div>
            </div>
            <Footer />
        </div>
    )
}