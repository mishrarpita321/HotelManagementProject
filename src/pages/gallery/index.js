import { useRouter } from "next/router";
import { useState } from "react";
import AuthPages from "src/components/Auth/AuthPages";
import Footer from "src/components/Footer";
import NavBar from "src/components/NavBar";
import OurModal from "src/components/modal/OurModal";
import { useAuthProvider } from "src/context/AuthContext";
export default function Gallery() {
    const auth = useAuthProvider();
    const router = useRouter();

    const [showLogin, setShowLogin] = useState(
        () => {
            return !!router.query.requireAuth ?? false;
        }
    )
    return (<>
        <NavBar showLogin={showLogin} setShowLogin={setShowLogin} />
        <OurModal
            show={showLogin}
            onHide={() => setShowLogin(false)}
        >
            <AuthPages />
        </OurModal>
        <>
            <div className="back_re">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title">
                                <h2>gallery</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* gallery */}
            <div className="gallery">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery_img">
                                <figure>
                                    <img src="images/gallery1.jpg" alt="#" />
                                </figure>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery_img">
                                <figure>
                                    <img src="images/gallery2.jpg" alt="#" />
                                </figure>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery_img">
                                <figure>
                                    <img src="images/gallery3.jpg" alt="#" />
                                </figure>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery_img">
                                <figure>
                                    <img src="images/gallery4.jpg" alt="#" />
                                </figure>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery_img">
                                <figure>
                                    <img src="images/gallery5.jpg" alt="#" />
                                </figure>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery_img">
                                <figure>
                                    <img src="images/gallery6.jpg" alt="#" />
                                </figure>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery_img">
                                <figure>
                                    <img src="images/gallery7.jpg" alt="#" />
                                </figure>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery_img">
                                <figure>
                                    <img src="images/gallery8.jpg" alt="#" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    </>)
}