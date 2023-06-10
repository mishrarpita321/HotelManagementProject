import { useForm, Controller } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './PropertyForm.css'; // Import your custom CSS file for additional styling

const AddCategoryForm = ({ setShowAddDialog }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Here, you can perform actions like submitting the form data to an API or updating the state of the parent component.
    // Example: console.log(data);
  };

  return (
    <Container style={{ display: "contents" }}>
      <Form className="property-form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="name">
          <h4 style={{ textAlign: "center" }}>Add Category </h4>
          <Form.Label>Name:</Form.Label>
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control type="text" {...field} style={{ marginBottom: "10px" }} />
            )}
          />
          {errors.name && <Form.Text className="text-danger">This field is required</Form.Text>}
        </Form.Group>

        <Form.Group controlId="rooms">
          <Form.Label>Number of Rooms:</Form.Label>
          <Controller
            control={control}
            name="rooms"
            rules={{
              required: true,
              min: 0,
              valueAsNumber: true,
            }}
            render={({ field }) => (
              <Form.Control type="number" {...field} style={{ marginBottom: "10px" }} />
            )}
          />
          {errors.rooms?.type === 'required' && (
            <Form.Text className="text-danger">This field is required</Form.Text>
          )}
          {errors.rooms?.type === 'min' && (
            <Form.Text className="text-danger">The number of rooms should be a positive value</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="size">
          <Form.Label>Size (in sq mt):</Form.Label>
          <Controller
            control={control}
            name="size"
            rules={{
              required: true,
              min: 0,
              valueAsNumber: true,
            }}
            render={({ field }) => (
              <Form.Control type="number" {...field} style={{ marginBottom: "10px" }} />
            )}
          />
          {errors.size?.type === 'required' && (
            <Form.Text className="text-danger">This field is required</Form.Text>
          )}
          {errors.size?.type === 'min' && (
            <Form.Text className="text-danger">The size should be a positive value</Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="capacity">
          <Form.Label>Capacity:</Form.Label>
          <Controller
            control={control}
            name="capacity"
            rules={{
              required: true,
              min: 0,
              valueAsNumber: true,
            }}
            render={({ field }) => (
              <Form.Control type="number" {...field} style={{ marginBottom: "10px" }} />
            )}
          />
          {errors.size?.type === 'required' && (
            <Form.Text className="text-danger">This field is required</Form.Text>
          )}
          {errors.size?.type === 'min' && (
            <Form.Text className="text-danger">The capacity should be a positive value</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price:</Form.Label>
          <Controller
            control={control}
            name="price"
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control type="number" {...field} style={{ marginBottom: "10px" }} />
            )}
          />
          {errors.price && <Form.Text className="text-danger">This field is required</Form.Text>}
        </Form.Group>

        <div className='row' style={{ justifyContent: "center" }}>
          <Button variant="primary" type="submit" className="submit-button col-2">Submit</Button>
          <Button variant="primary" onClick={() => setShowAddDialog(false)} className="submit-button col-2">Cancel</Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddCategoryForm;
