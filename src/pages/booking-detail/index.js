import Footer from "src/components/Footer"
import NavBar from "src/components/NavBar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import TitleBanner from "src/components/TitleBanner";
import { useRouter } from "next/router";
import { CartContext } from "src/context/CartContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import userConfig from "src/config/userConfig";
import { addAdminBooking } from "src/store/admin/bookings";
import { AlertContext } from "src/context/AlertContext";
import { useDispatch } from "react-redux";
import Spinner from "src/components/spinnner/PageSpinner";
import { useAuthProvider } from "src/context/AuthContext";


export default function BookingDetail() {
    const dispatch = useDispatch();
    const { showAlert } = useContext(AlertContext);
    const [isLoading, setIsLoading] = useState(false);



    const auth = useAuthProvider();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(false);
    useEffect(() => {
        if ((JSON.parse(window.localStorage.getItem("userData"))?.role == '[ADMIN]')) {
            setUserType('admin')
        } else {
            setUserType('user')
        }
        // let userData= strin window.localStorage.getItem('userData')
        if (window.localStorage.getItem("accessToken")) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);


    const [showLogin, setShowLogin] = useState(
        () => {
            return !!router.query.requireAuth ?? false;
        }
    )


    // const [guests, setGuests] = useState([{ title: 'Mr.', firstName: '', lastName: '', email: '', contactNumber: '' }]);
    const [guests, setGuests] = useState([]);

    const { selectedRooms, addToCart, removeFromCart, arrivalDate, setArrivalDate, deptDate, setDeptDate, guestCount } = useContext(CartContext)

    const [estimatedCost, setEstimatedCost] = useState(0)
    // const { roomNumbers, arrivalDate, deptDate } = router.query;

    function calculateNumNights(arrivalDate, deptDate) {
        const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

        // Convert the dates to JavaScript Date objects
        const arrival = new Date(arrivalDate);
        const departure = new Date(deptDate);

        // Set the time to 12:00 PM for both dates
        arrival.setHours(12, 0, 0, 0);
        departure.setHours(12, 0, 0, 0);

        // Calculate the difference in days
        const diffDays = Math.round(Math.abs((departure - arrival) / oneDay));

        // Calculate the number of nights
        const numNights = diffDays;

        return numNights;
    }
    function formatTimestamp(timestamp) {
        const options = {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };

        return new Date(timestamp).toLocaleDateString('en-US', options);
    }
    function formatDateforApi(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    useEffect(() => {
        console.log(selectedRooms)
        console.log(arrivalDate)
        console.log(deptDate)
        console.log(guestCount)
        if (selectedRooms.length === 0 || arrivalDate === null || deptDate === null || guestCount === 0) {
            router.push({
                pathname: '/rooms-available',
                // query: queryParams,
            });
        }


        const fetchEstimatedCost = async () => {
            const headers = {
                Accept: 'application/json',
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "*",
                Authorization: 'Bearer ' + window.localStorage.getItem(userConfig.storageTokenKeyName)
            };

            try {
                const response = await axios.get(userConfig.userGetEstimatedCostEndpoint + '?roomNumbers=' + selectedRooms.join(",") + '&arrivalDate=' + formatDateforApi(arrivalDate) + '&deptDate=' + formatDateforApi(deptDate) + '&isActive=true', { headers });
                console.log('response is:', response);
                setEstimatedCost(response.data.estimatedPrice);
            } catch (e) {
                console.log('error is:', e);
            }
        };

        fetchEstimatedCost();
    }, [selectedRooms, arrivalDate, deptDate]);










    const handleGuestChange = (index, event) => {
        const { name, value } = event.target;
        const updatedGuests = [...guests];
        updatedGuests[index][name] = value;
        setGuests(updatedGuests);
    };






    const handleAddGuest = () => {
        const isAnyRowIncomplete = guests.some(
            (row) => !row.firstName || !row.lastName
        );
        if (!isAnyRowIncomplete) {
            setGuests([...guests, { title: 'Mr.', firstName: '', lastName: '', email: '', contactNumber: '' }]);
        }
    };

    const handleRemoveGuest = (index) => {
        const updatedGuests = [...guests];
        updatedGuests.splice(index, 1);
        setGuests(updatedGuests);
    };

    function transformData(inputData) {
        return inputData.map((item) => ({
            name: `${item.title} ${item.firstName} ${item.lastName}`,
        }));
    }
    const handleConfirmBooking = () => {
        // const formData = { parkingRows, guestRows, selectedRoomList };

        let formData = {
            email: JSON.parse(window.localStorage.getItem('userData')).email,
            arrival: arrivalDate,
            departure: deptDate,
            guestRows: transformData(guests),
            selectedRoomList: selectedRooms,
            size: guestCount,
            parkingRows: []
        }
        // console.log(data)
        dispatch(addAdminBooking(formData)).then((data) => {
            setIsLoading(true)
            console.log(data)
            if (data?.payload?.status === 'success') {
                // setUpdate(update + 1)
                onAlertSuccessHandle(data?.payload?.message);
            } else {
                onAlertErrorHandle(data?.payload?.message);
            }
            setIsLoading(false)
        });
    }

    const onAlertErrorHandle = (message) => {
        showAlert('error', message, () => {
            console.log('Ok button clicked');
        });
    };

    const onAlertSuccessHandle = (message) => {
        showAlert('success', message, () => { }, () => { }, () => {
            router.push("/booking-confirm")
        });
    };

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
        <>
            <NavBar showLogin={showLogin} setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} userType={userType} />
            <TitleBanner title={"Review Your Booking"} />
            {isLoading ? (<Spinner />) : (
                <>
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
                                                    {/* <div className="row">SUN 4 JUN 23</div> */}
                                                    <div className="row">{formatTimestamp(arrivalDate)}</div>
                                                    {/* <div className="row">10:00</div> */}
                                                </div>
                                                <div className="col" style={{ display: "grid", justifyContent: "flex-end" }}>
                                                    <div className="row">CHECK OUT</div>
                                                    {/* <div className="row">SUN 5JUN 23</div> */}
                                                    <div className="row">{formatTimestamp(deptDate)}</div>
                                                    {/* <div className="row">10:00</div> */}
                                                </div>
                                            </div>
                                            <div className="row" style={{ marginTop: '5px', backgroundColor: '#52404014' }}>
                                                <p>Rooms Selected</p>
                                                <div>{selectedRooms.join(",")}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 detailBook">
                                            <div className="row" style={{ margin: "20px 0 0 20px" }}>{calculateNumNights(arrivalDate, deptDate)} Night | {guestCount} Adults | {selectedRooms.length} Room</div>
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
                                    {guests.map((guest, index) => {
                                        return (
                                            <>
                                                <div className="row guestForm" >
                                                    <h5>Guest Details</h5>
                                                    <form style={{ position: "relative" }}>
                                                        <div className="col">
                                                            <div className="row">
                                                                <label>&nbsp;</label>
                                                            </div>
                                                            <div className="row">
                                                                {/* {index > 0 && ( */}
                                                                <button type="button" style={{ top: "-39px", right: "10px", position: "absolute", width: "fit-content" }} className="btn btn-danger" onClick={() => handleRemoveGuest(index)}>
                                                                    Remove
                                                                </button>
                                                                {/* )} */}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="row"><label>Title</label><br /></div>
                                                                <div className="row">
                                                                    <select class="custom-select mr-sm-2"
                                                                        name="title"
                                                                        value={guest.title}
                                                                        onChange={(event) => handleGuestChange(index, event)}
                                                                    >
                                                                        <option selected>Mr.</option>
                                                                        <option value="1">Mrs.</option>
                                                                        <option value="2">Ms.</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="row">
                                                                    <label>First name</label>
                                                                </div>
                                                                <div className="row">
                                                                    <input type="text"
                                                                        name="firstName"
                                                                        value={guest.firstName}
                                                                        onChange={(event) => handleGuestChange(index, event)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="row">
                                                                    <label>Last name</label>
                                                                </div>
                                                                <div className="row">
                                                                    <input
                                                                        type="text"
                                                                        name="lastName"
                                                                        value={guest.lastName}
                                                                        onChange={(event) => handleGuestChange(index, event)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>
                                            </>
                                        )
                                    })}

                                    {/* <div className="row guestForm" >
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
                            </div> */}
                                    <div className="row"><button className="addGuestBtn" onClick={handleAddGuest}>+Add Guest</button></div>
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
                                                        <p>{selectedRooms.length} Room x {calculateNumNights(arrivalDate, deptDate)} Night</p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="row priceAlign">
                                                        <p> {formatTotalCost(estimatedCost - 10)}</p>
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
                                                        <p>{formatTotalCost(10)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="row priceRow">
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
                                    </div> */}
                                            <div className="row" style={{ backgroundColor: "burlywood" }}>
                                                <div className="col">
                                                    <div className="row">
                                                        <p>Total Amount to be paid</p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="row priceAlign">
                                                        <p>{formatTotalCost(estimatedCost)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ justifyContent: "flex-end" }} className="row"><button className="addGuestBtn" onClick={handleConfirmBooking}>Confirm Booking</button></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            )}

            <Footer />
        </>
    )
}
BookingDetail.guestGuard = false
BookingDetail.authGuard = true
BookingDetail.adminGuard = false