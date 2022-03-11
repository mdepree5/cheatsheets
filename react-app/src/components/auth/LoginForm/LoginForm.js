import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const demoUser = { email: 'demo@aa.io', password: 'password' };

  const handleDemo = (demo) => {
    const { email, password } = demo
    dispatch(login(email, password));
    history.push('/');
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='main-container'>
      <div className='img-container'>
        <img className='background-img' src='https://www.multidots.com/wp-content/uploads/2020/01/code-quality-standard.png?quality=90' alt='coding-img'/>
      </div>
      <div className='form-container'>
        <form className='login-form' onSubmit={onLogin}>
          <div>
            <input
              className='email-input'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
            <input
              className='password-input'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <button className='submit-button' type='submit'>Login</button>
            <button className='login-demo-button' onClick={() => handleDemo(demoUser)}>Demo</button>
          </div>
        </form>
        <div className='errors-div'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
