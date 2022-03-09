import { useEffect, useState } from 'react';
import { addComment, getComment, editComment, deleteComment } from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './comments.css'


function CommentsComponent({ comments, cheatsheetId }) {
    // console.log('---------------------',typeof(+cheatsheetId))
    const dispatch = useDispatch();
    // const commentsObj = useSelector(state => state?.commentState);
    // const commentsVals = Object.values(comments)
    const sessionUser = useSelector((state) => state?.session?.user)

    console.log('prop passed from cheatsheet/index: ',comments)

    useEffect(() => {
        dispatch(getComment(cheatsheetId))
    }, [dispatch, cheatsheetId])

    const [ content, setContent ] = useState('')
    // const [postedContent, setPostedContent] = useState()

    // const userId = useSelector(state => state.session.user.id)
    // console.log('userid from comments',userId)


    // const commentsVals = cheatsheet && Object.values(cheatsheet?.comments)
    // console.log('from comments.js component:', commentsVals)

    // useEffect(() => {
    //     dispatch(getComment(id))
    // }, [ dispatch ])

    // const commentsObj = useSelector((state) => state.comments)
    // console.log('maybe we will get the thing we want...',commentsObj)


    const handleNewComment = async (e) => {
        e.preventDefault();
        const newComment = { writer_id: sessionUser.id , cheatsheet_id: cheatsheetId , content}

        console.log('from handler: ',cheatsheetId, content)
        const postComment = await dispatch(addComment(newComment));
        // const updateComments = await dispatch(getComment(cheatsheetId))

        if (postComment) {
            await dispatch(getComment(cheatsheetId))

        } else {
            console.log('post fail')
        }
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
                        className='post_comment_area'
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
                            {comment?.content}</li>))}
                </ul>

            </div>
        </>
    )
}

export default CommentsComponent;
