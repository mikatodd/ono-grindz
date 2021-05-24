import _ from 'lodash';
import React, { useState, useEffect } from 'react';

const Restaurant = (props) => {

  useEffect(() => {
    {console.log('Restaurant Component: Use Effect Fired');}
  })
  return (
    <div>
      <div className="restaurantCard">
        <img className = "avatar" src ={props.image_url}></img>
        <div className="restaurantInfoContainer">
          <h4><b>{props.name}</b></h4>
          <p>Address: {props.location.address1}</p>
          <p>Hours: {props.schedule[0]} - {props.schedule[1]}</p>
          <p>Phone: {props.display_phone}</p>
          <p>Rating: {props.rating}</p>
          <input type="button" value={props.subscribed} name={props.id} onClick={props.handleClick} selected={props.subscribed}/>
        </div>
      </div>
    </div>
  )
}

export default Restaurant;