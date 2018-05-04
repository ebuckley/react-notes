
import React, { Component } from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux'
import Editor from './Editor'
import './styles/Files.css'
import {saveFile} from '../services/projects';

function mapStateToProps(state) {

  return state;
}

const mapDispatchToProps = dispatch => {
  // nothing
  // this function allows you to create functions that dispatch to redux.
  return {
  }
}

function dateSortFile(a, b) {
  a = new Date(a.name);
  b = new Date(b.name);
  return a>b ? -1 : a<b ? 1 : 0;
}

function FileTile(file, onFocus) {
  const key = file.name
  return (<div key={key} className="tile-file">
  <h4>{file.name}</h4>
  <div>
    <button onClick={() => onFocus(file)}>Show</button>
  </div>
  <pre>{file.content}</pre>
  </div>)
}

/**
 * delat an amount of time then resolve
 * @param {number} time in millisecons 
 */
const delay = time => new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve()
  }, time)
})
class FilesComponent extends Component {
  constructor (props) {
    super(props)

    this.setState({isEditing: false})

    this.onFocus = (file) => {
      this.setState({focused: file, isEditing: true})
      window.scrollTo(0,0);
    }

    // What the boilerplate?!
    this.hideFiles = this.hideFiles.bind(this);
    this.updateOrSaveFile = this.updateOrSaveFile.bind(this);
    this.persistFile = this.persistFile.bind(this);
  }
  
  hideFiles() {
    this.setState({isEditing:false})
  }

  updateOrSaveFile(content) {
    if (content) {
      this.content = content; // hmm can't be this easy...
    }
  }

  persistFile() {
    if (this.props.project) {
      this.setState({isSaving: true})
      saveFile(this.props.project, this.state.focused.name, this.content)
        .then(has_saved => {
          this.setState({isSaving: false})
        }, err => {
          this.setState({isSaving: false})
          alert(err);
        })
    } 
  }

  render() {
    const projectid = get(this, 'props.project')
    const loading = get(this, 'state.loading', false)
    const error = get(this, 'state.error', false)
    const files = get(this, 'props.files', [])
    const fileCount = files.length;
    const focusedName = get(this, 'state.focused.name', '')
    const focusContent = get(this, 'state.focused.content', '')
     
    const savingAction = get(this, 'state.savingAction', new Promise(()=>{}));

    let isSavingClass = ' ';
    if (get(this, 'state.isSaving')) {
      isSavingClass = ' loading'
    }

    if (loading || (fileCount === 0)) {
      return <div>Loading... </div>
    } else if (error) {
      return <div>{error}</div>
    } else {
      const isEditing = get(this, 'state.isEditing') ? '' : 'modal-closed';
      return (
        <div>
          <div className={"modal-overlay " + isEditing }></div>
          <div ref={n => this.wrapperEl = n} className={"files-edit-modal " + isEditing}>
            <div className={"files-edit-modal-content" + isSavingClass}>
              <div class='modal-actions'>
                <button onClick={this.hideFiles}>discard </button>
                <button onClick={this.persistFile}>SAVE</button>
                <div class='title'><i>title:</i>{focusedName}</div>
              </div>
              <Editor onChange={this.updateOrSaveFile} value={focusContent} />
            </div>
          </div>
          {fileCount} files from {projectid}
          <div className="tile-container">
            {files.sort(dateSortFile).map(f => FileTile(f, this.onFocus))}
          </div>
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