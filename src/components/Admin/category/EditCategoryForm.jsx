import React, { useContext, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button, Container } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { editCategory } from 'src/store/admin/category';
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
  // image: yup.mixed().required('Please select an image'),
});

const EditCategoryForm = ({ setShowEditDialog, editRow, setEditRow }) => {
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

  //   setValue('name', editRow?.title)
  //   setValue('rooms', editRow?.rooms)
  //   setValue('size', editRow?.size)
  //   setValue('capacity', editRow?.maxPeopleAllowed)
  //   setValue('price', editRow?.price)

  // }, [editRow])


  useEffect(() => {
    if (editRow) {
      setValue('name', editRow?.title);
      setValue('rooms', editRow?.rooms);
      setValue('size', editRow?.size);
      setValue('capacity', editRow?.maxPeopleAllowed);
      setValue('price', editRow?.price);
    }
  }, [editRow, setValue]);





  const onSubmit = (data) => {
    const { name, rooms, size, capacity, price, image } = data;
    const categoryDto = {
      title: name,
      rooms,
      size: parseFloat(size.toFixed(2)),
      price: parseFloat(price.toFixed(2)),
      maxPeopleAllowed: capacity
    };
    const test = JSON.stringify(categoryDto)
    const blob = new Blob([test], {
      type: 'application/json'
    })

    const formData = new FormData();
    formData.append('id', editRow.id);
    if (image && image.length > 0) {
      formData.append('image', image[0]);
    }
    formData.append('categoryDto', blob);

    dispatch(editCategory(formData)).then((data) => {
      setShowEditDialog(false)
      console.log(data)
      if (data?.payload?.status === 'success') {
        onAlertSuccessHandle(data?.payload?.message);
      } else {
        console.log('failed');
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
      setShowEditDialog(false)
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
  const handleNonNegativeIntChange = (field, setValue, e) => {
    let value = e.target.value !== '' ? parseInt(e.target.value, 10) : '';

    if (isNaN(value) || value < 0) {
      const previousValue = getValues()[field];
      value = isNaN(previousValue) ? '' : previousValue;
    }

    setValue(field, value);
  };

  return (
    <Container style={{ display: 'contents' }}>
      {editRow && (
        <Form className="property-form" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="name">
            <h4 style={{ textAlign: 'center' }}>Edit Category</h4>
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
                  onChange={(e) => handleNonNegativeIntChange('rooms', setValue, e)}
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
                  step="0.01"
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
                  onChange={(e) => handleNonNegativeIntChange('capacity', setValue, e)}
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
                  step="0.01"
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
                    const files = e.target.files;
                    setValue('image', files);
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
            <Button variant="primary" onClick={() => setShowEditDialog(false)} className="submit-button col-2">
              Cancel
            </Button>
          </div>
        </Form>
      )}

    </Container>
  );
};

export default EditCategoryForm;
