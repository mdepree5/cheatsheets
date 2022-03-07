import { useEffect, useState } from 'react';
import { addComment, getComment, editComment, deleteComment } from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function Comments() {
    const { cheatsheetsId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    // const commentsObj = useSelector((state) => state.commentState.comments[cheatsheetsId])
    // const comments = Object.values(commentsObj)

    // console.log('ASDFA', comments)

    return (<div>comments</div>)
}

export default Comments;
