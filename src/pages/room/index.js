import { useRouter } from "next/router";
import { useState } from "react";
import AuthPages from "src/components/Auth/AuthPages";
import Footer from "src/components/Footer";
import NavBar from "src/components/NavBar";
import OurModal from "src/components/modal/OurModal";
import { useAuthProvider } from "src/context/AuthContext";

export default function Room(params) {
    const auth = useAuthProvider();
    const router = useRouter();

    const [showLogin, setShowLogin] = useState(
        () => {
            return !!router.query.requireAuth ?? false;
        }
    )
    return (
        <>
            <NavBar showLogin={showLogin} setShowLogin={setShowLogin} />
            <OurModal
                show={showLogin}
                onHide={() => setShowLogin(false)}
            >
                <AuthPages />
            </OurModal>
            <div className="back_re">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title">
                                <h2>Our Room</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="our_room">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlepage">
                                <p className="margin_0">
                                    The wide range of rooms available with us..
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-6">
                            <div id="serv_hover" className="room">
                                <div className="room_img">
                                    <figure>
                                        <img src="images/room1.jpg" alt="#" />
                                    </figure>
                                </div>
                                <div className="bed_room">
                                    <h3>Presidential suite</h3>
                                    <p>
                                        A room that can accommodate three persons and has been fitted with
                                        three twin beds, one double bed and one twin bed or two double
                                        beds.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div id="serv_hover" className="room">
                                <div className="room_img">
                                    <figure>
                                        <img src="images/room2.jpg" alt="#" />
                                    </figure>
                                </div>
                                <div className="bed_room">
                                    <h3>Suite</h3>
                                    <p>
                                        A living room connected with to one or more bedrooms.A room with
                                        one or more bedrooms and a separate living space.Size between 70 to 100 m²
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div id="serv_hover" className="room">
                                <div className="room_img">
                                    <figure>
                                        <img src="images/room3.jpg" alt="#" />
                                    </figure>
                                </div>
                                <div className="bed_room">
                                    <h3>Deluxe</h3>
                                    <p>
                                        A room with a king-sized bed. May be occupied by one or more
                                        people.The room size or area of King Rooms are generally between
                                        32 m² to 50 m².{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div id="serv_hover" className="room">
                                <div className="room_img">
                                    <figure>
                                        <img src="images/room4.jpg" alt="#" />
                                    </figure>
                                </div>
                                <div className="bed_room">
                                    <h3>Executive Suite</h3>
                                    <p>
                                        Rooms have one or more bedrooms, with a large living area, and
                                        even a dining area too. They offer high-quality amenities and
                                        supplies.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div id="serv_hover" className="room">
                                <div className="room_img">
                                    <figure>
                                        <img src="images/room5.jpg" alt="#" />
                                    </figure>
                                </div>
                                <div className="bed_room">
                                    <h3>Studio</h3>
                                    <p>
                                        A studio bed - a couch that can be converted into a bed. These
                                        types of rooms can also have an additional bed.{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div id="serv_hover" className="room">
                                <div className="room_img">
                                    <figure>
                                        <img src="images/room6.jpg" alt="#" />
                                    </figure>
                                </div>
                                <div className="bed_room">
                                    <h3>Standard suite rooms</h3>
                                    <p>
                                        Rooms are larger than the standard suite rooms. While the standard
                                        hotel room is separated into a bedroom and bathroom,include a
                                        living room as well.{" "}
                                    </p>
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