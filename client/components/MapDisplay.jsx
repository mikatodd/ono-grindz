/**
 * ************************************
 *
 * @module  MapDisplay
 * @author
 * @date
 * @description presentation component that renders a Google Map with Markers for restaurants
 *
 * ************************************
 */

import React, { Component } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

const MapDisplay = (props) => {
   
  const mapStyles = {        
    height: "88vh",
    width: "100%"
 };
  
  const defaultCenter = {
    lat: 40.7309,
    lng: -73.9973
  }
  
  return (

    <div className="mapContainer">
     <LoadScript googleMapsApiKey='AIzaSyD8w7CCjD5Xk6Z3zlbsG-mU8MsJb1Y0pv0'>
       <GoogleMap
         mapContainerStyle={mapStyles}
         zoom={13}
         center={defaultCenter}>
         {/* {props.markers} */}
       </GoogleMap>
     </LoadScript>
    </div>
  )
}
export default MapDisplay;