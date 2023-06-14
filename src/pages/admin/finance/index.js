import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar4 from "src/components/Admin/SideBar4";
import Footer from "src/components/Footer";
import NavBar from "src/components/NavBar";
import NavBarAdmin from "src/components/NavBarAdmin";
import TitleBanner from "src/components/TitleBanner";
import { fetchAdminFinanceList } from "src/store/admin/finance";

export default function finance() {
    const [finances, setFinances] = useState([])
    const dispatch = useDispatch()
    const adminFinanceStore = useSelector(state => state.adminFinance)


    useEffect(() => {
        dispatch(fetchAdminFinanceList({}))
    }, [dispatch])



    useEffect(() => {
        setFinances(adminFinanceStore.data)
    }, [adminFinanceStore])



    return (
        <>
            <NavBarAdmin />
            <>
                <div className="row container">
                    <div className="col-2">
                        <SideBar4 />
                    </div>
                    <div className="col-10">
                        <TitleBanner marginBotton={'40px'} padding={'7'} title={'Transactions'} />
                        <table className="table table-bordered table-hover transaction">
                            <thead className="thead-dark">
                                <tr style={{ backgroundColor: "#38325059" }}>
                                    <th scope="col">Transaction Id</th>
                                    <th scope="col">Booking Id</th>
                                    <th scope="col">Room Category</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Payment Method</th>
                                    <th scope="col">Date of Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    finances.map((finance, i) => {
                                        return (
                                            <>
                                                <th scope="row"></th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>@mdo</td>
                                                <td>@mdo</td>
                                            </>
                                        )
                                    })
                                }
                                <tr>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
            <Footer />
        </>
    )
}
finance.guestGuard = false
finance.authGuard = true
finance.adminGuard = true