import _ from 'lodash';
import React, { useState, useEffect } from 'react';

const Restaurant = (props) => {

  useEffect(() => {
    { console.log('Restaurant Component: Use Effect Fired'); }
  })
  return (
    <div>
      <div className="restaurantCard">
        <img className="avatar" src={props.image_url}></img>
        <div className="restaurantInfoContainer">
          <h4><b><a href={props.url}>{props.name}</a></b></h4>
          <span className="restaurantDetails"><b>Address:</b> {props.location.address1}, {props.location.city}</span>
          <span className="restaurantDetails"><b>Hours:</b> {props.schedule[0]} - {props.schedule[1]}</span>
          <span className="restaurantDetails"><b>Phone:</b> {props.display_phone}</span>
          <span className="restaurantDetails"><b>Rating:</b> {props.rating}</span>
        </div>
        <input type="button" className="card-btn" value={props.subscribed} name={props.id} onClick={props.handleClick} selected={props.subscribed} />
      </div>
    </div>
  )
}

export default Restaurant;