import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateStep, getStep } from '../../store/steps';
import './editStep.css';

export const FormInput = ({ name, state, setState, isRequired }) => {
    const formatName = name.toLowerCase().split(' ').join('-');

    return (
        <div className='form-input'>
            <input id={formatName} placeholder={name} value={state} onChange={e => setState(e.target.value)} required={isRequired} />
        </div>
    )
}

export const FormTextarea = ({ name, state, setState }) => {
    const formatName = name.toLowerCase().split(' ').join('-');

    return (
        <div className='form-input'>
            <textarea id={formatName} placeholder={name} value={state} onChange={e => setState(e.target.value)} required />
        </div>
    )
}


const EditStep = ({ closeModal, step }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const sessionUser = useSelector(state => state.session.user);
    const { cheatsheetId } = useParams();

    const [ title, setTitle ] = useState(step.title);
    const [ content, setContent ] = useState(step.content);
    const [ media_url, setMedia_url ] = useState(step.media_url);
    const [ errors, setErrors ] = useState([]);

    const cheatsheet_id = cheatsheetId;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('cheatsheet_id', cheatsheet_id);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('media_url', media_url);

        const updatedStep = await dispatch(updateStep(formData, step?.id)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
        });


        if (updatedStep) {
            await dispatch(getStep(cheatsheetId))
            closeModal();
            return history.push(`/cheatsheets/${cheatsheetId}`)
        }
    }



    return (
        <div className='edit-step-form-container'>
            <h4 className='edit-step-header'>Edit step</h4>
            <form className='edit-step-form' onSubmit={handleSubmit}>
                <FormInput name='Title' state={title} setState={setTitle} isRequired={true} />
                <FormTextarea name='Content' state={content} setState={setContent} />
                {/* <FormInput name='Media_url' state={media_url} setState={setMedia_url} isRequired={false} /> */}
                <label htmlFor={'media_url'} id='media_url' >Upload an Image</label>
                <input name='media_url' id='media_url_input' type="file" accept="image/*" onChange={e => setMedia_url(e.target.files[0])} />
                <button className='edit-step-submit' type='submit'
                    style={{
                        backgroundColor: '#FAAC18',
                        color: '#fcfcfc',
                        marginRight: '40px'
                    }}

                >Edit step</button>
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
