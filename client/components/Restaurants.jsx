import React, { useState, useEffect } from 'react';
import { ids } from 'webpack';
import Restaurant from './Restaurant.jsx';

const Restaurants = (props) => {

  // console.log(props.restaurants);
  // console.log(typeof props.restaurants);
  // const keys = Object.keys(props.restaurants);
  // const restaurants = keys.map((el) => {
  //   const { id, name, coordinates, display_phone, phone, image_url, hours, location, rating, url } = props.restaurants[key];

  //   // return <Restaurant id = {id} key = {`restaurant_${id}`} name = {name} coordinates = {coordinates} display_phone = {display_phone} phone = {phone} image_url = {image_url} hours = {hours} location = {location} rating = {rating} url = {url} />
  // })
  return (
    <div>
      <div className = "cardContainer">
        {/* {restaurants} */}
      </div>
    </div>
  )
}

export default Restaurants;