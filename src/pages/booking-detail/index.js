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
                        <h5 style={{ margin: "20px 0 20px 0" }}>Hotel Name</h5>
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
                        <div className="row liItems">
                            <div className="col">
                                <h5>Important Details</h5>
                                <ul>
                                    <li>Room With Breakfast + Lunch + Dinner</li>
                                    <li>Passport, Aadhar, Driving License and Govt. ID are accepted as ID proof(s)</li>
                                    <li>Pets are allowed.</li>
                                    <li>Outside food is not allowed.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="row guestForm" >
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
                        <div className="row guestForm" >
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
                        <div className="row"><button className="addGuestBtn">+Add Guest</button></div>
                    </div>
                    <div className="col">
                        <div className="containerPrice">
                            <div className="row">
                                <h5>Price Breakup</h5>
                            </div>
                            <div className="row priceRow" >
                                <div className="col">
                                    <div className="row">
                                        <p>1 Room x 1 Night</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row priceAlign">
                                        <p>$ 21</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row priceRow">
                                <div className="col">
                                    <div className="row">
                                        <p>Service Fees</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row priceAlign">
                                        <p>$ 10</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ backgroundColor: "burlywood"}}>
                                <div className="col">
                                    <div className="row">
                                        <p>Total Amount to be paid</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row priceAlign">
                                        <p>$ 210</p>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="card">
                                    <div class="card-body">
                                        <h5>Price Breakup</h5>
                                        <p>1 Room x 1 Night</p>

                                        <h6 class="card-subtitle mb-2 text-muted">Base Price</h6>
                                        <p class="card-text">₹ 21,000</p>

                                        <h6 class="card-subtitle mb-2 text-muted">Total Discount</h6>
                                        <p class="card-text">₹ 1,470</p>

                                        <h6 class="card-subtitle mb-2 text-muted">Price after Discount</h6>
                                        <p class="card-text">₹ 19,530</p>

                                        <h6 class="card-subtitle mb-2 text-muted">Service Fees</h6>
                                        <p class="card-text">₹ 1,470</p>

                                        <h6 class="card-subtitle mb-2 text-muted">Donate ₹5 to support responsible tourism initiatives. T&amp;Cs</h6>
                                        <p class="card-text">₹ 5</p>

                                        <h6 class="card-subtitle mb-2 text-muted">Total Amount to be paid</h6>
                                        <p class="card-text">₹ 21,005</p>
                                    </div>
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}