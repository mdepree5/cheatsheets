import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp, login } from '../../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()
  const demoUser = { email: 'demo@aa.io', password: 'password' };

  const handleDemo = (demo) => {
    const { email, password } = demo
    dispatch(login(email, password));
    history.push('/');
  }


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='main-container'>
      <div className='logo-div'>
        <h2>Cheatsheets</h2>
      </div>
      <div className='img-container'>
        <img className='background-img' src='https://www.multidots.com/wp-content/uploads/2020/01/code-quality-standard.png?quality=90' alt='coding-img'/>
      </div>
      <div className='form-container'>
        <form className='signup-form' onSubmit={onSignUp}>
          <div className='errors-div'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
            <input
              className='username-input'
              type='text'
              name='username'
              placeholder='Username'
              onChange={updateUsername}
              value={username}
            ></input>
            <input
              className='email-input'
              type='text'
              name='email'
              placeholder='Email'
              onChange={updateEmail}
              value={email}
            ></input>
            <input
              className='password-input'
              type='password'
              name='password'
              placeholder='Password'
              onChange={updatePassword}
              value={password}
            ></input>
            <input
              className='confirm-password-input'
              type='password'
              name='repeat_password'
              placeholder='Confirm Password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          <button className='submit-button' type='submit'>Sign Up</button>
          <button className='signup-demo-button' onClick={() => handleDemo(demoUser)}>Demo</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
