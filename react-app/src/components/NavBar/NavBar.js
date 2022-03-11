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




  let sessionLinks;
  let publishAndSearch;
  if (sessionUser) {
    sessionLinks = <LogoutButton />;
    publishAndSearch = (
      <>
        <CheatsheetFormModal style={{ backgroundColor: '#FAAC18' }} className='publish_btn' name='Publish'  />
        <SearchBar />
      </>
    )
  } else {
    sessionLinks = (
      <div className='login-signup-links'>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </div>
    )
    publishAndSearch = null;
  }
  return (
    <nav className='nav-container'>
      <ul className='navbar'>
        <li className='home'>
          <NavLink to='/' exact={true} activeClassName='active' >
            Home
          </NavLink>
        </li>
        <li className='session-links'>
          {sessionLinks}
        </li>
      </ul>

      <ul className='navbar_bottom'>
        <li className='logo'>
          <NavLink to='/'><img src={logo} alt='logo'
            style={{
              height: '40px',
              marginRight: '10px'
            }}
          /><span>cheatsheets</span></NavLink>
        </li>
        <li className='navbar_right'>
          {publishAndSearch}
        </li>

      </ul>
    </nav>

  );
}

export default NavBar;
