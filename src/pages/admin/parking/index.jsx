import SideBar4 from "src/components/Admin/SideBar4";
import Footer from "src/components/Footer";
import NavBarAdmin from "src/components/NavBarAdmin";
import TitleBanner from "src/components/TitleBanner";
import { useContext, useEffect, useState } from "react"
import NoCloseModal from "src/components/modal/NoCloseModal"
import AddParkingDialog from "src/components/Admin/parking/AddParkingDialog";
import { useDispatch, useSelector } from "react-redux";
import { AlertContext } from "src/context/AlertContext";
import { deleteAdminParkings, fetchAdminParkingList } from "src/store/admin/parkings";
import EditParkingDialog from "src/components/Admin/parking/EditParkingDialog";

export default function Parking() {
    const [parkings, setParkings] = useState([])
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [showEditDialog, setShowEditDialog] = useState(false)
    const dispatch = useDispatch()
    const adminParkingStore = useSelector(state => state.adminParking)
    const { showAlert } = useContext(AlertContext);



    useEffect(() => {
        dispatch(fetchAdminParkingList({}))
    }, [dispatch])

    useEffect(() => {
        setParkings(adminParkingStore.data)
    }, [adminParkingStore])

    // console.log(parkings)


    const [editRow, setEditRow] = useState(null);
    const handelOnEditClicked = (parking) => {
        console.log('edit is clicked')
        setEditRow(parking)
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



    const handleOnDeleteClicked = (parking) => {
        showAlert('confirmation', 'Are you sure to delete this Parking type?', () => {
            dispatch(deleteAdminParkings(parking?.id)).then((data) => {
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


    function formatTotalCost(totalCost) {
        const formattedCost = totalCost.toLocaleString('en-US', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        return formattedCost;
    }

    return (
        <div>
            <NavBarAdmin />
            <div className="row container">
                <div className="col-2">
                    <SideBar4 />
                </div>
                <div className="col-10">
                    <TitleBanner title={"Parking"} marginBotton={'40px'} padding={'7'} />
                    <button onClick={() => setShowAddDialog(true)} className="loginButton">+ Add Parking</button>
                    <table className="table table-bordered table-hover transaction">
                        <thead className="thead-dark">
                            <tr style={{ backgroundColor: "#38325059" }}>
                                <th scope="col">Parking Type</th>
                                <th scope="col">Price per hour</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parkings.length !== 0 && (
                                <>
                                    {parkings.map((parking, i) => {
                                        return (
                                            <tr key={parking?.id}>
                                                <td>{parking?.vehicleType}</td>
                                                <td>{formatTotalCost(parking?.price)}</td>
                                                <td>
                                                    <button onClick={handelOnEditClicked.bind(this, parking)} className="edit">Edit</button>
                                                    <button onClick={handleOnDeleteClicked.bind(this, parking)} className="delete">Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                            )}

                        </tbody>
                    </table>
                    <NoCloseModal show={showAddDialog} onHide={() => { setShowAddDialog(false) }}>
                        <AddParkingDialog setShowAddDialog={() => { setShowAddDialog(false) }} />
                    </NoCloseModal>
                    <NoCloseModal show={showEditDialog} onHide={() => { setShowEditDialog(false) }}>
                        <EditParkingDialog setShowEditDialog={() => { setShowEditDialog(false) }} editRow={editRow} setEditRow={setEditRow} />
                    </NoCloseModal>
                </div>
            </div>
            <Footer />
        </div>
    )
}
Parking.guestGuard = false
Parking.authGuard = true
Parking.adminGuard = true