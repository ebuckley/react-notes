import React, { Component } from 'react';
import DraftEditor from 'draft-js-plugins-editor';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import createMarkdownPlugin from 'draft-js-markdown-plugin';
import {draftToMarkdown, markdownToDraft} from 'markdown-draft-js'
import './styles/Draft.css';
import './styles/Editor.css'

const initialState = '_Let your mind wander_';


const stateToMd = editorState => {
  const content = editorState.getCurrentContent()
  const md = draftToMarkdown(convertToRaw(content))
  return md
}

const mdToState = md => {
  const raw = markdownToDraft(md)
  return EditorState.createWithContent(convertFromRaw(raw))
}

class Editor extends Component {
  state = {
    editorState: mdToState(initialState),
    plugins: [createMarkdownPlugin()]
  };

  componentWillReceiveProps(nextProps) {
    const editorState = mdToState(nextProps.value)
    this.setState({editorState})
  }
  constructor(props) {
    super(props)

    this.onChange = (editorState) => {
      this.setState({editorState})
      const md = stateToMd(editorState);
      this.emit(md);
    }

    if (!props.onChange) {
      this.emit = () =>{}
    } else {
      this.emit = props.onChange
    }
  }
  render(props) {
    let state = this.state.editorState

    return (
      <div className='editor-wrapper'>
        <div className='editor-container'>
          <DraftEditor 
            placeholder="Write something here..."
            editorState={state}
            plugins={this.state.plugins}
            onChange={this.onChange} />
        </div>
      </div>)
  }
}

export default Editor;