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

export default function ChooseBookDt() {
    const { selectedRooms, addToCart, removeFromCart, arrivalDate, setArrivalDate, deptDate, setDeptDate, setGuestCount } = useContext(CartContext)
    const router = useRouter()
    const maxGuest = 10; // Maximum number of guests allowed

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
    });

    const onSubmit = (data) => {
        // Handle form submission
        console.log(data);
        setArrivalDate(formatDateforApi(data.arrival))
        setDeptDate(formatDateforApi(data.departure))
        setGuestCount(data.noOfGuests)
        router.push("/rooms-available")


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
                                                        onChange={(date) => field.onChange(date)}
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
                                                        onChange={(date) => field.onChange(date)}
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
