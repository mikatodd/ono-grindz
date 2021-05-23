import React, { useState, useEffect } from 'react';
import Restaurants from '../components/Restaurants.jsx';
const DisplayContainer = (props) => {

  console.log(props.restaurants);
  return (
    <div>
      {/* Make sure to switch local state variable restaurants, to the actual one passed in by MainContainer via props */}
      <Restaurants restaurants = {props.restaurants} setRestaurants = {props.setRestaurants} />
    </div>
  )
}

export default DisplayContainer;