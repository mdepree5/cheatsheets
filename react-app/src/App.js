import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// ???? ——————————————————————————————————————————————————————————————————————————————————
import { authenticate } from './store/session';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NavBar from './components/NavBar/NavBar.js';
import Footer from './components/Footer/Footer';
// ???? ——————————————————————————————————————————————————————————————————————————————————
import LoginForm from './components/auth/LoginForm.js';
import SignUpForm from './components/auth/SignUpForm.js';
import UsersList from './components/UsersList';
import User from './components/User';
import Homepage from './components/Homepage/Homepage.js';
import SearchResults from './components/searchResults/SearchResults.js';
import CheatsheetPage from './components/Cheatsheet';
import PageNotFound from './components/PageNotFound/notFound.js';
// ???? ——————————————————————————————————————————————————————————————————————————————————

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
        <Route path='/login' exact={true}><LoginForm /></Route>
        <Route path='/sign-up' exact={true}><SignUpForm /></Route>
        <ProtectedRoute path='/users' exact={true} ><UsersList /></ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} ><User /></ProtectedRoute>
        <ProtectedRoute path='/' exact={true} ><Homepage/></ProtectedRoute>
        <Route path={'/search/:keyword'} exact={true}><SearchResults/></Route>
        <Route path='/cheatsheets/:cheatsheetId'><CheatsheetPage/></Route>
        <Route path='*'><PageNotFound/></Route>
      </Switch>
      <div style={{height: '100px'}}></div>
      <Route render={({location}) => (location.pathname === '/') && <Footer />}/>
    </BrowserRouter>
  );
}

export default App;
