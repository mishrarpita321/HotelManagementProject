import { config } from '@fortawesome/fontawesome-svg-core'
// import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { faMap, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
export default function Footer() {
    return (
        <>
            <footer>
                <div className="footer">
                    <div className="container">
                        <div className="row">
                            <div className=" col-md-4">
                                <h3>Contact US</h3>
                                <ul className="conta ps-0">
                                    <li>
                                        <FontAwesomeIcon icon={faMap} className="fa fa-map-marker" />
                                        <span className='ms-3'>Address</span>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faPhone} className="fa fa-mobile" />
                                        <span className='ms-3'>+01 1234569540</span>
                                        {/* <i className="fa fa-mobile" aria-hidden="true" />  */}
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faEnvelope} className="fa fa-mobile" />
                                        {/* <span className='ms-3'>+01 1234569540</span> */}
                                        <a className='ms-3' href="#"> demo@gmail.com</a>
                                        {/* <i className="fa fa-mobile" aria-hidden="true" />  */}
                                    </li>
                                    {/* <li>
                                        <i className="fa fa-envelope" aria-hidden="true" />
                                        <a href="#"> demo@gmail.com</a>
                                    </li> */}
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h3>Menu Link</h3>
                                <ul className="link_menu ps-0">
                                    <li>
                                        <a href="#">Home</a>
                                    </li>
                                    <li>
                                        <a href="about-us"> About</a>
                                    </li>
                                    <li >
                                        <a href="room">Our Room</a>
                                    </li>
                                    <li>
                                        <a href="gallery">Gallery</a>
                                    </li>

                                    <li>
                                        <a href="contact">Contact Us</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h3>News letter</h3>
                                <form className="bottom_form">
                                    <input
                                        className="enter"
                                        placeholder="Enter your email"
                                        type="text"
                                        name="Enter your email"
                                    />
                                    <button className="sub_btn">subscribe</button>
                                </form>
                                <ul className="social_icon">
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-facebook" aria-hidden="true" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-twitter" aria-hidden="true" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-linkedin" aria-hidden="true" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-youtube-play" aria-hidden="true" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="copyright">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-10 offset-md-1">
                                    <p>
                                        © 2019 All Rights Reserved. Design by{" "}
                                        <a href="https://www.srh-hochschule-heidelberg.de/en/">SRH University of Applied Sciences</a>
                                        <br />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
