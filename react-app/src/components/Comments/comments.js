import { useEffect, useState } from 'react';
import { addComment, getComment } from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import EditCommentsModal from '../EditComment/EditCommentModal';
import DeleteCommentButton from './DeleteComment';
import './comments.css'


function CommentsComponent({ cheatsheetId }) {
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

        if (postComment) {
            await dispatch(getComment(cheatsheetId))
            setContent('')
        }
    }


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
                            <div className='edit_delete_box'>
                                <EditCommentsModal comment={comment} cheatsheetId={cheatsheetId}/>
                                <DeleteCommentButton comment={comment}/>
                            </div>


                        </li>
                    ))}
                </ul>

            </div>
        </>
    )
}

export default CommentsComponent;
