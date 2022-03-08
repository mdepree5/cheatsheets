import { useEffect } from 'react';
// import { addComment, getComment, editComment, deleteComment } from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Comments from '../Comments/comments';
import Steps from '../Steps';
import CheatsheetForm from './cheatsheet_form';
import { getCheatsheet } from '../../store/cheatsheets';
// import Comments from '../Comments/comments';
import './Cheatsheet.css';
import StepsFormModal from '../../components/Steps/StepsFormModal';


// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const CheatsheetPage = () => {
  const dispatch = useDispatch();
  const { cheatsheetId } = useParams();
  const sessionUser = useSelector((state) => state.session.user)
  // const commentObject = useSelector((state) => state.commentState.comments[cheatsheetId])
  // console.log('ALSFHASFHD', commentObject)

  const cheatsheet = useSelector(state => state?.cheatsheet[ cheatsheetId ]);
  useEffect(() => { dispatch(getCheatsheet(cheatsheetId)) }, [ dispatch, cheatsheetId ])

  let modal;
  if (sessionUser?.id === Number(cheatsheet?.owner_id)) {
    modal = <StepsFormModal cheatsheetId={cheatsheetId}/>
  } else {
    modal = null;
  }

  return (
    <div>
      <div style={{ height: '200px' }}></div>
      <h1 className='cheatsheet-title'>{cheatsheet?.title}</h1>
      <img className='cheatsheet-img' style={{ height: '100px', width: '150px' }} src={cheatsheet?.media_url} alt="cheatsheet" />
      <div className='cheatsheet-description'>Description: {cheatsheet?.description}</div>

      <div className='cheatsheet-dependencies'>Dependencies: {cheatsheet?.dependencies}</div>

      <div style={{ height: '500px', border: 'solid 1px black', color: 'red' }}>TEMPORARY FORMAT FOR RENDER STEPS
        <Steps />
        <div>{modal}</div>
      </div>
    </div>
  );

}

export default CheatsheetPage;
