import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import './Cheatsheet.css';

export const SpacedLine = ({width, margin=null}) => (<><br /><div style={{width:`${width}`, margin:`${margin}`}} className="line" /><br /></>)


const CheatsheetPage = () => { 

  const cheatsheetId = 1;

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/cheatsheets/${cheatsheetId}`);
      console.log(response);
      const cheatsheet = await response.json();
      console.log('cheatsheet');
      console.log(cheatsheet);
      alert(cheatsheet);
    })();
  }, []);


  const [editorState, setEditorState]= useState('')
  const CheatsheetPage = ({children}) => <div className='page-container'>{children}</div>
  const StepContainer = ({children}) => <div className='step-container'>{children}</div>
  const StepButtons = ({children}) => <div className='step-buttons'>{children}</div>
  const StepPlaceholder = ({children}) => <div className='step-placeholder'>{children}</div>


  const addStep = () => {
    alert('Step added')
    setEditorState('')
  }

  return (
    <CheatsheetPage>
      
      <SpacedLine width='75%'/>

      <StepPlaceholder>Step 1: Git clone </StepPlaceholder>
      <StepPlaceholder>Step 2: Install dependencies </StepPlaceholder>
      <StepPlaceholder>Step 3: Create .env file </StepPlaceholder>
      
      <SpacedLine width='75%'/>

      <StepContainer>
        {/* <Editor
          editorState={editorState}
          onEditorStateChange={editorState => setEditorState(editorState)}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        /> */}
        <StepButtons>
          <br />
          <button style={{color:'red'}} onClick={addStep}>Add Image Here</button>
          <br />
          <button style={{color:'green'}} onClick={addStep}>Add Step</button>
        </StepButtons>
      </StepContainer>

    </CheatsheetPage>
  )
}

export default CheatsheetPage;
