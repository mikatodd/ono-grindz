import React, { useState, useEffect } from 'react';

const Restaurant = (props) => {

  return (
    <div className="restaurantCard">
      <img className = "avatar" src ="https://s3-media2.fl.yelpcdn.com/bphoto/Ra-L9QFaLVdaymBt7ziioA/o.jpg">
      </img>
      <div className="restaurantInfoContainer">
        <h4><b>{props.name}</b></h4>
        <p>{props.address}</p>
        <p>{props.hours}</p>
      </div>
    </div>
  )
}

export default Restaurant;