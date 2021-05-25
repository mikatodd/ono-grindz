import React, { useState, useEffect } from 'react';


// Practice components to learn how react hooks work, use with other temp component!
const TempComponent2 = (props) => {

  useEffect(() => {
    // Update the document title using the browser API

    console.log(`useEffect TEMP 2 Fired`);  
  }, []);
  
  return  (
    <div>
      <p>temp component 2</p> 
      <p> You clicked {props.count} times</p>
      <button onClick = {() => {props.setCount(props.count + 1)}}>
        Click
      </button>
    </div>
  )
}

export default TempComponent2;