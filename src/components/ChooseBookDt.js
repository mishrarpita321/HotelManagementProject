import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons';


export default function ChooseBookDt() {
    const [arrivalDate, setArrivalDate] = useState(new Date());
    const [departureDate, setDepartureDate] = useState(new Date());
    return (
        <>
            <div className="booking_ocline">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="book_room">
                                <h1>Book a Room Online</h1>
                                <form className="book_now">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <span>Arrival</span>
                                            <img className="date_cua" src="images/date.png" />
                                            <DatePicker className="online_book" selected={arrivalDate} onChange={(date) => setArrivalDate(date)} />

                                            {/* <input
                                                className="online_book"
                                                placeholder="dd/mm/yyyy"
                                                type="date"
                                                name="dd/mm/yyyy"
                                            /> */}
                                        </div>
                                        <div style={{margin:"20px 0 20px 0"}} className="col-md-12">
                                            <span>Departure</span>
                                            <img className="date_cua" src="images/date.png" />
                                            <DatePicker className="online_book" selected={departureDate} onChange={(date) => setDepartureDate(date)} />

                                        </div>
                                        <div style={{margin:"0 0 20px 0"}} className="col-md-12">
                                            <span>No. of Guests</span>
                                            <input type="number" className="dare_cua online_book"></input>
                                        </div>
                                        <div className="col-md-12">
                                            <button className="book_btn">Book Now</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}