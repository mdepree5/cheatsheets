import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CheatsheetFormModal from './cheatsheet_modal';
import { CheatsheetDeleteButton } from '../Buttons';
import { getCheatsheet } from '../../store/cheatsheets';
import CommentsComponent from '../Comments/comments';
import Steps from '../Steps';
import StepsFormModal from '../../components/Steps/StepsFormModal';

import './Cheatsheet.css';

const CheatsheetPage = () => {
  const dispatch = useDispatch();
  const { cheatsheetId } = useParams();
  const sessionUser = useSelector((state) => state?.session?.user)

  const cheatsheet = useSelector(state => state?.cheatsheet[ cheatsheetId ]);
  useEffect(() => { dispatch(getCheatsheet(cheatsheetId)) }, [ dispatch, cheatsheetId ])

  return (
    <div>
      <div style={{ height: '200px' }}></div>
      {sessionUser?.id === cheatsheet?.owner_id && (<>
        <CheatsheetFormModal name='Edit Cheatsheet' edit={true} cheatsheet={cheatsheet} />
        <CheatsheetDeleteButton cheatsheetId={cheatsheet?.id} />
      </>)}

      <h1 className='cheatsheet-title'>{cheatsheet?.title}</h1>
      {cheatsheet?.media_url !== 'no data provided' && 
        <div className='img-container'>
          <img className='cheatsheet-page-img' src={cheatsheet?.media_url} alt="cheatsheet"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      }
      <div className='cheatsheet-description'>Description: {cheatsheet?.description}</div>
      <div className='cheatsheet-author'>By: <span style={{ fontWeight: '600' }}>{cheatsheet?.owner}</span>
        <span style={{ paddingLeft: '15px' }}> Published:</span> {cheatsheet?.created_at}
      </div>

      <div className='cheatsheet-dependencies'>Dependencies: {cheatsheet?.dependencies}</div>

      <div>
        <Steps cheatsheetId={cheatsheetId} />
        
        {sessionUser?.id === Number(cheatsheet?.owner_id) && <StepsFormModal cheatsheetId={cheatsheetId} />}

        <CommentsComponent cheatsheetId={cheatsheetId} />
      </div>
    </div>
  );

}

export default CheatsheetPage;
