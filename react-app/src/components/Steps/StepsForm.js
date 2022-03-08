import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { newStep } from '../../store/steps';


export const FormInput = ({ name, state, setState }) => {
    const formatName = name.toLowerCase().split(' ').join('-');

    return (
        <div className='form-input'>
            <label htmlFor={formatName}>{name}</label>
            <input id={formatName} placeholder={name} value={state} onChange={e => setState(e.target.value)} />
        </div>
    )
}


const StepsForm = ({ closeModal }) => {
    const dispatch = useDispatch();
    const [ errors, setErrors ] = useState([]);

    const owner_id = useSelector(state => state?.session?.user?.id);

    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ media_url, setMedia_url ] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        const step = await dispatch(newStep(
            { owner_id, title, content, media_url }
        )).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
        })

        if (step) return closeModal();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormInput name='Title' state={title} setState={setTitle} />
                <FormInput name='Content' state={content} setState={setContent} />
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

export default StepsForm;
