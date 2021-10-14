import { useState } from 'react';

const dbName = 'LocalDB';
const request = window.indexedDB.open(dbName, 1);
let componentData;
let show = false;

export function initDb() {
  request.onupgradeneeded = () => {
    let db = request.result;
    let store = db.createObjectStore('doorvoertijden', { keyPath: 'leverancier' });
    let firstData = { aankomst: '', colli: 2, pallets: 0, leverancier: 'Rhodius' };
    let secondData = { aankomst: '', colli: 1, pallets: 0, leverancier: 'Test' };
    store.put(firstData);
    store.put(secondData);
  };

  request.onsuccess = () => {
    if (request.readyState === 'done') {
      console.log('Data is succesfully inserted into DB.');
    }
  };
}

export function getData() {
  const transaction = request.result.transaction(['doorvoertijden'], 'readonly');
  const objectStore = transaction.objectStore('doorvoertijden');
  componentData = objectStore.get('Rhodius');

  transaction.oncomplete = function (event) {
    console.log('transaction completed');
    console.log('transaction result: ', componentData);
    show = true;
  };

  transaction.onerror = () => {
    console.log('Transaction not opened due to error:' + transaction.error);
  };
}

export function getImage() {
  // IndexedDB
  var indexedDB =
      window.indexedDB ||
      window.webkitIndexedDB ||
      window.mozIndexedDB ||
      window.OIndexedDB ||
      window.msIndexedDB,
    IDBTransaction =
      window.IDBTransaction ||
      window.webkitIDBTransaction ||
      window.OIDBTransaction ||
      window.msIDBTransaction,
    dbVersion = 1.0;

  // Create/open database
  var request = indexedDB.open('elephantFiles', dbVersion),
    db,
    createObjectStore = function (dataBase) {
      // Create an objectStore
      console.log('Creating objectStore');
      dataBase.createObjectStore('elephants');
    },
    getImageFile = function () {
      // Create XHR
      var xhr = new XMLHttpRequest(),
        blob;

      xhr.open('GET', 'elephant.png', true);
      // Set the responseType to blob
      xhr.responseType = 'blob';

      xhr.addEventListener(
        'load',
        function () {
          if (xhr.status === 200) {
            console.log('Image retrieved');

            // Blob as response
            blob = xhr.response;
            console.log('Blob:' + blob);

            // Put the received blob into IndexedDB
            putElephantInDb(blob);
          }
        },
        false
      );
      // Send XHR
      xhr.send();
    },
    putElephantInDb = function (blob) {
      console.log('Putting elephants in IndexedDB');

      // Open a transaction to the database
      var transaction = db.transaction(['elephants'], IDBTransaction.READ_WRITE);

      // Put the blob into the dabase
      var put = transaction.objectStore('elephants').put(blob, 'image');

      // Retrieve the file that was just stored
      transaction.objectStore('elephants').get('image').onsuccess = function (event) {
        var imgFile = event.target.result;
        console.log('Got elephant!' + imgFile);

        // Get window.URL object
        var URL = window.URL || window.webkitURL;

        // Create and revoke ObjectURL
        var imgURL = URL.createObjectURL(imgFile);

        // Set img src to ObjectURL
        var imgElephant = document.getElementById('elephant');
        imgElephant.setAttribute('src', imgURL);

        // Revoking ObjectURL
        URL.revokeObjectURL(imgURL);
      };
    };

  request.onerror = function (event) {
    console.log('Error creating/accessing IndexedDB database');
  };

  request.onsuccess = function (event) {
    console.log('Success creating/accessing IndexedDB database');
    db = request.result;

    db.onerror = function (event) {
      console.log('Error creating/accessing IndexedDB database');
    };

    // Interim solution for Google Chrome to create an objectStore. Will be deprecated
    if (db.setVersion) {
      if (db.version != dbVersion) {
        var setVersion = db.setVersion(dbVersion);
        setVersion.onsuccess = function () {
          createObjectStore(db);
          getImageFile();
        };
      } else {
        getImageFile();
      }
    } else {
      getImageFile();
    }
  };

  // For future use. Currently only in latest Firefox versions
  request.onupgradeneeded = function (event) {
    createObjectStore(event.target.result);
  };
}

export default function DataComponent() {
  if (show) {
    return <p>{componentData.result.leverancier}</p>;
  } else {
    return <p></p>;
  }
}
