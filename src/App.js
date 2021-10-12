import React from 'react';
import CameraInput from './CameraInput';
// import Camera, { DEVICE, FACING_MODE, PLACEMENT } from 'react-camera-ios';
import 'react-camera-ios/build/styles.css';

const customerData = [
  { ssn: '444-44-4444', name: 'Bill', age: 35, email: 'bill@company.com' },
  { ssn: '555-55-5555', name: 'Donna', age: 32, email: 'donna@home.org' },
];
const dbName = 'first IndexedDB';
const request = indexedDB.open(dbName, 1);

request.onupgradeneeded = (event) => {
  var db = event.request.result;
  var objectStore = db.createObjectStore('customers', { keyPath: 'ssn' });
  objectStore.createIndex('name', 'name', { unique: false });
  objectStore.createIndex('email', 'email', { unique: true });
  objectStore.transaction.oncomplete = function (event) {
    // Store values in the newly created objectStore.
    var customerObjectStore = db
      .transaction('customers', 'readwrite')
      .objectStore('customers');
    customerData.forEach(function (customer) {
      customerObjectStore.add(customer);
    });
  };
};

console.log(request);

function App() {
  return (
    <div>
      <h1>Camera PWA</h1>
      {/* <CameraInput /> */}
      <button onClick={request.onupgradeneeded}>Heyy</button>
      {/* <Camera
        device={DEVICE.TAB}
        facingMode={FACING_MODE.ENVIRONMENT}
        placement={PLACEMENT.CONTAIN}
        quality="1"
        onError={(error) => console.log(error)}
        onTakePhoto={(dataUrl) => console.log(dataUrl)}
      /> */}
    </div>
  );
}

export default App;
