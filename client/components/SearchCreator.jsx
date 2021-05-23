import React, { useState, useEffect } from 'react';
import DisplayContainer from '../containers/DisplayContainer.jsx';


const SearchCreator = (props) => {

  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');


  const handleClick = (event) => {
    event.preventDefault();
    console.log(event);
  }

  return (
    <div>
      <h1>Search Creator</h1>
      <form>
        <label>
          Category:
          <input type="text" name="category" required onChange={e => setCategory(e.target.value)} />
        </label>
        <label>
          Location:
          <input type="text" name="location" required onChange={e => setCategory(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="text" name="location" required onChange={e => setCategory(props.email)} />
        </label>

        <button type="submit" onClick={handleClick}>Submit</button>
      </form>

      <DisplayContainer />
    </div>
  )
}

export default SearchCreator;