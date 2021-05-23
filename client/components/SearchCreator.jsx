import React, { useState, useEffect } from 'react';
const Stream = require('stream');

const SearchCreator = (props) => {

  const [categories, setCategory] = useState('');
  const [location, setLocation] = useState('');


  const handleClick = (event) => {
    const categories = document.getElementById('category').value
    const location = document.getElementById('location').value
    const email = document.getElementById('email').value

    setCategory(categories);
    setLocation(location);
    props.setEmail(email);
    const body = { categories, location, email }
    
    console.log(body);
    console.log(categories);
    console.log(location);
    console.log(email);
    event.preventDefault();
    console.log(event);

    // send a fetch request once the button has been clicked, send our details in the body
    fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((response) => response.body)
      .then((body) => {

        // a lot of data is received, so it will need to be received in 'chunks' or a readable stream
        // the below utilizes the ReadableStream() method on the Fetch API
        // https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
        const reader = body.getReader();

        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader.read().then(({ done, value }) => {
                // If there is no more data to read
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                // Check chunks by logging to the console
                console.log(done, value);
                push();
              })
            }

            push();
          }
        });
      })
      // once the "Uint8Array" has been read, take that stream and convert to text
      .then(stream => {
        return new Response(stream, {
          headers: { "Content-Type": "text/html" }
        }).text();
      })
      // convert the text to JS Object using JSON.parse()
      .then(result => {
        const parsedResults = JSON.parse(result);
        console.log(parsedResults);
        // use the setRestaurants hook to update the MainContainer's local state variable restaurants
        const { details } = parsedResults;
        props.setRestaurants(details);
      })
      .catch((err) => console.log('Error', err));
  }

  return (
    <div>
      {/* <h1>Search Creator</h1> */}
      <form>
        <label>
          Category:
          <input type="text" id="category" />
        </label>
        <label>
          Location:
          <input type="text" id="location" />
        </label>
        <label>
          Email:
          <input type="text" id="email" />
        </label>

        <input type="button" value="Submit" onClick={handleClick} />
      </form>
    </div>
  )
}

export default SearchCreator;