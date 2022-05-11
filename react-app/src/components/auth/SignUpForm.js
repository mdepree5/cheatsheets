import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
// ???? ——————————————————————————————————————————————————————————————————————————————————
import { signUp, login } from '../../store/session';
import './AuthForm.css'
// ???? ——————————————————————————————————————————————————————————————————————————————————

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
    const data = await dispatch(signUp(username, email, password));
    if (data) setErrors(data)
    return;
  };

  useEffect(()=> {
    const errors = [];
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if(!username) errors.push('Please provide a username');
    if(username.length > 40) errors.push('Please provide a shorter username (40 chars or less).');
    if(emailRegex.exec(email) === null) errors.push('Please provide a valid email.');
    if(password.length < 8) errors.push('Please provide a password with 8 characters or more.');
    if(password !== repeatPassword ) errors.push('Passwords do not match');
  
    setErrors(errors);
  }, [username, email, password, repeatPassword])


  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-page'>
      <img className='background-img' src='https://www.multidots.com/wp-content/uploads/2020/01/code-quality-standard.png?quality=90' alt='coding-img'/>

      <div className='form-container'>
        <form className='signup-form' onSubmit={onSignUp}>
          <input type='text' name='username' placeholder='Username'
            value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type='text' name='email' placeholder='Email'
            value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type='password' name='password' placeholder='Password'
            value={password} onChange={(e) => setPassword(e.target.value)}/>
          <input type='password' name='repeat_password' placeholder='Confirm Password'
            value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required={true} />
          <button className='auth-button' type='submit' disabled={errors.length > 0} >Sign Up</button>
          <button className='auth-button' onClick={() => handleDemo(demoUser)}>Demo</button>
        </form>

        <div className='errors-container'>
          {errors.map((error, ind) => <div key={ind}>{error}</div>)}
        </div>

      </div>
    </div>
  );
};

export default SignUpForm;
