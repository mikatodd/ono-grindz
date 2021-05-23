import React, { useState, useEffect } from 'react';
import Restaurants from '../components/Restaurants.jsx';
const DisplayContainer = (props) => {

  const [restaurants, setRestaurants] = useState([]);

  return (
    <div>
      <h1>Display Container</h1>
      {/* Make sure to switch local state variable restaurants, to the actual one passed in by MainContainer via props */}
      <Restaurants restaurants = {restaurants} setRestaurants = {setRestaurants} />
    </div>
  )
}

export default DisplayContainer;