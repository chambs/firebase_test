import Firebase from './firebase';

console.log(Firebase);

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCAWx8dooTve1pnXXEuFmWWUjVMOdgP6p0",
    authDomain: "cmstest-624a1.firebaseapp.com",
    databaseURL: "https://cmstest-624a1.firebaseio.com",
    storageBucket: "cmstest-624a1.appspot.com",
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var streams = database.ref('streams');
  var user = null;

  function addStream (data) {
    stream.push({title: 'new manifest file', url: 'http://myurl.com/Manifest.mpd'})
    .then( (data) => {
      console.log('success', data);
    }).catch( (woot) => {
      console.log('failure', woot);
    });
  }

  // list data once from snapshot
  function readData () {
    streams.once('value').then(function (data) {
      console.log('data!', data);
    }).catch(function (err) {
      console.log('error', err);
    });
  }

  readData();

  function readUser () {
    firebase.auth().currentUser;
  }
  
  firebase.auth().onAuthStateChanged(function (_user) {
    user = _user;
    console.log('user', user.email);
  });

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
