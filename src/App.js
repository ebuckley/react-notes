import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import config from './config';

import get from 'lodash.get'
import {getProjects} from './services/projects';

import Login from './components/Login';
import Projects from './components/Projects'
import Files from './components/Files'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

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
  render() {
    
    const projects = ({match}) => (
      <div>
        <Route path={`${match.path}/:projectid`} render={({match}) => (
          <Files user={this.state.user} project={match.params.projectid}/>
        )}/>
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
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/about">About</Link></li>
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
    // if (this.state.user && this.state.projects) {
    //   return <Projects projects={get(this.state, 'projects', [])} />
    // } else if(this.state.user) {
    //   return <div>Just loading!</div>
    // } else {
    //   return <Login />
    // }
  }
}

export default App;
