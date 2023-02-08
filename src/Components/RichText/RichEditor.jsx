import React, {useState} from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { stateToHTML} from 'draft-js-export-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function RichEditor() {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const html = stateToHTML(editorState.getCurrentContent());

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={(newEditorState) => {
          setEditorState(newEditorState);

          console.log(html)
        }}
      />
    </div>
  )
}
export default RichEditor;