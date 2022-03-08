import {useHistory} from 'react-router-dom';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createCheatsheet, updateCheatsheet} from '../../store/cheatsheets';


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
    
    if(edit){
      const updatedCheatsheet = await dispatch(updateCheatsheet(
        {...cheatsheet, title, description, dependencies, media_url}
      )).catch(async(res) => {
        const data = await res.json();
        if(data && data.errors) setErrors(data.errors);
      })
  
      if(updatedCheatsheet?.errors) setErrors(updatedCheatsheet?.errors);
      return closeModal(); 
    }

    const newCheatsheet = await dispatch(createCheatsheet(
      {owner_id, title, description, dependencies, media_url}
    )).catch(async(res) => {
      const data = await res.json();
      if(data && data.errors) setErrors(data.errors)
    })
    

    if(newCheatsheet) setErrors(newCheatsheet)
    console.log('HEY', errors)
    // console.log('CHEATSHEET_FORM', newCheatsheet)
    // if(newCheatsheet?.errors) {
    //   setErrors(newCheatsheet?.errors)
    //   console.log('THE ERRORS', errors)
    // }

    if(newCheatsheet?.id) {
      history.push(`/cheatsheets/${newCheatsheet?.id}`);
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
        <button type='submit'>{name}</button>
      </form>

      <div className='errors'>
        {errors?.length > 0 && errors?.filter(error => error !== 'Invalid value')
          .map((error, id) => (
            <li key={id}>{error}</li>
          ))
        }
      </div>
    </div>
  )
}

export default CheatsheetForm;