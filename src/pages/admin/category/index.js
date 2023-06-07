import Link from "next/link"
import { useState } from "react"
import SideBar4 from "src/components/Admin/SideBar4"
import AddCategoryDialog from "src/components/Admin/category/AddCategoryDialog"
import PropertyForm from "src/components/Admin/category/AddCategoryForm"
import NavBar from "src/components/NavBar"
import TitleBanner from "src/components/TitleBanner"
import NoCloseModal from "src/components/modal/NoCloseModal"

export default function Categories() {
    const [categoriesList, setCategoriesList] = useState(
        [
            {
                id: 1,
                name: 'Delux-1',
                rooms: 5,
                internet: true
            }, {
                id: 2,
                name: 'Delux-2',
                rooms: 5,
                internet: true

            }, {
                id: 3,
                name: 'Delux-3',
                rooms: 5,
                internet: true

            }
        ]
    )

    const [showAddDialog, addCategoryClick] = useState()
    const [rooms, setrooms] = useState([
        { id: 1, roomNo: 122, status: true, inventory: true, cleaning: false, category: 'deluxe' },
        { id: 2, roomNo: 222, status: true, inventory: true, cleaning: false, category: 'deluxe' },
        { id: 3, roomNo: 322, status: true, inventory: true, cleaning: false, category: 'deluxe' },
    ])

    const deleteRoomClick = (id) => {
        // alert(id)
        let newroom = { id: 4, roomNo: 322, status: true, inventory: true, cleaning: false, category: 'deluxe' }
        setRooms(rooms.filter((item) => item.id != newroom.id));

    };
    return (
        <>
            <NavBar />
            <div className="row container">
                <div className="col-2">
                    <SideBar4 />
                </div>
                <div className="col-10">
                    <TitleBanner marginBotton={'40px'} padding={'7'} title={"Category"} />
                    {/* <h1>Categories</h1> */}
                    <div className="">
                        <button onClick={() => addCategoryClick(true)} className="loginButton">+ Add Category</button>
                        <table className="table table-bordered table-hover transaction">
                            <thead className="thead-dark">
                                <tr style={{ backgroundColor: "#38325059" }}>
                                    <th scope="col">Name</th>
                                    <th scope="col">Rooms Available</th>
                                    <th scope="col">Size (sq.mt)</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Maximum Capacity</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map((room, i) => {
                                    return (
                                        <tr key={i}>
                                            <th scope="row">{room?.roomNo}</th>
                                            <td>{room?.category}</td>
                                            <td>{(room?.status ? (<>true</>) : (<>false</>))}</td>
                                            <td>{(room?.inventory ? (<>true</>) : (<>false</>))}</td>
                                            {/* <td>{(room?.cleaning ? (<>true</>) : (<>false</>))}</td> */}
                                            <td><img src="/images/checked.png" style={{height: "200px",width: "200px"}}></img></td>
                                            <td>67</td>
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

                    <NoCloseModal show={showAddDialog} onHide={() => { addCategoryClick(false) }}>
                        {/* <AddCategoryDialog /> */}
                        <PropertyForm />
                    </NoCloseModal>
                </div>
            </div >
        </>
    )
}