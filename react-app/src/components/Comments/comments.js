import { useEffect, useState } from 'react';
import {getCheatsheets} from '../../store/cheatsheet'
import { addComment, getComment, editComment, deleteComment } from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function Comments() {
    const { cheatsheetsId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    
    const commentsObj = useSelector((state) => state.commentState)
    // const comments = Object.values(commentsObj)

    console.log('ASDFA', commentsObj)
    // console.log('@@@@@@@@@@', comments)

    return (
        <div>comments</div>
    )
}

export default Comments;
