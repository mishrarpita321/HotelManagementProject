import { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Footer from "src/components/Footer"
import NavBar from "src/components/NavBar"
import TitleBanner from "src/components/TitleBanner"
import { CartContext } from "src/context/CartContext"
import { fetchAdminRoomsList } from "src/store/user/availableRooms"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/router"
import Spinner from "src/components/spinnner/PageSpinner"
import { AlertContext } from "src/context/AlertContext"
import { useAuthProvider } from "src/context/AuthContext"

const AvailableRooms = () => {
    const router = useRouter();
    // const [arrivalDate, setArrivalDate] = useState('2023-06-10');
    // const [deptDate, setDeptDate] = useState('2023-06-15');
    const { selectedRooms, addToCart, removeFromCart, arrivalDate, setArrivalDate, deptDate, setDeptDate, guestCount, setGuestCount } = useContext(CartContext)
    const dispatch = useDispatch()
    const availableRoomStore = useSelector(state => state.adminRoom)
    const [rooms, setRooms] = useState([])
    const roomRef = useRef([]);
    const isFirstRender = useRef(true)
    const [loading, setLoading] = useState(false)

    const { showAlert } = useContext(AlertContext);
    const auth = useAuthProvider();
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

    useEffect(() => {
        setLoading(true)
        if (arrivalDate == '' || deptDate == '' || guestCount == 0) {
            router.push('/')
        }
        setLoading(false)
    }, [])


    useEffect(() => {
        dispatch(fetchAdminRoomsList({ arrivalDate, deptDate }))
    }, [dispatch])

    useEffect(() => {
        setRooms(availableRoomStore.data);
    }, [availableRoomStore]);

    console.log(arrivalDate)
    console.log(deptDate)
    console.log(guestCount)
    // useEffect(() => {
    //     if (selectedRooms.length > 0 && rooms.length > 0) {
    //         markSelectedRooms();
    //     }
    // }, [selectedRooms, rooms]);

    // useEffect(() => {
    //     if (rooms.length > 0) {
    //         markSelectedRooms();
    //     }
    // }, []);

    // Function to retrieve selected rooms from local storage
    // const getSelectedRoomsFromLocalStorage = () => {
    //     const selectedRoomsFromLocalStorage = localStorage.getItem("selectedRooms");
    //     return selectedRoomsFromLocalStorage ? JSON.parse(selectedRoomsFromLocalStorage) : [];
    // };

    // CSS classes for the buttons
    const selectButtonClass = 'selectButton';
    const deselectButtonClass = 'deselectButton';

    // CSS classes for the tick icon
    const tickIconClass = 'tickIcon';


    function formatTotalCost(totalCost) {
        const formattedCost = totalCost.toLocaleString('en-US', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        return formattedCost;
    }


    function categorizeRooms() {
        const categorizedRooms = {};

        rooms.forEach((room) => {
            const { category, roomNo, isActive, imageData, selected } = room;

            if (category) {
                const isSelected = selected || selectedRooms.includes(roomNo);
                if (categorizedRooms[category.title]) {
                    categorizedRooms[category.title].push({
                        roomNo,
                        category,
                        isActive,
                        imageData,
                        selected: isSelected,
                    });
                } else {
                    categorizedRooms[category.title] = [
                        { roomNo, category, isActive, imageData, selected: isSelected },
                    ];
                }
            }
        });

        return categorizedRooms;
    }



    const categorizedRooms = categorizeRooms();
    // console.log(rooms)
    // console.log(categorizedRooms)


    // useEffect(() => {
    //     if (selectedRooms.length !== 0) {
    //         alert('hi')
    //         categorizeRooms();
    //     }
    // }, [])


    // Handler for toggling room selection
    const handleRoomSelect = (roomNo) => {

        const updatedRooms = rooms.map((room) => {
            if (room.roomNo === roomNo) {
                return {
                    ...room,
                    selected: !room.selected,
                };
            }
            return room;
        });

        setRooms(updatedRooms);

        // Add or remove from cart based on selection
        if (selectedRooms.includes(roomNo)) {
            removeFromCart(roomNo);
        } else {
            addToCart(roomNo);
        }
    };

    const markSelectedRooms = () => {
        // console.log(rooms)
        const updatedRooms = rooms.map((room) => {
            if (selectedRooms.includes(room.roomNo)) {
                return {
                    ...room,
                    selected: true,
                };
            }
            return room;
        });
        setRooms(updatedRooms);
    };

    const onAlertErrorHandle = (message) => {
        showAlert('error', message, () => {
            console.log('Ok button clicked');
        });
    };


    const bookNowClicked = () => {
        // const queryParams = `?roomNumbers=${selectedRooms.join(',')}&arrivalDate=${arrivalDate}&deptDate=${deptDate}`;
        setLoading(true)
        if (selectedRooms.length == 0) {
            onAlertErrorHandle('Please Select atleast room.');
        } else {
            router.push({
                pathname: '/booking-detail',
                // query: queryParams,
            });
        }
        setLoading(false)



    }
    // console.log()
    return (
        <>
            <NavBar showLogin={showLogin} setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} userType={userType} />
            <TitleBanner marginBotton={"-12px"} padding={'10'} title={"Rooms Available for Booking"} />


            {loading ? (
                <>
                    <Spinner />
                </>
            ) : (
                <>
                    <button onClick={bookNowClicked} className="loginButton" style={{ float: "right", marginTop: "30px", marginRight: "180px" }}>Book Now</button>
                    {/* <div style={{ float: "right", marginTop: "44px", marginRight: "20px" }}>{selectedRooms.map((room) => (<>{room}, </>))}</div> */}
                    {Object.entries(categorizedRooms).map(([category, rooms]) => (
                        <div key={category}>
                            <h3 style={{ marginTop: '70px' }} className="categoryRibbon">{category}</h3>
                            <div className="container">
                                <div className="row">
                                    {rooms.map((room, i) => {
                                        return (
                                            <div key={i} className="col-xs-12 col-sm-6 col-md-4 col-lg-4 roomCard" >
                                                {/* <div class="overlay"></div> */}
                                                {/* <div class="tickIcon"></div> */}
                                                <div className="roomChildCard" >
                                                    {room.selected && (
                                                        <div className="tickIcon">
                                                            <FontAwesomeIcon icon={faCheck} />
                                                        </div>
                                                    )}
                                                    <div className="row position-relative roomBox">
                                                        <div className="ribbon">
                                                            <span className="position-absolute roomCategoryRibbon">
                                                                {category}
                                                                {/* {room.selected ? ('true') : ('false')} */}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            {/* <img src="images/gallery1.jpg" alt="room" style={{width: '105%',maxWidth:"unset"}}></img> */}
                                                            <img src="images/gallery1.jpg" alt="room" ></img>
                                                        </div>
                                                        <div className="row">
                                                            <div style={{ margin: "9px 0 0 0" }} className="row">
                                                                <div className="col">Rooms No</div>
                                                                <div style={{display:"contents"}} className="col">{room.roomNo}</div>
                                                            </div>
                                                            <div style={{ margin: "9px 0 0 0" }} className="row">
                                                                <div className="col">Price</div>
                                                                <div style={{display:"contents"}} className="col">{formatTotalCost(room.category.price)}</div>
                                                            </div>
                                                            <div style={{ margin: "9px 0 0 0" }} className="row">
                                                                <div className="col">Max Capacity</div>
                                                                <div style={{display:"contents"}} className="col">{room.category.maxPeopleAllowed}</div>
                                                            </div>
                                                        </div>
                                                        <div className="row" style={{ justifyContent: "center", margin: "9px 0 0 0" }}>
                                                            {/* <button className="bookButton">Select</button> */}
                                                            <button
                                                                className={`bookButton ${room.selected ? deselectButtonClass : selectButtonClass}`}
                                                                onClick={() => handleRoomSelect(room.roomNo)}>
                                                                {room.selected ? "Deselect" : "Select"}
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                </>
            )}





            <Footer />
        </>
    )
}
AvailableRooms.guestGuard = false
AvailableRooms.authGuard = true
AvailableRooms.adminGuard = false
export default AvailableRooms