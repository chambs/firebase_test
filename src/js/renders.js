// render functions
import React from 'react';
import {render} from 'react-dom';

export function domElement (element, properties={}) {
  var el, txt, eventName;

  if (element === 'text') {
    el = document.createTextNode();
  } else {
     el = document.createElement(element);
  }

  for (let k in properties) {
    if (k === 'text') {
      txt = document.createTextNode(properties[k]);
      el.appendChild(txt);
    } else if (k.match(/^on/)) {
      eventName = k.substr(2).replace(/^(.)/, (a) => {
        return a.toLowerCase();
      });
      el.addEventListener(eventName, properties[k], false);
    } else {
      el[k] = properties[k];
    }
  }
  return el;
}

var Header = React.createClass({
  render: function () {
    return (
      <h2>{this.props.children}</h2>
    );
  }
});

var StreamList = React.createClass({
  render: function () {
    return (
      <ul></ul>
    );
  }
});

export function appendTitle (str, list) {
  var lis = [];

  for (let k in list) {
    lis.push(<li>{list[k].title} : {list[k].url}</li>);
  }

  render(
    <ul>{lis}</ul>,
    document.querySelector('#result')
  );
}