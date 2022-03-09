import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateStep } from '../../store/steps';
import { FormInput, FormTextarea } from '../Steps/StepsForm';




const EditStep = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [stepTitle, setStepTitle] = useState('');
    const [stepContent, setStepContent] = useState('');
    const [media_url, setMedia_url] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedStep = {
            cheatsheetId,
            title,
            content,
            media_url
        };

        closeModal();
        return await dispatch(editStep(payload));
    }



    return (
        <div>
        <form onSubmit={handleSubmit}>
            <FormInput name='Title' state={title} setState={setTitle} />
            <FormTextarea name='Content' state={content} setState={setContent}  />
            <FormInput name='Media_url' state={media_url} setState={setMedia_url} />
            <button type='submit'>Add Step</button>
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

export default EditStep;
