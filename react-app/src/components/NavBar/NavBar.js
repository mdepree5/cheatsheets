import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <LogoutButton />;
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

  }
  return (
    <nav>
      <ul className='navbar'>
        <li className='home'>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li className='session-links'>
          {sessionLinks}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
