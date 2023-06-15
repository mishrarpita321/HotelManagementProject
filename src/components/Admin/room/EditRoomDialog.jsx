import { useState, useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { AlertContext } from 'src/context/AlertContext';
import { useDispatch } from 'react-redux';
import { addAdminRooms, editAdminRooms } from 'src/store/admin/rooms';

const schema = yup.object().shape({
    roomNo: yup
        .number()
        .typeError('Room No must be a number')
        .positive('Room No must be a positive number')
        .integer('Room No must be an integer')
        .required('Room No is required'),
    category: yup.string().required('Category is required'),
    roomStatus: yup.boolean().required('Status is required'),
    inventory: yup.boolean().required('Inventory availability is required'),
    cleaningStatus: yup.boolean().required('Cleaning status is required'),
    // image: yup.mixed().required('Please select an image'),
});

const defaultValues = {
    roomNo: '',
    category: '',
    roomStatus: false,
    inventory: false,
    cleaningStatus: false,
    image: null,
};

export default function EditRoomDialog({ setShowEditDialog, categoryStore, editRow, setEditRow }) {
    const { showAlert } = useContext(AlertContext);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        console.log(editRow)
        if (editRow) {
            setValue('roomNo', editRow?.roomNo);
            setValue('category', editRow?.category?.id);
            setValue('roomStatus', editRow?.isActive);
            setValue('inventory', editRow?.isInventoryAvailable);
            // setValue('inventory', false);
            setValue('cleaningStatus', editRow?.isCleaned);
            // setValue('cleaningStatus', true);
        }
    }, [editRow, setValue]);


    useEffect(() => {
        setCategories(categoryStore.data);
    }, [categoryStore]);

    // const onSubmit = (data) => {
    //     setIsLoading(true);

    //     const payload = {
    //         roomNo: data.roomNo,
    //         isActive: data.roomStatus === true,
    //         isInventoryAvailable: data.inventory,
    //         isCleaned: data.cleaningStatus,
    //         categoryId: data.category,
    //         image: data.image[0], // Assuming only one image is selected
    //     };
    //     console.log(data)
    //     console.log(payload)
    //     // Perform your form submission logic here

    //     setIsLoading(false);
    // };

    const onSubmit = (data) => {
        setIsLoading(true)

        // const { name, rooms, size, capacity, price, image } = data;
        const roomDto = {
            roomNo: data.roomNo,
            isActive: data.roomStatus === true,
            isInventoryAvailable: data.inventory,
            isCleaned: data.cleaningStatus,
        };
        const test = JSON.stringify(roomDto)


        const blob = new Blob([test], {
            type: 'application/json'
        })

        console.log(data.image)
        const formData = new FormData();
        formData.append('id', editRow.id);
        formData.append('categoryId', data.category);
        formData.append('image', data.image);
        formData.append('roomDto', blob);

        dispatch(editAdminRooms(formData)).then((data) => {
            // console.log(data)
            if (data?.payload?.status === 'success') {
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





    return (
        <Container style={{ backgroundColor: "rgb(195 184 210 / 30%)" }}>
            <h5 className="text-center mt-3">Edit Room</h5>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="roomNo">
                            <Form.Label>Room No:</Form.Label>
                            <Controller
                                control={control}
                                name="roomNo"
                                render={({ field }) => (
                                    <Form.Control
                                        type="text"
                                        {...field}
                                        disabled={isLoading}
                                        isInvalid={errors.roomNo}
                                    />
                                )}
                            />
                            {errors.roomNo && (
                                <Form.Text className="text-danger">{errors.roomNo.message}</Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="category">
                            <Form.Label>Category:</Form.Label>
                            <Controller
                                control={control}
                                name="category"
                                render={({ field }) => (
                                    <Form.Control as="select" {...field} disabled={isLoading} isInvalid={errors.category}>
                                        <option value="">Select One</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </Form.Control>
                                )}
                            />
                            {errors.category && (
                                <Form.Text className="text-danger">{errors.category.message}</Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="roomStatus">
                            <Form.Label>Available:</Form.Label>
                            <Controller
                                control={control}
                                name="roomStatus"
                                render={({ field }) => (
                                    <Form.Control
                                        as="select"
                                        {...field}
                                        disabled={isLoading}
                                        isInvalid={errors.roomStatus}
                                    >
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Form.Control>
                                )}
                            />
                            {errors.roomStatus && (
                                <Form.Text className="text-danger">{errors.roomStatus.message}</Form.Text>
                            )}
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="inventory">
                            <Form.Label>Inventory Available?</Form.Label>
                            <Controller
                                control={control}
                                name="inventory"
                                render={({ field }) => (
                                    <Form.Check
                                        type="switch"
                                        id="inventorySwitch"
                                        label=""
                                        checked={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.checked);
                                            setValue('inventory', e.target.checked);
                                        }}
                                        disabled={isLoading}
                                    />
                                )}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="cleaningStatus">
                            <Form.Label>Cleaning Status?</Form.Label>
                            <Controller
                                control={control}
                                name="cleaningStatus"
                                render={({ field }) => (
                                    <Form.Check
                                        type="switch"
                                        id="cleaningSwitch"
                                        label=""
                                        checked={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.checked);
                                            setValue('cleaningStatus', e.target.checked);
                                        }}
                                        // {...field}
                                        disabled={isLoading}
                                    />
                                )}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="image">
                            <Form.Label>Image:</Form.Label>
                            <Controller
                                control={control}
                                name="image"
                                render={({ field }) => (
                                    <Form.Control
                                        disabled={isLoading}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setValue('image', file);
                                        }}
                                        isInvalid={errors.image}
                                    />
                                )}
                            />
                            {errors.image && (
                                <Form.Text className="text-danger">{errors.image.message}</Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                <div className="text-center mt-3 mb-3">
                    <Button disabled={isLoading} variant="primary" type="submit">
                        {isLoading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                    </Button>
                    <Button
                        disabled={isLoading}
                        variant="secondary"
                        onClick={() => setShowEditDialog(false)}
                        className="ml-2"
                    >
                        {isLoading ? <Spinner animation="border" size="sm" /> : 'Cancel'}
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
