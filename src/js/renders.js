// render functions
import React from 'react';
import {render} from 'react-dom';



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