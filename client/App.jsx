import React from 'react';
import { render } from 'react-dom';
import TempComponent1 from './components/tempComponent.jsx';
import TempComponent2 from './components/tempComponent2.jsx';
import MainContainer from './containers/MainContainer.jsx';

const App = (props) => {

  return (
    <div>
      {/* <TempComponent1></TempComponent1> */}
      <MainContainer />
    </div>
  )
}

export default App;