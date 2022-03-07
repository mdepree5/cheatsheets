import { useEffect, useState } from 'react';
import { addComment, getComment, editComment, deleteComment } from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Comments from '../Comments/comments';
import './Cheatsheet.css';
// import { useParams } from 'react-router-dom';

// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCheatsheet} from '../../store/cheatsheet';

const CheatsheetPage = () => {
  // const dispatch = useDispatch();
  // const { cheatsheetId } = useParams();
  // const sessionUser = useSelector((state) => state.session.user)
  // const commentObject = useSelector((state) => state.commentState.comments[cheatsheetId])
  // console.log('ALSFHASFHD', commentObject)

  return (
    <div>
      <Comments />
    </div>
  );


export default CheatsheetPage;
