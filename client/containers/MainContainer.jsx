import React, { useState, useEffect } from 'react';
import SearchContainer from './SearchContainer.jsx';
import DisplayContainer from './DisplayContainer.jsx';


const MainContainer = () => {

  const [restaurants, setRestaurants] = useState({});
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState({
    lat: 34.0522342,
    lng: -118.2436849
  });


  return (
    <div>
      <SearchContainer restaurants={restaurants} setRestaurants={setRestaurants} email={email} setEmail={setEmail} location={location} setLocation={setLocation} />
      <DisplayContainer restaurants={restaurants} setRestaurants={setRestaurants} email={email} setEmail={setEmail} location={location} setLocation={setLocation} />
    </div>
  )

}

export default MainContainer;