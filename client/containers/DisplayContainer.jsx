import React, { useState, useEffect } from 'react';
import Restaurants from '../components/Restaurants.jsx';
const DisplayContainer = (props) => {

  const [restaurants, setRestaurants] = useState([
    {
      name: 'Chick-Fil-A',
      address: '123 Main St',
      hours: '11AM - 9PM'
    },
    {
      name: 'Shake Shack',
      address: '101 5th Ave',
      hours: '11AM - 9PM'
    },
    {
      name: 'Popeye\'s Chicken',
      address: '356 E 26th St',
      hours: '11AM - 12AM'
    }
  ]);

  return (
    <div>
      <h1>Display Container</h1>
      {/* Make sure to switch local state variable restaurants, to the actual one passed in by MainContainer via props */}
      <Restaurants restaurants = {restaurants} setRestaurants = {setRestaurants} />
    </div>
  )
}

export default DisplayContainer;