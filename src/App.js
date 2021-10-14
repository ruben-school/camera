import React from 'react';
import CameraInput from './CameraInput';
import 'react-camera-ios/build/styles.css';
// import DataComponent, { initDb, getData, getImage } from './DB';
import './DBscript.js';

function App() {
  return (
    <div>
      <h1>Camera PWA prototype</h1>
      <CameraInput />
      <br />
      <button id="testImageBtn">Test image</button>
      <br />
      <img alt="testImage" id="testImage" style={{ width: '330px' }}></img>
      {/* <button onClick={handleClick}>Show first</button> */}
      {/* <DataComponent /> */}
    </div>
  );
}

export default App;
