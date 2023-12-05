# City-Explorer Lab

**Author**: Stephanie G. Johnson
**Version**: 1.0.1

## Overview

The problem domain for this assignment involves building a React application that integrates the Axios library to facilitate user-initiated requests for data from a specific third-party API, namely the Location IQ Geocoding API. We use two key functionalities:

1. **Integration of Axios**: This involves incorporating the Axios library within a React application to handle HTTP requests effectively. It would require understanding how Axios works, making use of its methods to send requests, handle responses, and manage data retrieval from the Location IQ API.

2. **Utilizing Location IQ Geocoding API**:
   - **Search / Forward Geocoding**: Implementing functionality that allows users to perform forward geocoding, i.e., converting addresses or location names into geographic coordinates (latitude and longitude) using the Location IQ API.
   - **Static Maps**: Possibly creating static maps based on the obtained geographic coordinates or other location-related data retrieved from the API.



## Getting Started

TBD

## Architecture

### Components:

1. **App Component (app.jsx)**:
   - This is the main component rendering the entire application.
   - Manages the state for `city`, `latitude`, `longitude`, and `errorMessage`.
   - Fetches location data using Axios from the Location IQ API based on user input.
   - Renders the `Header`, `CityForm`, and `Map` components.
  
2. **CityForm Component (CityForm.jsx)**:
   - Renders a form that takes user input for a city.
   - Manages the `typedInCity` state to track the user's input.
   - Updates the `typedInCity` state based on user input changes.
   - Submits the city data to the parent component (`App`) for processing when the form is submitted.
   - Conditionally displays a heading showing information about the city entered.

3. **Map Component (Map.jsx)**:
   - Receives `latitude` and `longitude` as props.
   - Uses a conditional rendering technique (`When` from `react-if`) to display the map only when `latitude` and `longitude` are available.
   - Generates a static map image URL using the Location IQ API, with the `API_KEY`, `latitude`, and `longitude`.
   - Displays the static map image fetched from the Location IQ API based on the provided latitude and longitude.

### Functionality:

- **API Integration**:
  - Utilizes Axios for making HTTP requests to the Location IQ API to retrieve location data based on the provided city.
  - Uses the obtained latitude and longitude to generate a static map image URL for display.

### Environmental Setup:

- The `.env` file holds sensitive information like the API_KEY, which is accessed using `import.meta.env.VITE_API_KEY`.
- The API_KEY is used in both the App and Map components to authenticate requests to the Location IQ API.

### Overall Flow:

- User inputs a city name in the `CityForm` component.
- On form submission, the `App` component triggers a request to the Location IQ API using Axios, fetching the location data for the entered city.
- The retrieved latitude and longitude are passed to the `Map` component, which generates and displays a static map image using the Location IQ API.


## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an example:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource. -->

12-04-2023 7:27pm - 
Version: 1.0.0
Set up the project structure.
Integrated Axios for making HTTP requests.
Implemented functionality to fetch location data from the Location IQ API based on user input.
Displayed a static map using fetched latitude and longitude.

Version: 1.0.1
Fixed handling of errors when fetching location data.
Enhanced UI feedback for error messages or loading indicators during API requests.
Added more specific error handling and messages for failed API requests.

## Credit and Collaborations

Thank you Brandon (TA)

# Time Estimates

## Name of feature: 

1. Set up your React and API
2. Locations
3. Maps
4. Errors

Estimate of time needed to complete: _____

Start time: _____

Finish time: _____

Actual time needed to complete: _____