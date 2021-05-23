import React, { useState, useEffect } from 'react';
import Restaurants from '../components/Restaurants.jsx';
import MapContainer from './MapContainer.jsx'
const DisplayContainer = (props) => {

  return (
    <div className="displayContainer">
      <div className="restaurantsContainer">
      {/* Make sure to switch local state variable restaurants, to the actual one passed in by MainContainer via props */}
        <Restaurants restaurants = {props.restaurants} setRestaurants = {props.setRestaurants} email = {props.email} />
      </div>
      <MapContainer />
    </div>

  )
}

export default DisplayContainer;