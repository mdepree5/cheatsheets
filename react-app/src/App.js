import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm/LoginForm.js';
import SignUpForm from './components/auth/SignUpForm/SignUpForm.js';
import NavBar from './components/NavBar/NavBar.js';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Homepage from './components/Homepage/Homepage.js';
import UploadPicture from './components/test_uploadPicture/test_uploadPicture.js';
import Footer from './components/Footer/Footer';
import PageNotFound from './components/PageNotFound/notFound.js';



import CheatsheetPage from './components/Cheatsheet';

function App() {
  const [ loaded, setLoaded ] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [ dispatch ]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <ProtectedRoute path='/' exact={true} >
          <Homepage />
        </ProtectedRoute>

        <Route path='/cheatsheets/:cheatsheetId'>
          <CheatsheetPage />
        </Route>

        {/* test route to check if we are able to upload to aws */}
        <Route path='/upload' >
          <UploadPicture />
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
