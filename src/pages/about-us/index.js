import NavBar from 'src/components/NavBar'
import Footer from 'src/components/Footer'
import { useState } from 'react';

import OurModal from 'src/components/modal/OurModal';
import AuthPages from 'src/components/Auth/AuthPages';
import { useRouter } from 'next/router';
import { useAuthProvider } from 'src/context/AuthContext';

export default function AboutUs(params) {
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

            <div className="about">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="titlepage">
                                <h2>About Us</h2>
                                <p>
                                    The passage experienced a surge in popularity during the 1960s when
                                    Letraset used it on their dry-transfer sheets, and again during the
                                    90s as desktop publishers bundled the text with their software.
                                    Today it&apos;s seen all around the web; on templates, websites, and
                                    stock designs. Use our generator to get your own, or read on for the
                                    authoritative history of lorem ipsum.{" "}
                                </p>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="about_img">
                                <figure>
                                    <img src="images/about.png" alt="#" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}