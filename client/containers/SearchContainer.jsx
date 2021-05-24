import React, { useState, useEffect } from 'react';
import SearchCreator from '../components/SearchCreator.jsx';

const SearchContainer = (props) => {

  return (
    <div>
      <div className="header-container">
      <SearchCreator restaurants={props.restaurants} setRestaurants={props.setRestaurants} email={props.email} setEmail={props.setEmail} location={props.location} setLocation={props.setLocation} />
      </div>
    </div>
  )
}

export default SearchContainer;