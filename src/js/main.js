import fb from './firebase';
import {appendTitle} from './renders';

var data,
    result = document.querySelector('#result');

function appendToHTML (str) {
  result.innerHTML += str;
}


fb.onAuthStateChanged((user) => {
  if (user) {
    // appendToHTML('Reading data as user ' + user.email + '<br><br>');
    

    fb.readData((data) => {
      appendTitle('Reading data as user ' + user.email, data);
      
      // for (let k in data) {
      //   appendToHTML(data[k].title + ' - ' + data[k].url + '<br>');
      // }
    });
  } else {
    console.log('ate passou aqui, mas o user tava null');
    fb.doAuth();
  }
});

fb.initFirebase();