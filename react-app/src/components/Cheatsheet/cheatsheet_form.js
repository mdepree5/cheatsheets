import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createCheatsheet} from '../../store/cheatsheets';


export const FormInput = ({name, state, setState}) => {
  const formatName = name.toLowerCase().split(' ').join('-');

  return (
  <div className='form-input'>
    <label htmlFor={formatName}>{name}</label>
    <input id={formatName} placeholder={name} value={state} onChange={e => setState(e.target.value)} />
  </div>
  ) 
}

const CheatsheetForm = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const owner_id = useSelector(state => state?.session?.user?.id);

  console.log(owner_id)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dependencies, setDependencies] = useState('');
  const [media_url, setMedia_url] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();
    const newCheatsheet = await dispatch(createCheatsheet(
      {owner_id, title, description, dependencies, media_url}
    )).catch(async(res) => {
      const data = await res.json();
      if(data && data.errors) setErrors(data.errors)
    })
    
    console.log('CHEATSHEET_FORM', newCheatsheet);

    return newCheatsheet;
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormInput name='Title' state={title} setState={setTitle} />
        <FormInput name='Description' state={description} setState={setDescription} />
        <FormInput name='Dependencies' state={dependencies} setState={setDependencies} />
        <FormInput name='Image' state={media_url} setState={setMedia_url} />
        <button type='submit'>Create new Cheatsheet</button>
      </form>

      <div className='errors'>
        {errors.length > 0 && errors.filter(error => error !== 'Invalid value')
          .map((error, id) => (
            <li key={id}>{error}</li>
          ))
        }
      </div>
    </div>
  )
}

export default CheatsheetForm;