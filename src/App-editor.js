import React, { Component } from 'react';
import './App.css';
import Editor from 'draft-js-plugins-editor';
import {EditorState, ContentState, convertFromRaw, convertToRaw} from 'draft-js';
import '../node_modules/draft-js/dist/Draft.css'
import createMarkdownPlugin from 'draft-js-markdown-plugin';
import {draftToMarkdown, markdownToDraft} from 'markdown-draft-js'

const initialState = markdownToDraft(`
# Record your thoughts here...
`)
class App extends Component {
  state = {
    editorState: EditorState.createWithContent(convertFromRaw(initialState)),
    plugins: [createMarkdownPlugin()]
  };
  constructor (props) {
    super(props)
    this.onChange = editorState => {
      this.setState({editorState})

      // const content = this.state.editorState.getCurrentContent

    };
    this.save = () => {
      console.log('will save', this.state.editorState)
      const content = this.state.editorState.getCurrentContent()
      const md = draftToMarkdown(convertToRaw(content))
      debugger
    }

    if (!props.onChange) {
      this.emit = () =>{}
    } else {
      this.emit = props.onChange
    }
  }
  render() {
    return (
      <div className='container'>
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
  }
}

export default App;
