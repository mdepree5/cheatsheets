import { useEffect } from 'react';
// import { addComment, getComment, editComment, deleteComment } from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CheatsheetForm from './cheatsheet_form';
import {getCheatsheet} from '../../store/cheatsheets';
// import Comments from '../Comments/comments';
import './Cheatsheet.css';


// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const CheatsheetPage = () => {
  const dispatch = useDispatch();
  const { cheatsheetId } = useParams();
  // const sessionUser = useSelector((state) => state.session.user)
  // const commentObject = useSelector((state) => state.commentState.comments[cheatsheetId])
  // console.log('ALSFHASFHD', commentObject)

  const cheatsheet = useSelector(state => state?.cheatsheet[cheatsheetId]);
  useEffect(() => {dispatch(getCheatsheet(cheatsheetId))}, [dispatch, cheatsheetId])
  
  console.log('hey')
  console.log(cheatsheet)

  const comments = cheatsheet?.comments
  const steps = cheatsheet?.steps

  console.log(comments)
  console.log(steps)

  return (
    <div>
      <div style={{height: '200px'}}></div>
      
      <CheatsheetForm />

      <h2>Title: {cheatsheet?.title}</h2>
      <div>Description: {cheatsheet?.description}</div>
      <div>Dependencies: {cheatsheet?.dependencies}</div>
      <img style={{height:'100px', width:'150px'}} src={cheatsheet?.media_url} alt="cheatsheet" />
      {/* <div>{comments?.map(comment => (<div key={comment?.id} >{comment?.content}</div>))}</div>
      <div>{steps?.map(step => (<div key={step?.id} >{step?.title} {step?.content}</div>))}</div> */}
      

      <div style={{height: '200px', border:'solid 1px black' }}>Steps go here:</div>

      {/* <Comments /> */}
    </div>
  );

}

export default CheatsheetPage;
