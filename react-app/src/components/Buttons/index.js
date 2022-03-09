import {useHistory} from 'react-router-dom';
import {deleteCheatsheet} from "../../store/cheatsheets";
import { useSelector, useDispatch } from "react-redux";
import './Buttons.css'

export const DeleteButton = ({thisId, deleteThunk, config}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  config = { buttonName: 'Delete', newRoute: null, ...config }

  const handleDelete = async() => {
    const deleted = await dispatch(deleteThunk(thisId));
    return config.newRoute ? history.push(config.newRoute) : deleted;
  }

  return (
    <button className='delete' onClick={handleDelete}>{config.buttonName}</button>
  )
}


export const CheatsheetDeleteButton = ({cheatsheetId}) => (
  <DeleteButton thisId={cheatsheetId} deleteThunk={deleteCheatsheet} config={{buttonName: 'Delete Cheatsheet', newRoute:'/'}}/>
)
