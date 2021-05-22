import React, { useState, useEffect } from 'react';
import SearchContainer from './SearchContainer.jsx';
import DisplayContainer from './DisplayContainer.jsx';

const MainContainer = () => {

  const [restaurants, setRestaurants] = useState([]);
  const [email, setEmail] = useState('');

  return (
    <div>
      <SearchContainer restaurants={restaurants} setRestaurants={setRestaurants} email={email} setEmail={setEmail} />
      <DisplayContainer restaurants={restaurants} setRestaurants={setRestaurants} email={email} setEmail={setEmail} />
    </div>
  )
}

export default MainContainer;