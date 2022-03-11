import { deleteComment } from "../../store/comments"
import { useDispatch, useSelector } from "react-redux"
import match from "../../utils/match"
import './comments.css'


const DeleteCommentButton = ({ comment, cheatsheetId }) => {
    const dispatch = useDispatch();

    const sessionId = useSelector(state => state?.session?.user?.id)
    const writerId = comment.writer_id

    const matchingToSessionUser = match(sessionId, writerId)


    const handleDelete = async (commentId) => {
        await dispatch(deleteComment(commentId))
    }

    return (
        matchingToSessionUser && (
            <button className='comment-delete-btn' onClick={() => handleDelete(comment?.id)}
            >Delete</button>
        )
    )
}

export default DeleteCommentButton
