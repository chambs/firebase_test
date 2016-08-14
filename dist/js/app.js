/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _firebase = __webpack_require__(2);

	var _firebase2 = _interopRequireDefault(_firebase);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log(_firebase2.default);

	// Initialize Firebase
	var config = {
	  apiKey: "AIzaSyCAWx8dooTve1pnXXEuFmWWUjVMOdgP6p0",
	  authDomain: "cmstest-624a1.firebaseapp.com",
	  databaseURL: "https://cmstest-624a1.firebaseio.com",
	  storageBucket: "cmstest-624a1.appspot.com"
	};
	firebase.initializeApp(config);

	var database = firebase.database();
	var streams = database.ref('streams');
	var user = null;

	function addStream(data) {
	  stream.push({ title: 'new manifest file', url: 'http://myurl.com/Manifest.mpd' }).then(function (data) {
	    console.log('success', data);
	  }).catch(function (woot) {
	    console.log('failure', woot);
	  });
	}

	// list data once from snapshot
	function readData() {
	  streams.once('value').then(function (data) {
	    console.log('data!', data);
	  }).catch(function (err) {
	    console.log('error', err);
	  });
	}

	readData();

	function readUser() {
	  firebase.auth().currentUser;
	}

	firebase.auth().onAuthStateChanged(function (_user) {
	  user = _user;
	  console.log('user', user.email);
	});

	//authenticate user with google as a provider
	function doAuth() {
	  var provider = new firebase.auth.GoogleAuthProvider();

	  firebase.auth().signInWithPopup(provider).then(function (result) {
	    var token = result.credential.accessToken;
	    user = result.user;
	    console.log('yay, user logged');
	  }).catch(function () {
	    console.log('authentication failed');
	  });
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  a: function a() {
	    return 'hi';
	  }
	};

/***/ }
/******/ ]);