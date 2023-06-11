import { useState } from "react"
import Footer from "src/components/Footer"
import NavBar from "src/components/NavBar"
import TitleBanner from "src/components/TitleBanner"

const AvailableRooms = () => {

    const [rooms, setRooms] = useState(
        [
            {
                name: 'Presidential Suite',
                price: '30'
            },
            {
                name: 'Standard Suite',
                price: '40'
            },
            {
                name: 'Delux-2',
                price: '50'
            },
            {
                name: 'Delux-2',
                price: '50'
            },
            {
                name: 'Delux-2',
                price: '50'
            },
            {
                name: 'Delux-2',
                price: '50'
            },
        ]


    )
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", rooms)
    return (
        <>
            <NavBar />
            <TitleBanner marginBotton={"-12px"} padding={'10'} title={"Rooms Available for Booking"} />
            <button className="loginButton" style={{float:"right",marginTop:"30px",marginRight:"180px"}}>Book Now</button>
            <h3 style={{marginTop:'70px'}} className="categoryRibbon">Presidential Suite</h3>
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

            </div>
            <h3 style={{marginTop:'70px'}} className="categoryRibbon">Deluxe</h3>
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

            </div>
            <Footer />
        </>
    )
}
AvailableRooms.guestGuard = false
AvailableRooms.authGuard = true
AvailableRooms.adminGuard = false
export default AvailableRooms