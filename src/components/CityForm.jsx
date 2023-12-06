/* eslint-disable react/prop-types */
import { useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CityForm(props) {
  const [showHeading, setShowHeading] = useState(false);

  // deleted the text on line 8
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowHeading(true);
    //we no longer have to pass a value into props.handleGetLocation. The getLocation() function in App.jsx has no parameter.
    // so when you passed down getLocation() as handleGetLocation (line 103) and implemented it into this handleSubmit() function
    // you are just calling the function once the form is submitted or when you click on the Explore button. 
    props.handleGetLocation();
  };
  return (
    <Form onSubmit={handleSubmit} className="google-search-form">
      <p className="instructions">Enter a city below.</p>
      <div className="google-search-container">
        <Form.Group className="search-group">
          
          <Form.Control
            placeholder="Oh...the places you'll go."
            size="lg"
            type="text"
            // deleted the text and replaced with the onChange on 29. You have to use the
            // updateCity() function (the one that sets searchQuery from a empty string to the e.target.value or
            // what is typed into the form) as an onChange so that searchQuery gets a value (ie "Seattle")
            onChange={props.updateCity}
            className="search-input"
          />
          <Button variant="primary" type="submit" className="search-button">
            Explore
          </Button>
        </Form.Group>
      </div>
      {showHeading && props.city &&  (
        <h2 className="results-text">Welcome to {props.city}. <br/> Explore Below!</h2>
      )}
    
    </Form>
  );
}

export default CityForm;