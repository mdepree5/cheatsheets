import { useEffect, useState } from 'react';
import { addComment, getComment, editComment, deleteComment } from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';


function CommentsComponent({comments, cheatsheetId}) {
    // console.log('from comments.js component:', comments)
    const { id } = useParams();
    const dispatch = useDispatch()
    // const history = useHistory()

    // const [content, setContent] = useState(comments.content)


    useEffect(() => {
        dispatch(getComment(id))
    }, [dispatch])

    const commentsObj = useSelector((state) => state.comments)
    console.log('maybe we will get the thing we want...',commentsObj)


    // const sessionUser = useSelector((state) => state?.session?.user);
    // const commentVals = Object.values(commentsObj)


    return (
        <>
        <div className='comments_container'>
            <div className='view_comments'>

            </div>
            <form className='post_comment_form'>
                <textarea className='post_comment_area' cols="50" rows="5"></textarea>
                <button>new comment</button>
            </form>



            <div>{comments?.map(comment => (<div key={comment?.id} >{comment?.content}</div>))}</div>

        </div>
        </>
    )
}

export default CommentsComponent;
