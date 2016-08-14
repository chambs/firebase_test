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
    authStateChanged = function () {};

function initFirebase () {
  firebase.initializeApp(config);
  database = firebase.database();
  streams = database.ref('streams');
  firebase.auth().onAuthStateChanged(authStateChanged);
}

function onAuthStateChanged (cb) {
  authStateChanged = cb;
}

function addStream (data) {
  stream.push({title: 'new manifest file', url: 'http://myurl.com/Manifest.mpd'})
  .then( (data) => {
    console.log('success', data);
  }).catch( (woot) => {
    console.log('failure', woot);
  });
}

// list data once from snapshot
function readData (cb) {
  streams.once('value').then((data) => {
    cb(data.val());
    window.lero = data;
  }).catch((err) => {
    console.log('error', err);
  });
}

function readUser () {
  firebase.auth().currentUser;
}

//authenticate user with google as a provider
function doAuth() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
  .then(function (result) {
    var token = result.credential.accessToken;
    user = result.user;
    console.log('yay, user logged');
  }).catch(function () {
    console.log('authentication failed');
  });
}

export default {
  doAuth,
  initFirebase,
  onAuthStateChanged,
  readData,
  readUser
}
