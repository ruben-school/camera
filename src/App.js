import React from 'react';
import CameraInput from './CameraInput';
import 'react-camera-ios/build/styles.css';
// import DataComponent, { initDb, getData, getImage } from './DB';
import './DBmodule.js';

/**
 * Brief description of the function here.
 * @param props met heel veel leuke dingen je weet zelf
 * @return JSX React component
 */
function App() {
  return (
    <div>
      <h1>Camera PWA prototype</h1>
      <CameraInput />
      <br />
      <button id="testImageBtn">Test image</button>
      <br />
      <img alt="testImage" id="testImage" style={{ width: '330px' }}></img>
    </div>
  );
}

export default App;
