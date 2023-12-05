import { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CityForm(props) {
  const [showHeading, setShowHeading] = useState(false);
  const textInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowHeading(true);
    props.handleChangeCity(textInput.current.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Enter a city to begin</Form.Label>
        <Form.Control
          placeholder="Atlanta, GA"
          size="lg"
          type="text"
          ref={textInput}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Explore!
      </Button>
      {showHeading && props.city && (
        <h2>Check Below for info about {props.city}</h2>
      )}
    </Form>
  );
}

export default CityForm;
