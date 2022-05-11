import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';
import logo from '../../images/logo-no-bg .png';
import CheatsheetFormModal from '../Cheatsheet/cheatsheet_modal';
import SearchBar from '../searchBar/search';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className='navbar'>
      <div id='left-nav'>
        <NavLink className='home-button' to='/'>
          <img src={logo} alt='logo' style={{height: '40px', marginRight: '10px'}}/>
          <div>Cheatsheets</div>
        </NavLink>
      </div>

      <div id='middle-nav'>
        {sessionUser && <SearchBar />}
      </div>

      <div id='right-nav'>
        {sessionUser ? 
        <>
          <CheatsheetFormModal name='Publish'  />
          <LogoutButton />
        </> :
        <>  
          <NavLink to='/login' exact={true} activeClassName='active'>Login</NavLink>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink>
        </>
        }
      </div>
    </nav>

  );
}

export default NavBar;
