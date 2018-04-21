import React, { Component } from 'react';
import './App.css';
import Editor from 'draft-js-plugins-editor';
import {EditorState, ContentState, convertFromRaw, convertToRaw} from 'draft-js';
import createMarkdownPlugin from 'draft-js-markdown-plugin';
import {draftToMarkdown, markdownToDraft} from 'markdown-draft-js';
import firebase from 'firebase';
import config from './config';

import get from 'lodash.get'
import {getProjects} from './services/projects';

import Login from './components/Login';
import Projects from './components/Projects'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

firebase.initializeApp(config.firebase);

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <link to="/">Home</link>
        </li>
        <li>
          <link to="/about">About</link>
        </li>
      </ul>

      <hr />
      <Route exact path="/" Component={Home} />
      <Route exact path="/login" Component={Login} />
    </div>
  </Router>
)

const Home = (match) => {
  return (
    <h1> Welcome home </h1>
  )
}

const initialState = markdownToDraft(`
# Record your thoughts here...
`)
class App extends Component {
  state = {
    editorState: EditorState.createWithContent(convertFromRaw(initialState)),
    plugins: [createMarkdownPlugin()],
    user: null,
  };
  constructor (props) {
    super(props)
    this.onChange = editorState => this.setState({editorState});
    this.save = () => {
      console.log('will save', this.state.editorState)
      const content = this.state.editorState.getCurrentContent()
      console.log(draftToMarkdown(convertToRaw(content)))

      getProjects(this.state.user)

    }
    const that = this;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
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
    
    const editor =  (
      <div className='container'>
        Welcome {get(this, 'state.user.displayName', 'NO NAME')}
        <div className='editor-container'>
          <Editor 
            placeholder="Write something here..."
            editorState={this.state.editorState}
            plugins={this.state.plugins}
            onChange={this.onChange} />
        </div>
        <button onClick={this.save}>Save</button>
      </div>
    );

    if (this.state.user && this.state.projects) {
      return <Projects projects={get(this.state, 'projects', [])} />
    } else if(this.state.user) {
      return <div>Just loading!</div>
    } else {
      return <Login />
    }
  }
}

export default App;
