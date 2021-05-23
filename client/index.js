import React from 'react';
import { render } from 'react-dom';
import TempComponent1 from './components/tempComponent.jsx';
import TempComponent2 from './components/tempComponent2.jsx';
import App from './App.jsx';

// Index.js is going to render our top-level component (App.jsx)
// Component Structure
// - App 
  // - MainContainer
  // - SearchContainer
  //   - SearchCreator
  // - DisplayContainer
  //   - Restaurants
  //     - Restaurant

render(
  <div>
    <App />
  </div>
  ,document.getElementById('root')
);