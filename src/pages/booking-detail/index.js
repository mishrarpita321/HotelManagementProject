import Footer from "src/components/Footer"
import NavBar from "src/components/NavBar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import TitleBanner from "src/components/TitleBanner";

export default function BookingDetail() {
    return (
        <>
            <NavBar />
            <TitleBanner title={"Review Your Booking"}/>
            <div className="bookDetail">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row"><h5 style={{ margin: "20px 0 20px 0" }}>Hotel Name</h5></div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row chekin-checkout">
                                        <div className="col">
                                            <div className="row">CHECK IN</div>
                                            <div className="row">SUN 4JUN 23</div>
                                            <div className="row">10:00</div>
                                        </div>
                                        <div className="col" style={{ margin: "0 0 0 150px" }}>
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
                                    <ul style={{ padding: 0 }}>
                                        <li>
                                            <FontAwesomeIcon icon={faCheck} className="fas fa-check" style={{ color: "#c00079" }} />
                                            <span style={{ marginLeft: "10px" }}>Room With Breakfast + Lunch + Dinner</span>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faCheck} className="fas fa-check" style={{ color: "#c00079" }} />
                                            <span style={{ marginLeft: "10px" }}>Passport, Aadhar, Driving License and Govt. ID are accepted as ID proof(s)</span>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faCheck} className="fas fa-check" style={{ color: "#c00079" }} />
                                            <span style={{ marginLeft: "10px" }}>Pets are allowed.</span>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faCheck} className="fas fa-check" style={{ color: "#c00079" }} />
                                            <span style={{ marginLeft: "10px" }}>Outside food is not allowed.</span>
                                        </li>
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
                                <div className="container" style={{ marginTop: "14px" }}>
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
                                    <div className="row priceRow">
                                        <div className="col">
                                            <div className="row">
                                                <p>Parking Fees</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row priceAlign">
                                                <p>$ 10</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ backgroundColor: "burlywood" }}>
                                        <div className="col">
                                            <div className="row">
                                                <p>Total Amount to be paid</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row priceAlign">
                                                <p>$ 41</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}