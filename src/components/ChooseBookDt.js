import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from 'src/context/CartContext';
import { formatDateforApi } from 'src/helper/get-date-format-for-api';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import adminConfig from 'src/config/adminConfig';
import axios from 'axios';

export default function ChooseBookDt({ setShowLogin, isLoggedIn }) {
    const { clearCart, selectedRooms, addToCart, removeFromCart, arrivalDate, setArrivalDate, deptDate, setDeptDate, setGuestCount } = useContext(CartContext);
    const router = useRouter();
    const [maxGuest, setMaxGuest] = useState(10); // Maximum number of guests allowed
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    useEffect(() => {
        clearCart();
        const arrival = formatDateforApi(today);
        const departure = formatDateforApi(tomorrow);
        fetchMaxGuest(arrival, departure);
    }, []);

    const schema = yup.object().shape({
        arrival: yup.date().required('Arrival date is required'),
        departure: yup.date().required('Departure date is required'),
        noOfGuests: yup
            .number()
            .typeError('Please enter a valid number')
            .positive('Number of guests must be positive')
            .max(maxGuest, 'Number of guests cannot exceed the maximum allowed')
            .required('Number of guests is required'),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            arrival: today,
            departure: tomorrow,
            noOfGuests: 1,
        },
    });

    const onSubmit = (data) => {
        // Handle form submission
        if (isLoggedIn) {
            console.log(data);
            setArrivalDate(formatDateforApi(data.arrival));
            setDeptDate(formatDateforApi(data.departure));
            setGuestCount(data.noOfGuests);
            router.push("/rooms-available");
        } else {
            setShowLogin(true)
        }
    };

    const fetchMaxGuest = async (arrival, departure) => {
        try {
            const url = `https://rest-hms.herokuapp.com/hms/max/guests?arrivalDate=${formatDateforApi(arrival)}&deptDate=${formatDateforApi(departure)}`;
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
            };
            const response = await axios.get(url, { headers });
            const { maxGuestAllowed } = response.data;
            setMaxGuest(maxGuestAllowed);
        } catch (error) {
            console.log("Error fetching maxGuest value:", error);
        }
    };


    const handleDateChange = async (field, date) => {
        field.onChange(date);
        console.log(date)
        const arrivalDate = formatDateforApi(date);
        const departureDate = formatDateforApi(field.value);
        await fetchMaxGuest(arrivalDate, departureDate);
    };

    return (
        <>
            <div className="booking_ocline">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="book_room">
                                <h1>Book a Room Online</h1>
                                <form className="book_now" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <span>Arrival</span>
                                            <img className="date_cua" src="images/date.png" />
                                            <Controller
                                                control={control}
                                                name="arrival"
                                                render={({ field }) => (
                                                    <DatePicker
                                                        className="online_book"
                                                        selected={field.value}
                                                        onChange={(date) => handleDateChange(field, date)}
                                                        required
                                                    />
                                                )}
                                            />
                                            {errors?.arrival && (
                                                <span className="text-danger">{errors.arrival.message}</span>
                                            )}
                                        </div>
                                        <div style={{ margin: '20px 0 20px 0' }} className="col-md-12">
                                            <span>Departure</span>
                                            <img className="date_cua" src="images/date.png" />
                                            <Controller
                                                control={control}
                                                name="departure"
                                                render={({ field }) => (
                                                    <DatePicker
                                                        className="online_book"
                                                        selected={field.value}
                                                        onChange={(date) => handleDateChange(field, date)}
                                                        required
                                                    />
                                                )}
                                            />
                                            {errors?.departure && (
                                                <span className="text-danger">{errors.departure.message}</span>
                                            )}
                                        </div>
                                        <div style={{ margin: '0 0 20px 0' }} className="col-md-12">
                                            <span>No. of Guests</span>
                                            <Controller
                                                control={control}
                                                name="noOfGuests"
                                                render={({ field }) => (
                                                    <input
                                                        type="number"
                                                        className="dare_cua online_book"
                                                        {...field}
                                                        required
                                                    />
                                                )}
                                            />
                                            {errors?.noOfGuests && (
                                                <span className="text-danger">{errors.noOfGuests.message}</span>
                                            )}
                                        </div>
                                        <div className="col-md-12">
                                            <button type="submit" className="book_btn">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
