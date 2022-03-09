import React, { useState, useEffect } from 'react';
import {NavLink, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getCheatsheetsByUserId } from '../store/cheatsheets';
import CheatsheetFormModal from '../components/Cheatsheet/cheatsheet_modal';

import no_image from '../images/no_image_found.png';
// import Image from 'react'

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div>
    <div style={{height: '200px'}}></div>
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>

    </div>
  );
}


const UserPage = () => {
  const userId = useSelector((state) => state?.session?.user?.id)
  const dispatch = useDispatch();
  const cheatsheetsObj = useSelector((state) => state?.cheatsheet)
  const cheatsheets = cheatsheetsObj && Object.values(cheatsheetsObj)

  useEffect(() => {
      dispatch(getCheatsheetsByUserId(userId));
  }, [ dispatch ]);

  return (
    <div className="homepage_body">
      <User/>
        <div id="explore_container">
          <h2>My Cheatsheets</h2>
          <div className="cheatsheets_container">
            {cheatsheets.length > 1 ? cheatsheets.map((cheatsheet) => (
              <NavLink key={cheatsheet?.id} to={`/cheatsheets/${cheatsheet?.id}`}>
                <div className={`cheatsheet_box`}>
                  <div>
                    <img className="cheatsheet-img" src={`${cheatsheet?.media_url}` ? `${cheatsheet?.media_url}` : no_image} alt='none' />
                    <div>
                      <h3>{cheatsheet?.title}</h3>
                      <p>author name</p>
                    </div>
                  </div>
                </div>
              </NavLink>
            )) : 
            <>
              <div>No cheatsheets yet. Start writing now:</div>
              <CheatsheetFormModal className='publish_btn' name='Publish' />
            </>
            }
          </div>
        </div>
    </div>
  )
}

export default UserPage
