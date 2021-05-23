/**
 * ************************************
 *
 * @module  MapContainer
 * @author
 * @date
 * @description stateful component that renders MapDisplay
 *
 * ************************************
 */

import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MapDisplay from '../components/MapDisplay.jsx'

const MapContainer = (props) => {
  
  return (
    <div className = "mapContainer">
      <MapDisplay 
          // coordinates = {props.coordinates}
          response = {null}
          mapStyles = {{        
              height: "100vh",
              width: "100%"
            }}
          defaultCenter = {{
              lat: 40.7309,
              lng: -73.9973
            }}
          // markers = {markers}
      />
    </div>
  )
}

export default MapContainer;