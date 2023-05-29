import Footer from "src/components/Footer"
import NavBar from "src/components/NavBar"

export default function BookingDetail() {
    return (
        <>
            <NavBar />
            <div className="back_re">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title">
                                <h2>Review Your Booking</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="row" style={{ fontWeight: "800", margin: "20px 0 20px 0" }}>Hotel Name</div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row chekin-checkout">
                                    <div className="col-md-3">
                                        <div className="row">CHECK IN</div>
                                        <div className="row">SUN 4JUN 23</div>
                                        <div className="row">10:00</div>
                                    </div>
                                    <div className="col-md-3" style={{ margin: "0 0 0 150px" }}>
                                        <div className="row">CHECK OUT</div>
                                        <div className="row">SUN 5JUN 23</div>
                                        <div className="row">10:00</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 detailBook">
                                <div className="row" style={{ margin: "20px 0 0 20px" }}>1Night | 2 Adults | 1Room</div>
                            </div>
                        </div>
                        <div className="row">
                            <h5>Guest Details</h5>
                            <form>
                                <div className="row">
                                    <div className="col">
                                        <div className="row"><label>Title</label><br /></div>
                                        <div className="row">
                                            <select class="custom-select mr-sm-2">
                                                <option selected>Mr.</option>
                                                <option value="1">Mrs.</option>
                                                <option value="2">Ms.</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="row"><label>First name</label></div>
                                        <div className="row"><input type="text" /></div>
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            <label>Last name</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="row">
                                            <label>Email Address</label>
                                        </div>
                                        <div className="row">
                                            <input type="email" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            <label>Contact Number</label>
                                        </div>
                                        <div className="row">
                                            <input type="phone" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <span>hello</span>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}