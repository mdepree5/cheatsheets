import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCheatsheet, updateCheatsheet } from '../../store/cheatsheets';
import './Cheatsheet.css';

export const FormInput = ({ name, state, setState }) => {
  const formatName = name.toLowerCase().split(' ').join('-');

  return (
    <div className='form-input'>
      <label htmlFor={formatName}>{name}</label>
      <input id={formatName} placeholder={name} name={formatName} value={state} onChange={e => setState(e.target.value)} />
    </div>
  )
}

const CheatsheetForm = ({ name, edit, cheatsheet, closeModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ errors, setErrors ] = useState([]);
  const [ imageLoading, setImageLoading ] = useState(false);

  const owner_id = useSelector(state => state?.session?.user?.id);

  const [ title, setTitle ] = useState(edit ? cheatsheet?.title : '');
  const [ description, setDescription ] = useState(edit ? cheatsheet?.description : '');
  const [ dependencies, setDependencies ] = useState(edit ? cheatsheet?.dependencies : '');
  const [ media_url, setMedia_url ] = useState(edit ? cheatsheet?.media_url : '');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('owner_id', owner_id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('dependencies', dependencies);
    formData.append('media_url', media_url);

    setImageLoading(true);
    if (edit) {
      const updated = await dispatch(updateCheatsheet(formData, cheatsheet?.id))
      if (updated?.errors) setErrors(updated?.errors);
      if (updated?.id) {
        setImageLoading(false);
        history.push(`/`) // => data loads but visual render not immediate
        history.push(`/cheatsheets/${cheatsheet?.id}`)
        return closeModal();
      }
      return 'Failed to update';
    }

    const created = await dispatch(createCheatsheet(formData))
    if (created?.errors) setErrors(created?.errors)
    if (created?.id) {
      setImageLoading(false);
      history.push(`/cheatsheets/${created?.id}`);
      return closeModal();
    }
    return 'Failed to Create';
  }

  const updateMedia_url = (e) => {
    const file = e.target.files[ 0 ];
    setMedia_url(file);
  }

  return (
    <div>
      <form className='cheatsheet-form-container' onSubmit={handleSubmit}>
        <FormInput name='Title' state={title} setState={setTitle} />
        <FormInput name='Description' state={description} setState={setDescription} />
        <FormInput name='Dependencies' state={dependencies} setState={setDependencies} />
        <label htmlFor={'media_url'} id='media_url' >Upload an Image</label>
        <input name='media_url' id='media_url_input' type="file" accept="image/*" onChange={updateMedia_url} />

        <button className='new-delete-button' type='submit'
          style={{
            backgroundColor: '#FAAC18',
            color: '#fcfcfc'
          }}>{name}
        </button>
      </form>
      {(imageLoading) && <p>{edit ? 'Updating' : 'Publishing'}...</p>}

      <div className='errors'>
        {errors?.length > 0 && errors?.filter(error => error !== 'Invalid value')
          .map((error, id) => (
            <div key={id}>{error}</div>
          ))
        }
      </div>
    </div>
  )
}

export default CheatsheetForm;
