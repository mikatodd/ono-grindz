import { forEach } from 'lodash';
import React, { useState, useEffect } from 'react';
import Restaurant from './Restaurant.jsx';

const Restaurants = (props) => {

  // declare variable keys, initialize to array of keys in props.restaurants
  // Note: keys will be Yelp Restaurant IDs in the form of a string
  const keys = Object.keys(props.restaurants);

  // declare a local state variable, subscriptions, initialize to empty array
  // Note: subscriptions will keep track of which restaurants the user will actually want to subscribe to. 
  // we will ultimately send off the array of subscriptions back to the server so that they can configure automatic email notifications to be sent to user when restaurant is closing in an hour.
  const [subscriptions, setSubscriptions] = useState({});
  console.log('SUBSCRIPTIONS: ', subscriptions);

  // React Hooks: useEffect() is a lifecycle method similar to React Class Components (i.e. ComponentWillMount(), ComponentDidMount(), ComponentWillUnmount()). For now will we just have it console log, so that we know whenever this is invoked for our understanding. 
  useEffect(() => {
    console.log('Restaurants Component: USE EFFECT FIRED');
  });

  // handleClick function will be passed down to children component Restaurant via props. This function will
  const handleClick = (e) => {
    // from the event object, locate the button that was click, more specifically, the restaurant id
    const restaurantId = e.target.name;

    // copy the local state variable subscriptions, key word is copy, remember objects and arrays are composite data types which are passed by reference.
    // if we were to initialize subscriptionState to reference subscriptions, and we reassigned or updated its values without using setSubscriptions ,unsure what the implications would be
    const subscriptionState = { ...subscriptions };

    // checks whether subscriptionState (& subscription local state variable) have the restaurant Id already. This will simply add the restaurant id, and set to true, otherwise it will act as a 'switch' to delete the restaurant Id from the subscriptions object;
    if (!Object.prototype.hasOwnProperty.call(subscriptionState, restaurantId)) {
      subscriptionState[restaurantId] = true;
    }
    else {
      delete subscriptionState[restaurantId];
    }

    setSubscriptions(subscriptionState);
  };

  const convertTime = (time) => {
    const hours = (parseInt(time.substring(0, 2)) % 12) === 0 ? 1 : time.substring(0, 2) % 12;
    const minutes = time.substring(2);
    const amOrPm = Math.floor(parseInt(time.substring(0, 2)) / 12) === 1 ? 'PM' : 'AM';
    return (`${hours}:${minutes}${amOrPm}`);
  };
  // declare const variable restaurants, intiailize to the returned value from calling map on the keys array
  const restaurants = keys.map((el, index, array) => {
    // pull out necessary data points to populate restaurant cards
    const { id, name, coordinates, display_phone, phone, image_url, hours, location, rating, url } = props.restaurants[el];

    // note: the hours property returned from yelp is a NESTED Array of nested objects. There should be 6-7 nested objects, each corresponding to a day in the week.
    // each object will have a 'start' and 'end' property which are hours in Military time (e.g. 1700, 0800, etc)

    // First we need to determine which day of the week it is (e.g., Sunday = 0, Monday = 1, etc.)

    const date = new Date(); // new date object, which has built-in methods to tell us time, date, etc.

    const day = date.getDay(); // get day in integer 0-6

    // store start and end times in variables

    // OPPORTUNITY TO REFACTOR: some restaurants have two openings per day, like if they open for breakfast/lunch, then have a closing period before reopening for dinner

    // In the case above, the nested object hours[0].open could potentially have 13 nested objects, or 2 for each day they have two openings, will need to handle this appropriately
    let start = hours[0].open[day].start;
    let end = hours[0].open[day].end;

    // since times are stored in strings military time ('1100' = 11AM, '1830' = 6:30PM) will need to convert to readable format for the user
    start = convertTime(start);
    end = convertTime(end);
    const schedule = [start, end];

    // return a Restaurant component with necessary attributes for props
    return <Restaurant id={id} key={`restaurant_${id}`} name={name} coordinates={coordinates} display_phone={display_phone} phone={phone} image_url={image_url} location={location} rating={rating} url={url} schedule={schedule} handleClick={handleClick} subscribed={Object.prototype.hasOwnProperty.call(subscriptions, id) && subscriptions[id] === true ? "Selected" : "Select"} />
  })

  
  const subscribe = () => {
    console.log('Subscribed: ', subscriptions);

    // only send to server restuarant ids where the value in the subscriptions object is true
    // example of when an restaurant id would be in subscriptions but be false is if, user initially clicked 'Select' but then changed mind and unselected'
    const body = {
      subscriptions: subscriptions,
      email: props.email,
    }
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        subscriptions: subscriptions,
        email: props.email,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      <div className="cardContainer">
        {restaurants}
      </div>
      <div className="subscribe-container">
        <input type="button" className="subscribe-btn" value="Subscribe" onClick={subscribe} />
      </div>
    </div>
  )
}

export default Restaurants;