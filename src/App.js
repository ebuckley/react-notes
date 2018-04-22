import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import config from './config';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

import get from 'lodash.get'
import {getProjects} from './services/projects';
import Login from './components/Login';
import Projects from './components/Projects'
import Files from './components/Files'
import {fetchFiles} from './store/actions';
import { store } from './store'
import {userLogin} from './store/actions'


firebase.initializeApp(config.firebase);

class App extends Component {
  state = {
    user: null,
  };
  constructor (props) {
    super(props)
    const that = this;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const state = that.state;
        that.setState(Object.assign(state, {user}))

        store.dispatch(userLogin(user));
        getProjects(user)
          .then(projects => {
            that.setState(Object.assign(that.state, {projects}))
            console.log('loaded projects', projects)
          })
          console.log('got user state', user)
      } else {
        console.log('got logged out user state')
        that.setState(Object.assign(that.state, {user: null}))
      }
    });

  }
  getState(user, projectid) {
  }
  render() {
    
    const projects = ({match}) => (
      <div>
        <Route path={`${match.path}/:projectid`} render={({match}) => {
          const state = this.state
          store.dispatch(fetchFiles(state.user.toJSON(), match.params.projectid));
          return (
            <Files user={this.state.user}/>
          )
      }}/>
        <Route exact path={match.path} render={() => (
          <Projects projects={get(this, 'state.projects', [])}/>
        )}/>
      </div>
    )
    const about = () => (
      <div>
        <h2>About</h2>
        <p>
          Hi there,
        </p>
        <p>
          Created on a lazy weekend to test out the slate editor.
        </p>
        <p>
          <i>best, ersin</i>
        </p>
      </div>
    )

    let getLogin = (<Login/>)
    if (this.state.user) {
      getLogin = (<span></span>)
    }
    const router = (
      <Router>
        <div>
          <ul class='nav'>
            <li><NavLink activeClassName="active" to="/">Home</NavLink></li>
            <li><NavLink activeClassName="active" to="/projects">Projects</NavLink></li>
            <li><NavLink activeClassName="active" to="/about">About</NavLink></li>
            {getLogin}
          </ul>
    
          <hr/>
          <Route exact path="/" component={projects}/>
          <Route path="/about" component={about}/>
          <Route path="/projects" component={projects}/>
        </div>
      </Router>)

    if (this.state.user) {
      return router;
    } else {
      return <div> Loading... </div>
    }
  }
}

export default App;
