import Footer from "src/components/Footer";
import NavBar from "src/components/NavBar";
import TitleBanner from "src/components/TitleBanner";

export default function finance() {
    return (
        <>
            <NavBar />
            <>
                <TitleBanner marginBotton={'40px'} padding={'7'} />
                {/* <div className="back_re">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="title">
                                    <h2>Transaction Details</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="container">
                    <table className="table table-bordered table-hover transaction">
                        <thead className="thead-dark">
                            <tr style={{ backgroundColor: "#38325059" }}>
                                <th scope="col">Transaction Id</th>
                                <th scope="col">Booking Id</th>
                                <th scope="col">Room Category</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Payment Method</th>
                                <th scope="col">Date of Booking</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>@fat</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                                <td>@twitter</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
            <Footer />
        </>
    )
}