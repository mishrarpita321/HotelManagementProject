import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthProvider } from 'src/context/AuthContext';
import NavBar from 'src/components/NavBar';
import Footer from 'src/components/Footer';
import Login from 'src/components/Login';
import UserRegistration from 'src/components/UserRegistration';
import ChooseBookDt from 'src/components/ChooseBookDt';
import Modal from 'src/components/modal/OurModal';
import OurModal from 'src/components/modal/OurModal';
import Auth from 'src/config/auth';
import AuthPages from 'src/components/Auth/AuthPages';
import { AlertContext } from 'src/context/AlertContext';
// import { Modal } from 'bootstrap';


export default function Home() {
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






  const { showAlert, hideAlert } = useContext(AlertContext);
  const handleClick = () => {
    alert('clicked')
    showAlert('success', 'This is a success alert!');
  };

  return (
    <>
      <NavBar showLogin={showLogin} setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} userType={userType} />
      {/* <Modal isOpen={showLogin}  ><>Hello</></Modal> */}

      <OurModal
        show={showLogin}
        onHide={() => setShowLogin(false)}
      >
        <AuthPages />
      </OurModal>
      {/* <h1>Hello</h1> */}
      {/* <h1>This is home index page by arpita</h1> */}
      {/* <Modal isOpen={loginModalOpen} onClose={closeLoginModal}>
        <AuthPages />
      </Modal> */}



      {/* {
        loginModalOpen &&
        <>
          <div>
            <button>Close</button>
            <button onClick={handleLogin}>Login</button>
          </div>
        </>
      } */}

      <>
        {/* banner */}
        <section className="banner_main">
          <div id="myCarousel" className="carousel slide banner" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="third-slide"
                  src="images/banner3.jpg"
                  alt="Third slide"
                />
              </div>

              {/* {formStep == 1 ? (
                <>
                  <Login showLogin={showLogin} setShowLogin={setShowLogin} setFormStep={setFormStep} />
                </>
              ) : (
                <>
                  <UserRegistration showLogin={showLogin} setShowLogin={setShowLogin} setFormStep={setFormStep} />
                </>
              )} */}
            </div>
          </div>
          <ChooseBookDt setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} />
        </section>
        {/* end banner */}
        {/* about */}
        <div className="about">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5">
                <div className="titlepage">
                  <h2 >About Us</h2>
                  <p>
                    The passage experienced a surge in popularity during the 1960s
                    when Letraset used it on their dry-transfer sheets, and again
                    during the 90s as desktop publishers bundled the text with their
                    software. Today it&apos;s seen all around the web; on templates,
                    websites, and stock designs. Use our generator to get your own, or
                    read on for the authoritative history of lorem ipsum.{" "}
                  </p>
                  <a className="read_more" href="Javascript:void(0)">
                    {" "}
                    Read More
                  </a>
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
        {/* end about */}
        {/* our_room */}
        <div className="our_room">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="titlepage">
                  <h2>Our Room</h2>
                  <p>The wide range of rooms available with us.. </p>
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
                      A room that can accommodate three persons and has been fitted
                      with three twin beds, one double bed and one twin bed or two
                      double beds.
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
                      Rooms are larger than the standard suite rooms. While the
                      standard hotel room is separated into a bedroom and
                      bathroom,include a living room.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end our_room */}
        {/* gallery */}
        <div className="gallery">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="titlepage">
                  <h2>gallery</h2>
                </div>
              </div>
            </div>
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
        {/* end gallery */}
        {/*  contact */}
        <div className="contact">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="titlepage">
                  <h2>Contact Us</h2>
                </div>
              </div>
            </div>
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




    </>
  )
}