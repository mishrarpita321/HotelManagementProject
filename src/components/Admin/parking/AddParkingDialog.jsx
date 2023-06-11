import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { editCategory } from 'src/store/admin/category';
import { AlertContext } from 'src/context/AlertContext';
import { addAdminParkings } from 'src/store/admin/parkings';

const schema = yup.object().shape({
    vehicleType: yup.string().required('This field is required'),
    price: yup.number().positive('The price should be a positive value').required('This field is required'),
    // image: yup.mixed().required('Please select an image'),
});

const AddParkingDialog = ({ setShowAddDialog }) => {
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();
    const { showAlert } = useContext(AlertContext);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm({
        resolver: yupResolver(schema),
    });


    // useEffect(() => {
    //     if (editRow) {
    //         setValue('name', editRow?.title);
    //         setValue('rooms', editRow?.rooms);
    //         setValue('size', editRow?.size);
    //         setValue('capacity', editRow?.maxPeopleAllowed);
    //         setValue('price', editRow?.price);
    //     }
    // }, [editRow, setValue]);


    const formatToFloat = (value) => {
        // const floatValue = parseFloat(value);
        return value.toFixed(2);
    };

    console.log(errors)
    const onSubmit = (data) => {
        setIsLoading(true)
        console.log(data)
        const { vehicleType, price } = data;

        // const dataJson = JSON.stringify({
        //     vehicleType: vehicleType,
        //     price: price
        // })

        // const categoryDto = {
        //     title: name,
        //     rooms,
        //     size: formatToFloat(size),
        //     price: formatToFloat(price),
        //     maxPeopleAllowed: capacity
        // };

        // console.log(formatToFloat(size))
        // console.log(typeof (formatToFloat(size)))
        // console.log(categoryDto)

        // console.log('datajahsdfabjsdhfhagsvdf', categoryDto)
        // const test = JSON.stringify(categoryDto)
        // const blob = new Blob([test], {
        //     type: 'application/json'
        // })

        // const formData = new FormData();
        // formData.append('id', editRow.id);
        // if (image && image.length > 0) {
        //     formData.append('image', image[0]);
        // }
        // formData.append('categoryDto', blob);

        dispatch(addAdminParkings(data)).then((data) => {
            setShowAddDialog(false)
            if (data?.payload?.status === 'success') {
                onAlertSuccessHandle(data?.payload?.message);
                setIsLoading(false)

            } else {
                onAlertErrorHandle(data?.payload?.message);
                setIsLoading(false)

            }
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

    const handleNonNegativeChange = (field, setValue, e) => {
        let value = e.target.value !== '' ? parseFloat(e.target.value, 10) : '';

        if (isNaN(value) || value < 0) {
            const previousValue = getValues()[field];
            value = isNaN(previousValue) ? '' : previousValue;
        }

        setValue(field, value);
    };

    return (
        <Container style={{ display: 'contents' }}>
            <Form className="property-form" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="vehicleType">
                    <h4 style={{ textAlign: 'center' }}>Add Parking</h4>
                    <Form.Label>Name:</Form.Label>
                    <Controller
                        control={control}
                        name="vehicleType"
                        render={({ field }) => (
                            <Form.Control disabled={isLoading} type="text" {...field} isInvalid={errors.name} />
                        )}
                    />
                    {errors.vehicleType && <Form.Text className="text-danger">{errors.vehicleType.message}</Form.Text>}
                </Form.Group>

                <Form.Group controlId="price">
                    <Form.Label>Price per hour:</Form.Label>
                    <Controller
                        control={control}
                        name="price"
                        render={({ field }) => (
                            <Form.Control
                                type="number"
                                step="0.01"
                                {...field}
                                disabled={isLoading}
                                isInvalid={errors.price}
                                onChange={(e) => {
                                    handleNonNegativeChange('price', setValue, e)
                                }
                                }
                            />
                        )}
                    />
                    {errors.price && <Form.Text className="text-danger">{errors.price.message}</Form.Text>}
                </Form.Group>

                <div className="row" style={{ justifyContent: 'center' }}>
                    <Button disabled={isLoading} variant="primary" type="submit" className="submit-button col-2">
                        {
                            isLoading ? (<Spinner size='sm' />) : ('Submit')
                        }
                    </Button>
                    <Button disabled={isLoading} variant="primary" onClick={() => setShowAddDialog(false)} className="submit-button col-2">
                        {
                            isLoading ? (<Spinner size='sm' />) : ('Cancel')
                        }
                    </Button>
                </div>
            </Form>

        </Container>
    );
};

export default AddParkingDialog;
