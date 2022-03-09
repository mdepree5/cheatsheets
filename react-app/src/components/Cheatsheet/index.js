import { useEffect, useState } from 'react';
import CommentsComponent from '../Comments/comments';
import { addComment, getComment, editComment, deleteComment } from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Comments from '../Comments/comments';
import CheatsheetFormModal from './cheatsheet_modal';
import { CheatsheetDeleteButton } from '../Buttons';
import { getStep } from '../../store/steps'
import { getCheatsheet } from '../../store/cheatsheets';

import Steps from '../Steps';

// import Comments from '../Comments/comments';
import './Cheatsheet.css';
import StepsFormModal from '../../components/Steps/StepsFormModal';


// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const CheatsheetPage = () => {
  const dispatch = useDispatch();
  const { cheatsheetId } = useParams();


  // const commentObj = useSelector(state => state.commentState)
  // console.log('%%%%%%%%%%%%%',commentObj)

  // const [content, setContent] = useState()


  const cheatsheet = useSelector(state => state?.cheatsheet[ cheatsheetId ]);
  useEffect(() => { dispatch(getCheatsheet(cheatsheetId)) }, [ dispatch, cheatsheetId ])
  useEffect(() => {
    dispatch(getStep(cheatsheet?.id))
  }, [ dispatch, cheatsheet?.id ])



  let modal;
  if (sessionUser?.id === Number(cheatsheet?.owner_id)) {
    modal = <StepsFormModal cheatsheetId={cheatsheetId} />
  } else {
    modal = null;
  }


  return (
    <div>

      <div style={{height: '200px'}}></div>


      <CheatsheetForm />

      <h2>Title: {cheatsheet?.title}</h2>
      <div>Description: {cheatsheet?.description}</div>
      <div>Dependencies: {cheatsheet?.dependencies}</div>
      <img style={{height:'100px', width:'150px'}} src={cheatsheet?.media_url} alt="cheatsheet" />
      {/* <div>{comments?.map(comment => (<div key={comment?.id} >{comment?.content}</div>))}</div> */}

      <div style={{height: '500px', border:'solid 1px black', color:'red'}}>TEMPORARY FORMAT FOR RENDER STEPS
        <div>{steps?.map(step => (<div key={step?.id} >{step?.title} {step?.content}</div>))}</div>


      <div style={{ height: '200px' }}></div>

      {sessionUser?.id === cheatsheet?.owner_id && (<>
        <CheatsheetFormModal name='Edit Cheatsheet' edit={true} cheatsheet={cheatsheet} />
        <CheatsheetDeleteButton cheatsheetId={cheatsheet?.id} />
      </>)}

      <h1 className='cheatsheet-title'>{cheatsheet?.title}</h1>

      <img className='cheatsheet-img'
        style={{ height: '100px', width: '150px' }}
        src={cheatsheet?.media_url}
        alt="cheatsheet"
        onError={(e) => e.target.style.display = 'none'}
      />

      <div className='img-container'>
        <img className='cheatsheet-page-img' src={cheatsheet?.media_url} alt="cheatsheet" />

      </div>

      <div className='cheatsheet-description'>Description: {cheatsheet?.description}</div>

      <div className='cheatsheet-dependencies'>Dependencies: {cheatsheet?.dependencies}</div>



      <CommentsComponent comments={comments} cheatsheet={cheatsheet} cheatsheetId={cheatsheetId}/>



      <div>
        <Steps cheatsheetId={cheatsheet?.id}/>

        <div>{modal}</div>
        <Comments />
      </div>

    </div>
  );

}

export default CheatsheetPage;
