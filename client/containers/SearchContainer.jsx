import React, { useState, useEffect } from 'react';
import SearchCreator from '../components/SearchCreator.jsx';

const SearchContainer = (props) => {

  return (
    <div>
      <h1>Search Container</h1>
      <SearchCreator restaurants={props.restaurants} setRestaurants={props.setRestaurants} email={props.email} setEmail={props.setEmail} />
    </div>
  )
}

export default SearchContainer;