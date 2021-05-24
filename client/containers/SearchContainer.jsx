import React, { useState, useEffect } from 'react';
import SearchCreator from '../components/SearchCreator.jsx';

const SearchContainer = (props) => {

  return (
    <div>
      <SearchCreator restaurants={props.restaurants} setRestaurants={props.setRestaurants} email={props.email} setEmail={props.setEmail} location={props.location} setLocation={props.setLocation} />
    </div>
  )
}

export default SearchContainer;