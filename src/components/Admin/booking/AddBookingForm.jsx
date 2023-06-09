import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button, Container, Row, Col, CloseButton } from 'react-bootstrap';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

const schema = yup.object().shape({
    name: yup.string().required('This field is required'),
    arrival: yup.date().required('This field is required'),
    departure: yup.date().required('This field is required'),
    size: yup
        .number()
        .typeError('This field is required')
        .positive('The size should be a positive value')
        .required('This field is required'),
    category: yup.string().required('This field is required'),
});

const BookingForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [parkingRows, setParkingRows] = useState([]);

    const onSubmit = (data) => {
        const formData = { ...data, parkingRows };
        console.log(formData);
    };

    const addParkingRow = () => {
        const isAnyRowIncomplete = parkingRows.some(
            (row) => !row.parkingType || !row.vehicleCount
        );
        if (!isAnyRowIncomplete) {
            setParkingRows([...parkingRows, { parkingType: '', vehicleCount: '' }]);
        }
    };

    const removeParkingRow = (index) => {
        setParkingRows(parkingRows.filter((_, i) => i !== index));
    };

    const handleParkingTypeChange = (index, value) => {
        const updatedRows = [...parkingRows];
        updatedRows[index].parkingType = value;
        setParkingRows(updatedRows);
    };

    const handleVehicleCountChange = (index, value) => {
        const updatedRows = [...parkingRows];
        updatedRows[index].vehicleCount = value;
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


    return (
        <Container style={{ display: 'contents' }}>
            <Form className="property-form" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="name">
                    <h4 style={{ textAlign: 'center' }}>Booking Form</h4>
                    <Form.Label>Guest Name:</Form.Label>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <Form.Control
                                type="text"
                                {...field}
                                style={{ marginBottom: '10px' }}
                            />
                        )}
                    />
                    {errors.name && (
                        <Form.Text className="text-danger">{errors.name.message}</Form.Text>
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

                <Form.Group controlId="departure">
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

                <Form.Group controlId="category">
                    <Form.Label>Room Category:</Form.Label>
                    <Controller
                        control={control}
                        name="category"
                        render={({ field }) => (
                            <Form.Control
                                as="select"
                                {...field}
                                style={{ marginBottom: '10px' }}
                            >
                                <option value="">Select Room Category</option>
                                <option value="standard">Standard</option>
                                <option value="deluxe">Deluxe</option>
                                <option value="suite">Suite</option>
                            </Form.Control>
                        )}
                    />
                    {errors.category && (
                        <Form.Text className="text-danger">
                            {errors.category.message}
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
                                <option value="car">Car</option>
                                <option value="motorcycle">Motorcycle</option>
                                <option value="bicycle">Bicycle</option>
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
                    <Button variant="primary" className="submit-button col-2">
                        Cancel
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default BookingForm;
