import { useEffect, useState } from 'react';
import { addComment, getComment, editComment, deleteComment } from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './comments.css'
import EditCommentsModal from '../EditComment/EditCommentModal';


function CommentsComponent({ cheatsheetId }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const commentsObj = useSelector(state => state?.commentReducer);
    const comments = Object.values(commentsObj)

    const sessionUser = useSelector((state) => state?.session?.user)


    useEffect(() => {
        dispatch(getComment(cheatsheetId))
    }, [dispatch, cheatsheetId])

    const [ content, setContent ] = useState('')



    const handleNewComment = async (e) => {
        e.preventDefault();
        const payload = {
            writer_id: sessionUser.id ,
            cheatsheet_id: cheatsheetId ,
            content
        }

        const postComment = await dispatch(addComment(payload));
        // const updateComments = await dispatch(getComment(cheatsheetId))

        if (postComment) {
            await dispatch(getComment(cheatsheetId))
            setContent('')
        }
    }

    const handleDelete = async (commentId) => {
        await dispatch(deleteComment(commentId))
        history.push(`/cheatsheets/${cheatsheetId}`)

    }


    // const sessionUser = useSelector((state) => state?.session?.user);
    // const commentVals = Object.values(commentsObj)


    return (
        <>
            <div className='comments_container'>
                <div className='view_comments'>

                </div>
                <form className='post_comment_form' >
                    <textarea
                        className='post_comment_textarea'
                        placeholder='write something'
                        cols="50"
                        rows="5"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        >
                    </textarea>
                    <button onClick={handleNewComment}>new comment</button>
                </form>



                <ul className='posted_comments_container'>
                    {comments?.map(comment => (
                        <li className={'posted_comments'} key={comment?.id}>
                            {comment?.content}
                            <EditCommentsModal comment={comment}/>
                            <button onClick={() => handleDelete(comment?.id)}>Delete</button>
                        </li>
                    ))}
                </ul>

            </div>
        </>
    )
}

export default CommentsComponent;
