import React, { useState, useEffect } from 'react';

const Restaurant = (props) => {

  return (
    <div>
      Name: {props.name}
      Address: {props.address}
      Hours: {props.hours}
    </div>
  )
}

export default Restaurant;