import React, { Component } from 'react';

import firebase from 'firebase';


export default class LoginComponent extends Component {
  login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
  }
  render() {
    return (
      <div>
        <button onClick={this.login}>Login with google</button>
      </div>
    )
  }
}