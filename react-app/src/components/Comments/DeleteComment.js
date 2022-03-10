import { deleteComment } from "../../store/comments"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import match from "../../utils/match"

const DeleteCommentButton = ({comment, cheatsheetId}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionId = useSelector(state => state?.session?.user?.id)
    const writerId = comment.writer_id

    const matchingToSessionUser = match(sessionId, writerId)


    const handleDelete = async (commentId) => {
        await dispatch(deleteComment(commentId))
        history.push(`/cheatsheets/${cheatsheetId}`)

    }

    return (
        matchingToSessionUser && (
            <button onClick={() => handleDelete(comment?.id)}>Delete</button>
        )
    )
}

export default DeleteCommentButton
