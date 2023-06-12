import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Footer from "src/components/Footer"
import NavBar from "src/components/NavBar"
import TitleBanner from "src/components/TitleBanner"
import { CartContext } from "src/context/CartContext"
import { fetchAdminRoomsList } from "src/store/user/availableRooms"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/router"

const AvailableRooms = () => {
    const router = useRouter();
    // const [arrivalDate, setArrivalDate] = useState('2023-06-10');
    // const [deptDate, setDeptDate] = useState('2023-06-15');
    const { selectedRooms, addToCart, removeFromCart, arrivalDate, setArrivalDate, deptDate, setDeptDate, setGuestCount } = useContext(CartContext)
    const dispatch = useDispatch()
    const availableRoomStore = useSelector(state => state.adminRoom)
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        setArrivalDate(Date.parse('2023-06-10'))
        setDeptDate(Date.parse('2023-06-16'))
        setGuestCount(6)
    }, [])


    useEffect(() => {
        dispatch(fetchAdminRoomsList({}))
    }, [dispatch])

    useEffect(() => {
        setRooms(availableRoomStore.data)
        if (selectedRooms.length > 0) {
            markSelectedRooms();
        }
    }, [availableRoomStore])

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


    function categorizeRooms() {
        const categorizedRooms = {};

        rooms.forEach((room) => {
            const { category, roomNo, isActive, imageData, selected } = room;

            if (category) {
                if (categorizedRooms[category.title]) {
                    categorizedRooms[category.title].push({
                        roomNo,
                        category,
                        isActive,
                        imageData,
                        selected,
                    });
                } else {
                    categorizedRooms[category.title] = [
                        { roomNo, category, isActive, imageData, selected },
                    ];
                }
            }
        });

        return categorizedRooms;
    }



    const categorizedRooms = categorizeRooms();
    console.log(rooms)
    console.log(categorizedRooms)


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


    const bookNowClicked = () => {
        // const queryParams = `?roomNumbers=${selectedRooms.join(',')}&arrivalDate=${arrivalDate}&deptDate=${deptDate}`;

        router.push({
            pathname: '/booking-detail',
            // query: queryParams,
        });
    }
    // console.log()
    return (
        <>
            <NavBar />
            <TitleBanner marginBotton={"-12px"} padding={'10'} title={"Rooms Available for Booking"} />

            <button onClick={bookNowClicked} className="loginButton" style={{ float: "right", marginTop: "30px", marginRight: "180px" }}>Book Now</button>
            <div style={{ float: "right", marginTop: "44px", marginRight: "20px" }}>{selectedRooms.map((room) => (<>{room}, </>))}</div>
            {Object.entries(categorizedRooms).map(([category, rooms]) => (
                <div key={category}>
                    <h3 style={{ marginTop: '70px' }} className="categoryRibbon">{category}</h3>
                    <div className="container">
                        <div className="row">
                            {rooms.map((room) => {
                                return (
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 roomCard" >
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
                                                    <img src="images/gallery1.jpg" alt="room" ></img>
                                                </div>
                                                <div className="row">
                                                    <div style={{ margin: "9px 0 0 0" }} className="row">
                                                        <div className="col-10">Rooms No</div>
                                                        <div className="col-2">{room.roomNo}</div>
                                                    </div>
                                                    <div style={{ margin: "9px 0 0 0" }} className="row">
                                                        <div className="col-10">Price</div>
                                                        <div className="col-2">{room.category.price}</div>
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



            {/* <div className="container">
                <div className="row">
                    {
                        rooms.map((room, i) => {
                            return (
                                <>
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 roomCard" >
                                        <div className="roomChildCard" >
                                            <div className="row position-relative roomBox">
                                                <div className="ribbon">
                                                    <span className="position-absolute roomCategoryRibbon">
                                                        {room.name}
                                                    </span>
                                                </div>
                                                <div>
                                                    <img src="images/gallery1.jpg" alt="room" ></img>
                                                </div>
                                                <div className="row">
                                                    <div style={{ margin: "9px 0 0 0" }} className="row">
                                                        <div className="col-10">Rooms No</div>
                                                        <div className="col-2">{room.roomNo}</div>
                                                    </div>
                                                    <div style={{ margin: "9px 0 0 0" }} className="row">
                                                        <div className="col-10">Price</div>
                                                        <div className="col-2">{room.category.price}</div>
                                                    </div>
                                                </div>
                                                <div className="row" style={{ justifyContent: "center", margin: "9px 0 0 0" }}>
                                                    <button className="bookButton">Select</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )

                        })
                    }

                </div>

            </div> */}
            {/* <h3 style={{ marginTop: '70px' }} className="categoryRibbon">Deluxe</h3>
            <div className="container">
                <div className="row">
                    {
                        rooms.map((room, i) => {
                            return (
                                <>
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 roomCard" >
                                        <div className="roomChildCard" >
                                            <div className="row position-relative roomBox">
                                                <div className="ribbon">
                                                    <span className="position-absolute roomCategoryRibbon">
                                                        {room.name}
                                                    </span>
                                                </div>
                                                <div>
                                                    <img src="images/gallery1.jpg" alt="room" ></img>
                                                </div>
                                                <div className="row">
                                                    <div style={{ margin: "9px 0 0 0" }} className="row">
                                                        <div className="col-10">Rooms Available</div>
                                                        <div className="col-2">4</div>
                                                    </div>
                                                    <div style={{ margin: "9px 0 0 0" }} className="row">
                                                        <div className="col-10">Price</div>
                                                        <div className="col-2">{room.price}</div>
                                                    </div>
                                                </div>
                                                <div className="row" style={{ justifyContent: "center", margin: "9px 0 0 0" }}>
                                                    <button className="bookButton">Select</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )

                        })
                    }

                </div>

            </div> */}
            <Footer />
        </>
    )
}
AvailableRooms.guestGuard = false
AvailableRooms.authGuard = true
AvailableRooms.adminGuard = false
export default AvailableRooms