import { set } from 'lodash';
import React, { useEffect, useState } from 'react';
import TempComponent2 from './tempComponent2.jsx';


// Practice components to learn how react hooks work, use with other temp component!

// functional component
const TempComponent1 = (props) => {

  const [count, setCount] = useState(50);

  useEffect(() => {
    console.log(`useEffect TEMP 1 Fired`);
  })

  return  (
    <div>
      <p>temp component 1</p>
      <p> You clicked {count} times</p>
      <button onClick = {() => {setCount(count + 1)}}>
        Count
      </button>
      <TempComponent2 count={count} setCount={setCount}></TempComponent2>
      <div>
      {/* <TempComponent2 count = {count} setCount = {setCount}></TempComponent2> */}
      </div>
    </div>
  )
}

export default TempComponent1;