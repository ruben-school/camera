// https://www.raymondcamden.com/2018/10/05/storing-retrieving-photos-in-indexeddb
let db;
let dbVersion = 1;

document.addEventListener('DOMContentLoaded', () => {
  console.log('dom content loaded');

  document.querySelector('#pictureTest').addEventListener('change', doFile);

  document.querySelector('#testImageBtn').addEventListener('click', doImageTest);

  initDb();
});

function initDb() {
  let request = indexedDB.open('testPics', dbVersion);

  request.onerror = function (e) {
    console.error('Unable to open database.');
  };

  request.onsuccess = function (e) {
    db = e.target.result;
    console.log('db opened');
  };

  request.onupgradeneeded = function (e) {
    let db = e.target.result;
    db.createObjectStore('cachedForms', { keyPath: 'id', autoIncrement: true });
  };
}

/**
 * Event handler to catch the file, transform it to binary code and save it in IndexedDB
 * @param {event} e - event object with the actual image file in e.target.files[0]
 */
function doFile(e) {
  console.log('change event fired for input field', e.target.result);
  let file = e.target.files[0];
  var reader = new FileReader();
  //				reader.readAsDataURL(file);
  reader.readAsBinaryString(file);

  reader.onload = function (e) {
    let bits = e.target.result;
    let ob = {
      created: new Date(),
      data: bits,
    };

    let trans = db.transaction(['cachedForms'], 'readwrite');
    let addReq = trans.objectStore('cachedForms').add(ob);

    addReq.onerror = function (e) {
      console.log('error storing data');
      console.error(e);
    };

    trans.oncomplete = function (e) {
      console.log('data stored and closed');
    };
  };
}

function doImageTest() {
  console.log('doImageTest');
  let img = document.querySelector('#testImage');

  let trans = db.transaction(['cachedForms'], 'readonly');
  //hard coded id
  let req = trans.objectStore('cachedForms').get(1);
  req.onsuccess = function (e) {
    let record = e.target.result;
    console.log('get success', record);
    const tobase64 = (str) => new Buffer.from(str, 'binary').toString('base64');
    console.log('hier is ie dan: ', tobase64(record.data));
    img.src = 'data:image/*;base64,' + tobase64(record.data);
  };
}
