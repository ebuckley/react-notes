
import React, { Component } from 'react';
import get from 'lodash.get';
import {loadFiles, fetchFiles} from '../store/actions'
import {store} from '../store'

import { connect } from 'react-redux'


function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = dispatch => {
  // nothing
  return {
  }
}
function dateSortFile(a, b) {
  a = new Date(a.dateModified);
  b = new Date(b.dateModified);
  return a>b ? -1 : a<b ? 1 : 0;
}

function FileTile(file, onFocus) {
  return (<div>
  <h4>{file.name}</h4>
  <div>
    <button onClick={() => onFocus(file)}>Show</button>
  </div>
  <pre>{file.content}</pre>
  </div>)
}
class FilesComponent extends Component {
  constructor (props) {
    super(props)
    this.onFocus = (file) => {
      const state = this
      console.log('TODO: make this file the focus', file, state)
    }
  }
  componentDidMount() {
    const props = this.props;
  }
  
  render() {
    const projectid = get(this, 'props.project')
    const loading = get(this, 'state.loading', false)
    const error = get(this, 'state.error', false)
    const files = get(this, 'props.files', [])
    const fileCount = files.length;
    

    if (loading || fileCount == 0) {
      return <div>Loading... </div>
    } else if (error) {
      return <div>{error}</div>
    } else {
      return (
        <div>
          {fileCount} files from {projectid}
          {files.map(f => FileTile(f, this.onFocus))}
        </div>
      )
    }
  }
}

const FilesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilesComponent)

export default FilesList