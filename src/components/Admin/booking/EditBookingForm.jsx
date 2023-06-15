import { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button, Container, Row, Col, CloseButton } from 'react-bootstrap';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { addAdminBooking, editAdminBooking } from 'src/store/admin/bookings';
import { AlertContext } from 'src/context/AlertContext';
import { formatDateforApi } from 'src/helper/get-date-format-for-api';

const schema = yup.object().shape({
    // name: yup.string().required('This field is required'),
    arrival: yup.date().required('This field is required'),
    departure: yup.date().required('This field is required'),
    // size: yup
    //     .number()
    //     .typeError('This field is required')
    //     .positive('The size should be a positive value')
    //     .required('This field is required'),
    // category: yup.string().required('This field is required'),
});

const EditBookingForm = ({ setShowEditDialog, rooms, parkingStore, update, setUpdate, editRow, setEditRow }) => {
    const dispatch = useDispatch();
    const { showAlert } = useContext(AlertContext);
    const [isLoading, setIsLoading] = useState(false);
    const [roomList, setRoomList] = useState([]);
    const [parkingList, setParkingList] = useState([]);

    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [parkingRows, setParkingRows] = useState([]);
    const [guestRows, setGuestRows] = useState([]);



    useEffect(() => {
        setRoomList(rooms.data)
        console.log(roomList)
    }, [rooms])

    useEffect(() => {
        setParkingList(parkingStore.data)
    }, [parkingStore])




    useEffect(() => {
        console.log(editRow)
        if (editRow) {

        }
    }, [editRow, setValue]);







    const onSubmit = (data) => {
        setIsLoading(true)
        let rooms = editRow?.rooms.map(room => room.roomNo)
        let id = editRow?.id
        // editRow.rooms.map(room => room.roomNo)
        const formData = { ...data, parkingRows, rooms, id };
        console.log(formData);

        dispatch(editAdminBooking(formData)).then((data) => {
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
            setShowEditDialog(false)
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


    const { arrivalDate, departureDate } = editRow;
    useEffect(() => {
        setValue('arrival', formatDateforApi(arrivalDate));
        setValue('departure', formatDateforApi(departureDate));
    }, [setValue, arrivalDate, departureDate, editRow]);

    return (
        <Container style={{ display: 'contents' }}>
            <Form className="property-form" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="name">
                    <h4 style={{ textAlign: 'center' }}>Edit Booking</h4>
                </Form.Group>

                <Form.Group controlId="arrival" style={{ display: "none" }}>
                    <Form.Label>Arrival date:</Form.Label>
                    <Controller
                        control={control}
                        name="arrival"
                        defaultValue={editRow?.arrivalDate}
                        render={({ field }) => (
                            <Form.Control
                                type="date"
                                {...field}
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                style={{ marginBottom: '10px' }}
                            />
                        )}
                    />
                    {errors.arrival && (
                        <Form.Text className="text-danger">
                            {errors.arrival.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group controlId="departure" style={{ display: "none" }}>
                    <Form.Label>Departure date:</Form.Label>
                    <Controller
                        control={control}
                        name="departure"
                        render={({ field }) => (
                            <Form.Control
                                type="date"
                                {...field}
                                style={{ marginBottom: '10px' }}
                            />
                        )}
                    />
                    {errors.departure && (
                        <Form.Text className="text-danger">
                            {errors.departure.message}
                        </Form.Text>
                    )}
                </Form.Group>



                {/* Add Parking Button */}
                <Button
                    variant="primary"
                    onClick={addParkingRow}
                    style={{ marginBottom: '10px' }}
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
                                {parkingList.map((parking,i) => {
                                    return (

                                        <option key={i} value={parking.vehicleType}>{parking.vehicleType}</option>
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
                    <Button onClick={() => setShowEditDialog(false)} variant="primary" className="submit-button col-2">
                        Cancel
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default EditBookingForm;
