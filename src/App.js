import React from 'react';
import './App.css';
import Camera, { DEVICE, FACING_MODE, PLACEMENT } from 'react-camera-ios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Camera
          device={DEVICE.TAB}
          facingMode={FACING_MODE.ENVIRONMENT}
          placement={PLACEMENT.CONTAIN}
          quality="1"
          onError={(error) => console.log(error)}
          onTakePhoto={(dataUrl) => console.log(dataUrl)}
        />
      </header>
    </div>
  );
}

export default App;
