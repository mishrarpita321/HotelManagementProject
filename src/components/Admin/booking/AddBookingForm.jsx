import { useContext, useEffect, useState } from 'react';
import { useForm, Controller, set } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button, Container, Row, Col, CloseButton } from 'react-bootstrap';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { addAdminBooking } from 'src/store/admin/bookings';
import { AlertContext } from 'src/context/AlertContext';
import { fetchAdminRoomsList } from 'src/store/user/availableRooms';

const schema = yup.object().shape({
    // name: yup.string().required('This field is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    arrival: yup.date().required('This field is required'),
    departure: yup.date().required('This field is required'),
    size: yup
        .number()
        .typeError('This field is required')
        .positive('The size should be a positive value')
        .required('This field is required'),
    // category: yup.string().required('This field is required'),
});

const BookingForm = ({ setShowAddDialog, rooms, parkingStore, update, setUpdate }) => {
    const dispatch = useDispatch();
    const { showAlert } = useContext(AlertContext);
    const [isLoading, setIsLoading] = useState(false);
    const [roomList, setRoomList] = useState([]);
    const [parkingList, setParkingList] = useState([]);

    const [arrivalDate, setArrivalDate] = useState(new Date().toISOString().split('T')[0]);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [deptDate, setDeptDate] = useState(tomorrow.toISOString().split('T')[0]);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [parkingRows, setParkingRows] = useState([]);
    const [guestRows, setGuestRows] = useState([]);



    useEffect(() => {
        if (rooms.data.length !== 0) {

            setRoomList(rooms.data)
            console.log(roomList)
        }
    }, [rooms])

    useEffect(() => {
        setParkingList(parkingStore.data)
    }, [parkingStore])

    useEffect(() => {

        setRoomList([])
        // console.log(errors)
        if ( arrivalDate && deptDate) {
            dispatch(fetchAdminRoomsList({ arrivalDate, deptDate }));
        }
    }, [arrivalDate, deptDate, dispatch, errors.arrival, errors.departure]);

    // useEffect(() => {
    //     if (errors.arrival || errors.departure) {
    //         setRoomList([])
    //     }
    // }, [rooms])



    const handleArrivalDateChange = (event) => {
        const selectedDate = event.target.value;
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date

        if (selectedDate < currentDate) {
            // Do not update the state if the selected date is in the past
            return;
        }
        setArrivalDate(event.target.value);
        setValue('arrival', event.target.value)

    };

    const handleDeptDateChange = (event) => {
        const selectedDate = event.target.value;

        if (selectedDate < arrivalDate) {
            // Do not update the state if the selected departure date is before the arrival date
            return;
        }

        setDeptDate(event.target.value);
        setValue('departure', event.target.value)

    };

    const onSubmit = (data) => {
        setIsLoading(true)
        const formData = { ...data, parkingRows, guestRows, selectedRoomList };
        console.log(formData);

        dispatch(addAdminBooking(formData)).then((data) => {
            console.log(data)
            if (data?.payload?.status === 'success') {
                setUpdate(update + 1)
                onAlertSuccessHandle(data?.payload?.message);
            } else {
                onAlertErrorHandle(data?.payload?.message);
            }
            setIsLoading(false)
        });
    };

    const onAlertErrorHandle = (message) => {
        showAlert('error', message, () => {
            console.log('Ok button clicked');
        });
    };

    const onAlertSuccessHandle = (message) => {
        showAlert('success', message, () => { }, () => { }, () => {
            setShowAddDialog(false)
        });
    };

    const addParkingRow = () => {
        const isAnyRowIncomplete = parkingRows.some(
            (row) => !row.vehicleType || !row.numberOfVehicles
        );
        if (!isAnyRowIncomplete) {
            setParkingRows([...parkingRows, { vehicleType: '', numberOfVehicles: '' }]);
        }
    };
    const addGuestRow = () => {
        const isAnyRowIncomplete = guestRows.some(
            (row) => !row.name
        );
        if (!isAnyRowIncomplete) {
            setGuestRows([...guestRows, { name: '' }]);
        }
    };

    const removeParkingRow = (index) => {
        setParkingRows(parkingRows.filter((_, i) => i !== index));
    };
    const removeGuestRow = (index) => {
        setGuestRows(guestRows.filter((_, i) => i !== index));
    };

    const handleGuestNameChange = (index, value) => {
        const updatedRows = [...guestRows];
        updatedRows[index].name = value;
        setGuestRows(updatedRows);
    };
    const handleParkingTypeChange = (index, value) => {
        const updatedRows = [...parkingRows];
        updatedRows[index].vehicleType = value;
        setParkingRows(updatedRows);
    };

    const handleVehicleCountChange = (index, value) => {
        const updatedRows = [...parkingRows];
        updatedRows[index].numberOfVehicles = value;
        setParkingRows(updatedRows);
    };


    const handleNonNegativeChange = (field, setValue, e) => {
        let value = e.target.value !== '' ? parseInt(e.target.value, 10) : '';

        if (isNaN(value) || value < 0) {
            const previousValue = getValues()[field];
            value = isNaN(previousValue) ? '' : previousValue;
        }

        setValue(field, value);
    };


    const [selectedRooms, setSelectedRooms] = useState([]);
    const [selectedRoomList, setSelectedRoomList] = useState([]);

    const handleSelectChange = (event) => {
        const selectedRoomIds = Array.from(event.target.selectedOptions, (option) =>
            parseInt(option.value)
        );
        const selectedRoomNumbers = selectedRoomIds.map((roomId) => {
            const room = roomList.find((room) => room.id === roomId);
            return room.roomNo;
        });
        setSelectedRooms(selectedRoomIds);
        setSelectedRoomList(selectedRoomNumbers);
    };

    const isRoomSelected = (roomId) => {
        return selectedRooms.includes(roomId);
    };


    return (
        <Container style={{ display: 'contents' }}>
            <Form className="property-form" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="name">
                    <h4 style={{ textAlign: 'center' }}>Booking Form</h4>
                    <Form.Group controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <Form.Control type="email" {...field} style={{ marginBottom: '10px' }} />
                            )}
                        />
                        {errors.email && (
                            <Form.Text className="text-danger">{errors.email.message}</Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group controlId="arrival">
                        <Form.Label>Arrival date:</Form.Label>
                        <Controller
                            control={control}
                            name="arrival"
                            render={({ field }) => (
                                <Form.Control
                                    type="date"
                                    {...field}
                                    value={arrivalDate}
                                    onChange={handleArrivalDateChange}
                                    style={{ marginBottom: '10px' }}
                                />
                            )}
                        />
                        {arrivalDate < new Date().toISOString().split('T')[0] && (
                            <Form.Text className="text-danger">Cannot select a past date</Form.Text>
                        )}
                        {errors.arrival && (
                            <Form.Text className="text-danger">{errors.arrival.message}</Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group controlId="departure">
                        <Form.Label>Departure date:</Form.Label>
                        <Controller
                            control={control}
                            name="departure"
                            render={({ field }) => (
                                <Form.Control
                                    type="date"
                                    {...field}
                                    value={deptDate}
                                    onChange={handleDeptDateChange}
                                    style={{ marginBottom: '10px' }}
                                />
                            )}
                        />
                        {deptDate < arrivalDate && (
                            <Form.Text className="text-danger">Departure date must be after the arrival date</Form.Text>
                        )}
                        {errors.departure && (
                            <Form.Text className="text-danger">{errors.departure.message}</Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group controlId="size">
                        <Form.Label>Number of Guests:</Form.Label>
                        <Controller
                            control={control}
                            name="size"
                            render={({ field }) => (
                                <Form.Control
                                    type="number"
                                    {...field}
                                    style={{ marginBottom: '10px' }}
                                />
                            )}
                        />
                        {errors.size && (
                            <Form.Text className="text-danger">{errors.size.message}</Form.Text>
                        )}
                    </Form.Group>

                    {/* Add Parking Button */}
                    <Button
                        variant="primary"
                        onClick={addGuestRow}
                        style={{ marginBottom: '10px' }}
                    >
                        Add Guest
                    </Button>
                    {guestRows.map((row, index) => (
                        <>
                            <Row
                                key={index}
                                style={{ alignItems: 'center', marginBottom: '10px' }}
                            >
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Guest Name:</Form.Label>
                                        <Controller
                                            control={control}
                                            name="name"
                                            render={({ field }) => (
                                                <Form.Control
                                                    type="text"
                                                    // name='name'
                                                    {...field}
                                                    value={row.name}
                                                    onChange={(e) => handleGuestNameChange(index, e.target.value)}
                                                    style={{ marginBottom: '10px' }}
                                                />
                                            )}
                                        />


                                    </Form.Group>
                                </Col>
                                <Col xs="auto">
                                    <CloseButton
                                        onClick={() => removeGuestRow(index)}
                                        style={{ marginTop: '4px' }}
                                    />
                                </Col>
                            </Row>
                        </>
                    ))}
                </Form.Group>


                <Form.Group controlId="exampleForm.SelectMultiple">
                    <Form.Label>Select Multiple Rooms</Form.Label>
                    <Form.Control as="select" multiple value={selectedRooms} onChange={handleSelectChange}>
                        {roomList.map((room) => (
                            <option key={room.id} value={room.id} selected={isRoomSelected(room.id)}>
                                Room {room.roomNo}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>





                {/* Add Parking Button */}
                <Button
                    variant="primary"
                    onClick={addParkingRow}
                    style={{ margin: '10px' }}
                >
                    Add Parking
                </Button>

                {/* Parking Rows */}
                {parkingRows.map((row, index) => (
                    <Row
                        key={index}
                        style={{ alignItems: 'center', marginBottom: '10px' }}
                    >
                        <Col>
                            <Form.Control
                                as="select"
                                value={row.parkingType}
                                onChange={(e) => handleParkingTypeChange(index, e.target.value)}
                                style={{ marginRight: '10px' }}
                            >
                                <option value="">Select Parking Type</option>
                                {parkingList.map((parking) => {
                                    return (

                                        <option value={parking.vehicleType}>{parking.vehicleType}</option>
                                    )
                                })}
                                {/* <option value="motorcycle">Motorcycle</option>
                                <option value="bicycle">Bicycle</option> */}
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control
                                type="number"
                                placeholder="Number of Vehicles"
                                value={row.vehicleCount}
                                onChange={(e) => handleVehicleCountChange(index, e.target.value)}
                                style={{ marginRight: '10px' }}
                            />
                        </Col>
                        <Col xs="auto">
                            <CloseButton
                                onClick={() => removeParkingRow(index)}
                                style={{ marginTop: '4px' }}
                            />
                        </Col>
                    </Row>
                ))}

                {/* Submit and Cancel Buttons */}
                <div className="row" style={{ justifyContent: 'center' }}>
                    <Button variant="primary" type="submit" className="submit-button col-2">
                        Submit
                    </Button>
                    <Button onClick={() => setShowAddDialog(false)} variant="primary" className="submit-button col-2">
                        Cancel
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default BookingForm;
