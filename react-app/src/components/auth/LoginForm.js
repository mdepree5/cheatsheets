import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
// ???? ——————————————————————————————————————————————————————————————————————————————————
import { login } from '../../store/session';
import './AuthForm.css'
// ???? ——————————————————————————————————————————————————————————————————————————————————

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
    if (data) setErrors(data);
  };

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  if (user) return <Redirect to='/' />;

  return (
    <div className='auth-page'>
      <img className='background-img' src='https://www.multidots.com/wp-content/uploads/2020/01/code-quality-standard.png?quality=90' alt='coding-img'/>

      <div className='form-container'>
        <form onSubmit={onLogin}>
          <input name='email' type='text' placeholder='Email'
            value={email} onChange={updateEmail}/>
          <input name='password' type='password' placeholder='Password'
            value={password} onChange={updatePassword}/>
          <button className='auth-button' type='submit'>Login</button>
          <button className='auth-button' onClick={() => handleDemo(demoUser)}>Demo</button>
        </form>

        <div className='errors-container'>
          {errors.map((error, ind) => <div key={ind}>{error}</div> )}
        </div>

      </div>
    </div>
  );
};

export default LoginForm;
