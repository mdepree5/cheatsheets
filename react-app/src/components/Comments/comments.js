import { useEffect, useState } from 'react';
import { addComment, getComment, editComment, deleteComment } from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './comments.css'


function CommentsComponent({ comments, cheatsheet, cheatsheetId }) {
    const { id } = useParams();
    const dispatch = useDispatch()
    // const history = useHistory()

    const [ content, setContent ] = useState('')
    // const [postedContent, setPostedContent] = useState()

    // const userId = useSelector(state => state.session.user.id)
    // console.log('userid from comments',userId)


    const commentsVals = cheatsheet && Object.values(cheatsheet?.comments)
    console.log('from comments.js component:', commentsVals)

    // useEffect(() => {
    //     dispatch(getComment(id))
    // }, [ dispatch ])

    // const commentsObj = useSelector((state) => state.comments)
    // console.log('maybe we will get the thing we want...',commentsObj)


    // const handleNewComment = async (e) => {
    //     e.preventDefault();
    //     const newComment = { userId: user.id, cheatsheetId, content}
    //     await dispatch(addComment(newComment));
    //     await dispatch(getComment(cheatsheetId))
    // }


    // const sessionUser = useSelector((state) => state?.session?.user);
    // const commentVals = Object.values(commentsObj)


    return (
        <>
            <div className='comments_container'>
                <div className='view_comments'>

                </div>
                <form className='post_comment_form' >
                    <textarea className='post_comment_area' placeholder='write something' cols="50" rows="5"></textarea>
                    <button>new comment</button>
                </form>



                <ul className='posted_comments_container'>
                    {comments?.map(comment => (
                        <li className={'posted_comments'} key={comment?.id}>
                            {comment?.content}</li>))}
                </ul>

            </div>
        </>
    )
}

export default CommentsComponent;
