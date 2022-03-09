import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editComment, getComment } from '../../store/comments';

const EditComment = ({closeModal, comment}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { cheatsheetId } = useParams();
    const id = comment.id
    console.log('comment id: ', id)

    const [content, setContent] = useState(comment.content);

    const cheatsheet_id = cheatsheetId

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedComment = await dispatch(editComment({
            id,
            content
        }));

        if (updatedComment) {
            await dispatch(getComment(cheatsheetId))
            closeModal();
            return history.push(`/cheatsheets/${cheatsheetId}`)
        }
    }

    return (
        <div>
            <form className='edit_comment_form' onSubmit={handleSubmit}>
                <textarea className='edit_comment_textarea'
                cols="50"
                rows="5"
                    >
                </textarea>
                <button type='submit' className='update_btn'>update comment</button>
            </form>
        </div>
    )
}

export default EditComment;
