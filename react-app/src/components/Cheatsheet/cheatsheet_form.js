import {useHistory} from 'react-router-dom';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createCheatsheet, updateCheatsheet} from '../../store/cheatsheets';
import './Cheatsheet.css';

export const FormInput = ({name, state, setState}) => {
  const formatName = name.toLowerCase().split(' ').join('-');

  return (
  <div className='form-input'>
    <label htmlFor={formatName}>{name}</label>
    <input id={formatName} placeholder={name} value={state} onChange={e => setState(e.target.value)} />
  </div>
  )
}

const CheatsheetForm = ({name, edit, cheatsheet, closeModal}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  const owner_id = useSelector(state => state?.session?.user?.id);


  const [title, setTitle] = useState(edit ? cheatsheet?.title : '');
  const [description, setDescription] = useState(edit ? cheatsheet?.description : '');
  const [dependencies, setDependencies] = useState(edit ? cheatsheet?.dependencies : '');
  const [media_url, setMedia_url] = useState(edit ? cheatsheet?.media_url : '');

  const handleSubmit = async(event) => {
    event.preventDefault();    
    const cheatsheetData = {...cheatsheet, owner_id, title, description, dependencies, media_url};

    if(edit){
      const updated = await dispatch(updateCheatsheet(cheatsheetData))
      if(updated?.errors) setErrors(updated?.errors);
      if(updated?.id) return closeModal();
    }

    const created = await dispatch(createCheatsheet(cheatsheetData))
    if(created?.errors) setErrors(created?.errors)
    if(created?.id) {
      history.push(`/cheatsheets/${created?.id}`);
      return closeModal();
    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormInput name='Title' state={title} setState={setTitle} />
        <FormInput name='Description' state={description} setState={setDescription} />
        <FormInput name='Dependencies' state={dependencies} setState={setDependencies} />
        <FormInput name='Image' state={media_url} setState={setMedia_url} />
        <button className='new-delete-button' type='submit'>{name}</button>
      </form>

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
