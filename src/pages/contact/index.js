import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthPages from "src/components/Auth/AuthPages";
import Footer from "src/components/Footer";
import NavBar from "src/components/NavBar";
import TitleBanner from "src/components/TitleBanner";
import OurModal from "src/components/modal/OurModal";
import { useAuthProvider } from "src/context/AuthContext";

export default function Contact() {
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
    return (<>
        <NavBar showLogin={showLogin} setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} userType={userType} />
        <OurModal
            show={showLogin}
            onHide={() => setShowLogin(false)}
        >
            <AuthPages />
        </OurModal>
        <>
            {/* <div className="back_re">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title">
                                <h2>Contact Us</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <TitleBanner title={"Contact"} />
            {/*  contact */}
            <div className="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form id="request" className="main_form">
                                <div className="row">
                                    <div className="col-md-12 ">
                                        <input
                                            className="contactus"
                                            placeholder="Name"
                                            type="type"
                                            name="Name"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <input
                                            className="contactus"
                                            placeholder="Email"
                                            type="type"
                                            name="Email"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <input
                                            className="contactus"
                                            placeholder="Phone Number"
                                            type="type"
                                            name="Phone Number"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <textarea
                                            className="textarea"
                                            placeholder="Message"
                                            type="type"
                                            message="Name"
                                            defaultValue={"Message"}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <button className="send_btn">Send</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <div className="map_main">
                                <div className="map-responsive">
                                    <iframe
                                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France"
                                        width={600}
                                        height={400}
                                        frameBorder={0}
                                        style={{ border: 0, width: "100%" }}
                                        allowFullScreen=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        <Footer />
    </>)
}