import fb from './firebase';
import {appendTitle, domElement} from './renders';

var data,
    result = document.querySelector('#result'),
    btnLogin = document.querySelector('[data-id="btn_login"]'),
    streamList = document.querySelector('#stream_list'),
    controls = document.querySelector('#controls'),
    streamTitle = document.querySelector('[name="stream_title"]'),
    streamUrl = document.querySelector('[name="stream_url"]'),
    _user = '',
    firstTimeRead = false;

//event binding
result.addEventListener('click', ev => {
  var target = ev.target || ev.srcElement;

  switch (target.getAttribute('data-id')) {
    case 'btn_login':
      fb.doAuth();
      break;
    case 'btn_add_stream':
      fb.addStream({
        title: streamTitle.value,
        url: streamUrl.value
      });
      break;
  }
}, false);

function appendToHTML (str) {
  result.innerHTML += str;
}

fb.onAuthStateChanged((user) => {
  if (user) {
    _user = user;
    controls.className = controls.className.replace(/hidden/, '');
  } else {
    btnLogin.className = btnLogin.className.replace(/hidden/, '');
  }
});

fb.onceValueRead(data => {
  var li;
  document.querySelector('#title').textContent = 'Reading data as user ' + _user.email;

  for (let k in data) {
    li = domElement('li', {
      text: data[k].title + ' - ' + data[k].url,
      className: 'link',
      id: k
    });

    streamList.appendChild(li);
  }
  firstTimeRead = true;
});

// after the first time all data is read, we start listen to child_added
fb.onDataAdded(data => {
  var li;
  if (firstTimeRead) {
    li = domElement('li', {
      text: data.val().title + ' - ' + data.val().url,
      className: 'link',
      id: data.key
    });
    streamList.appendChild(li);
    streamTitle.value = '';
    streamUrl.value = '';
  }
});


fb.initFirebase();
