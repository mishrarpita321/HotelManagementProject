import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button, Container } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { addCategory } from 'src/store/admin/category';
import { AlertContext } from 'src/context/AlertContext';

const schema = yup.object().shape({
  name: yup.string().required('This field is required'),
  rooms: yup
    .number()
    .positive('The number of rooms should be a positive value')
    .integer('The number of rooms should be an integer')
    .required('This field is required'),
  size: yup
    .number()
    .positive('The size should be a positive value')
    .required('This field is required'),
  capacity: yup
    .number()
    .positive('The capacity should be a positive value')
    .required('This field is required'),
  price: yup.number().positive('The price should be a positive value').required('This field is required'),
  image: yup.mixed().required('Please select an image'),
});

const AddCategoryForm2 = ({ setShowAddDialog }) => {
  const dispatch = useDispatch();
  const { showAlert } = useContext(AlertContext);


  const defaultValues = {
    name: 'Deluxe-4',
    rooms: 3,
    size: 54,
    capacity: 2,
    price: '25'
  }


  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { name, rooms, size, capacity, price, image } = data;
    const categoryDto = {
      title: name,
      rooms,
      size,
      price,
      maxPeopleAllowed: capacity
    };
    const test = JSON.stringify({
      "title": "Delux",
      "rooms": 3,
      "size": 45,
      "price": 12,
      "maxPeopleAllowed": 4
    })

    const formData = new FormData();
    formData.append('image', image);
    formData.append('categoryDto', test);

    dispatch(addCategory(formData)).then((data) => {
      if (data?.payload?.status === 'success') {
        onAlertSuccessHandle(data?.payload?.message);
      } else {
        onAlertErrorHandle(data?.payload?.message);
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
      setPage('login');
    });
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
          <h4 style={{ textAlign: 'center' }}>Add Category</h4>
          <Form.Label>Name:</Form.Label>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Form.Control type="text" {...field} isInvalid={errors.name} />
            )}
          />
          {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="rooms">
          <Form.Label>Number of Rooms:</Form.Label>
          <Controller
            control={control}
            name="rooms"
            render={({ field }) => (
              <Form.Control
                type="number"
                {...field}

                isInvalid={errors.rooms}
                onChange={(e) => handleNonNegativeChange('rooms', setValue, e)}
              />
            )}
          />
          {errors.rooms && <Form.Text className="text-danger">{errors.rooms.message}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="size">
          <Form.Label>Size (in sq mt):</Form.Label>
          <Controller
            control={control}
            name="size"
            render={({ field }) => (
              <Form.Control
                type="number"
                {...field}

                isInvalid={errors.size}
                onChange={(e) => handleNonNegativeChange('size', setValue, e)}
              />
            )}
          />
          {errors.size && <Form.Text className="text-danger">{errors.size.message}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="capacity">
          <Form.Label>Capacity:</Form.Label>
          <Controller
            control={control}
            name="capacity"
            render={({ field }) => (
              <Form.Control
                type="number"
                {...field}

                isInvalid={errors.capacity}
                onChange={(e) => handleNonNegativeChange('capacity', setValue, e)}
              />
            )}
          />
          {errors.capacity && <Form.Text className="text-danger">{errors.capacity.message}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price:</Form.Label>
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <Form.Control
                type="number"
                {...field}

                isInvalid={errors.price}
                onChange={(e) => handleNonNegativeChange('price', setValue, e)}
              />
            )}
          />
          {errors.price && <Form.Text className="text-danger">{errors.price.message}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image:</Form.Label>
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <Form.Control
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
          {errors.image && <Form.Text className="text-danger">{errors.image.message}</Form.Text>}
        </Form.Group>

        <div className="row" style={{ justifyContent: 'center' }}>
          <Button variant="primary" type="submit" className="submit-button col-2">
            Submit
          </Button>
          <Button variant="primary" onClick={() => setShowAddDialog(false)} className="submit-button col-2">
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddCategoryForm2;
