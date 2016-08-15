// Initialize Firebase

/** SIMPLE FIREBASE RULES SO ONLY SOME USERS CAN SEE AND ADD STUFF:

{
  "rules": {
    ".read": "auth != null && (auth.isAdmin == true || auth.token.email == 'o.chambs@gmail.com')",
    ".write": "auth != null && (auth.token.email.matches(/@castlabs.com$/) || auth.token.email == 'o.chambs@gmail.com')"
  }
}
*/

// REPLACE HERE WITH YOUR OWN FIREBASE INFO
var config = {
  apiKey: "AIzaSyCAWx8dooTve1pnXXEuFmWWUjVMOdgP6p0",
  authDomain: "cmstest-624a1.firebaseapp.com",
  databaseURL: "https://cmstest-624a1.firebaseio.com",
  storageBucket: "cmstest-624a1.appspot.com",
},
    database,
    streams,
    user = null,
    authStateChanged = function () {},
    onceValue = function () {},
    dataAdded = function () {};

function initFirebase () {
  firebase.initializeApp(config);
  database = firebase.database();
  streams = database.ref('streams');
  firebase.auth().onAuthStateChanged(authStateChanged);

  streams.once('value')
  .then((data) => {
    onceValue(data.val());
  }).catch((err) => {
    console.log('error', err);
  });

  streams.on('child_added', dataAdded);
}

function onAuthStateChanged (cb) {
  authStateChanged = cb;
}

function onceValueRead (cb) {
  onceValue = cb;
}

function onDataAdded (cb) {
  dataAdded = cb;
}

function addStream (newData) {
  // {title: 'new manifest file', url: 'http://myurl.com/Manifest.mpd'}
  streams.push(newData);
}

function readUser () {
  firebase.auth().currentUser;
}

//authenticate user with google as a provider
function doAuth() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
  .then((result) => {
    var token = result.credential.accessToken;
    user = result.user;
  }).catch((err) => {
  });
}

export default {
  doAuth,
  initFirebase,
  onAuthStateChanged,
  onceValueRead,
  addStream,
  onDataAdded
}
