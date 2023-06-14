import { Router, useRouter } from "next/router";
import { Button } from "react-bootstrap";
import Footer from "src/components/Footer";

export default function bookingConfirm() {
    const router = useRouter();

    const onBtnClicked = () => {
        router.push('/user-booking')
    }

    return (
        <>
            <>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                />
                <title>Hotel Booking Confirmation</title>
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n    /* Add your custom CSS styles here */\n    body {\n      background-color: #f8f9fa;\n    }\n\n    .container {\n      margin-top: 50px;\n    }\n\n    .confirmation-card {\n      background-color: #ffffff;\n      padding: 20px;\n      border-radius: 10px;\n      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n    }\n\n    .confirmation-icon {\n      font-size: 48px;\n      color: #ff9500;\n    }\n  "
                    }}
                />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="confirmation-card">
                                <h2 className="text-center">
                                    <i className="fas fa-check-circle confirmation-icon" /> Booking
                                    Confirmed
                                </h2>
                                <hr />
                                <p>
                                    Thank you for choosing our hotel. Your booking has been successfully
                                    confirmed.
                                </p>
                                <div className="bookConfirm">
                                    <div className="row">
                                        <div className="col">
                                            <p>Booking details:</p>
                                            <div className="row">
                                                <div className="col">
                                                    <p>Booking Id:</p>
                                                </div>
                                                <div className="col">
                                                    <p>1234567IO</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <p>Hotel Name:</p>
                                                </div>
                                                <div className="col">
                                                    <p>Empires</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <p>Check-In:</p>
                                                </div>
                                                <div className="col">
                                                    <p>June 10, 2023</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <p>Check-Out:</p>
                                                </div>
                                                <div className="col">
                                                    <p>June 15, 2023</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <p>Room Type:</p>
                                                </div>
                                                <div className="col">
                                                    <p>Deluxe Double Room</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col" >
                                            <img src="/images/gallery1.jpg" style={{ height: "200px", width: "200px" }}></img>
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    We look forward to welcoming you. If you have any questions or need
                                    further assistance, please don't hesitate to contact us.
                                </p>
                                <hr />
                                <p className="text-center">
                                    <i className="fas fa-phone" /> Contact: +123456789
                                </p>
                                <Button onClick={onBtnClicked}>See Booking</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>

        </>
    )
}