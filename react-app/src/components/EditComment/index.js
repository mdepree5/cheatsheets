import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editComment, getComment } from '../../store/comments';

const EditComment = ({ closeModal, comment }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { cheatsheetId } = useParams();
    const id = comment.id


    const [ content, setContent ] = useState(comment.content);


    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(editComment({
            id,
            content
        }));
        await dispatch(getComment(cheatsheetId))
        closeModal();
        return history.push(`/cheatsheets/${cheatsheetId}`)

    }

    return (
        <div>
            <form className='edit_comment_form' onSubmit={handleSubmit}>
                <textarea className='edit_comment_textarea'
                    cols="50"
                    rows="5"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    style={{ borderRadius: '5px' }}
                >
                </textarea>
                <div>
                    <button type='submit' className='update_btn'
                        style={{
                            marginLeft: '120px',
                            backgroundColor: '#FAAC18',
                            color: '#fcfcfc'
                        }}>
                        Update Comment</button>
                </div>
            </form>
        </div>
    )
}

export default EditComment;
