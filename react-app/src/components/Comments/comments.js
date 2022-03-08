import { useEffect, useState } from 'react';
import { addComment, getComment, editComment, deleteComment } from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';


function CommentsComponent({comments}) {
    console.log(comments)
    const history = useHistory()
    const dispatch = useDispatch()
    // const { cheatsheetId } = useParams();
    let cheatsheetId = 1

    useEffect(() => {dispatch(getComment(cheatsheetId))}, [dispatch, cheatsheetId])
    const sessionUser = useSelector((state) => state?.session?.user);
    const commentsObj = useSelector((state) => state?.commentState)
    // const comments = Object.values(commentsObj)

    console.log('from comments.js ',commentsObj)
    // console.log('from comments.js 2: ',comments)



    return (
        <>
        <div className='comments_container'>
            <div className='view_comments'>

            </div>

            <form action=""></form>
            <div>{comments?.map(comment => (<div key={comment?.id} >{comment?.content}</div>))}</div>

        </div>
        </>
    )
}

export default CommentsComponent;
