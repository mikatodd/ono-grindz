import React, { useState, useEffect } from 'react';
const Stream = require('stream');
const axios = require('axios').default;
const SearchCreator = (props) => {

  // React Hooks: declaring two local state variables called categories and location. Unsure if this is necessary to maintain here, maybe we can maintain at higher level.
  // If we do move this to a HOC (higher order container) we will need to pass down the HOC's local state variables via props and update our handleClick method nested invocations, e.b. setCategory(categories) => props.setCategory(categories)
  const [categories, setCategory] = useState('');
  // const [location, setLocation] = useState('');

  const handleClick = (event) => {
    // pull values from html input tags
    const categories = document.getElementById('category').value
    const location = document.getElementById('location').value
    const email = document.getElementById('email').value

    // update local state variables categories and location
    setCategory(categories);
    // setLocation(location);

    // update parent's (MainContainer) local state container
    props.setEmail(email);
    props.setLocation(location);
    // automatically clears the inputs after the user clicks submit. Note: this is just at stylistic/UI feature so that if the user wants to change input, they will not need to erase their previous submission
    document.getElementById('category').value = '';
    document.getElementById('location').value = '';
    document.getElementById('email').value = '';

    // creating a body object which will be passed as the second argument to fetch request to server which will query Yelp API
    const body = { categories, location, email }

    // if using a form element with button that has type submit, prevents form from reloading the pade
    event.preventDefault();

    // send a fetch request to server once the button has been clicked, send our details in the body
    axios.post('/api/search', body)
      .then((response) => response.data.details)
      .then((data) => props.setRestaurants(data))
      .catch((err) => console.log('ERROR in axios request'))

  }

  // Render our react component
  return (
      <div className="search-container">
        <form>
          <label className="category-label">
            Category:
            <input type="text" id="category" placeholder="e.g.,sushi, pizza, etc" required />
          </label>
          <label>
            Location:
            <input type="text" id="location" placeholder="e.g., Los Angeles, CA" required />
          </label>
          <label>
            Email:
            <input type="text" id="email" placeholder="theRealCharChar@werewolves.com" type="email" required />
          </label>

          <input type="button" value="Submit" onClick={handleClick} />
        </form>
      </div>
  )
}

export default SearchCreator;