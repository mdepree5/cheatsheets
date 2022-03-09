import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateComment, getComment } from '../../store/Comments';



const EditComment = ({ closeModal, CommentId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { cheatsheetId } = useParams();
    const id = CommentId;

    const [content, setContent] = useState('');


    const cheatsheet_id = cheatsheetId;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedComment = await dispatch(updateComment(
            { id, cheatsheet_id, title, content, media_url }
            )).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
        });


       if (updatedComment) {
           await dispatch(getComment(cheatsheetId))
           closeModal();
           return history.push(`/cheatsheets/${cheatsheetId}`)
       }
    }



    return (
        <div>
        <form onSubmit={handleSubmit}>
            <FormInput name='Title' state={title} setState={setTitle} />
            <FormTextarea name='Content' state={content} setState={setContent}  />
            <FormInput name='Media_url' state={media_url} setState={setMedia_url} />
            <button type='submit'>Edit Comment</button>
        </form>
        <div className='errors'>
            {errors.length > 0 && errors.filter(error => error !== 'Invalid value')
                .map((error, id) => (
                    <li key={id}>{error}</li>
                ))
            }
        </div>
    </div>
    );
}

export default EditComment;
