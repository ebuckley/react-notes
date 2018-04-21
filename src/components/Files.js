
import React, { Component } from 'react';
import get from 'lodash.get';
import firebase from 'firebase'
import {getProjectFiles} from '../services/projects';

export default class FilesComponent extends Component {

  componentDidMount() {
    // let projectid = get(this, 'props.project')
    // const user = get(this, 'props.user')
    // if (projectid && user) {
    //   this.setState({loading: true})
    //   getProjectFiles(user, projectid)
    //     .then(results => {
    //       this.setState({
    //         loading: false,
    //         files: results
    //       })
    //     }, err => {
    //       console.error('error', err)
    //       this.setState({
    //         loading: false,
    //         error: err
    //       })
    //     })
    // }
  }
  render() {
    const projectid = get(this, 'props.project')
    const loading = get(this, 'state.loading', false)
    const error = get(this, 'state.error', false)

    if (loading) {
      return <div>Loading... </div>
    } else if (error) {
      return <div>{error}</div>
    } else {
      return (
        <div>
          All files from {projectid}
        </div>
      )
    }
  }
}