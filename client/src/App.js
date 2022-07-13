import React, { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import UserProfile from './pages/UserProfile/UserProfile';
import ContestPage from './pages/ContestPage/ContestPage';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NotAuthorizedRoute from './components/NotAuthorizedRoute/NotAuthorizedRoute';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import NotFound from './components/NotFound/NotFound';

import { authActionRefresh } from './actions/actionCreator';
import browserHistory from './browserHistory';
import CONSTANTS from './constants';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App () {
  const dispatch = useDispatch();
  
  useLayoutEffect(() => {
    const refresh = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
    if (refresh) {
      dispatch(authActionRefresh({ refreshToken: refresh }));
    }
  }, [dispatch]);

  return (
    <Router history={browserHistory}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Switch>
        <Route exact path="/" component={Home} />

        <NotAuthorizedRoute exact path="/login" component={LoginPage} />
        <NotAuthorizedRoute
          exact
          path="/registration"
          component={RegistrationPage}
        />

        <PrivateRoute exact path="/payment" component={Payment} />
        <PrivateRoute exact path="/startContest" component={StartContestPage} />
        <PrivateRoute
          exact
          path="/startContest/nameContest"
          component={(...props) => (
            <ContestCreationPage
              contestType={CONSTANTS.NAME_CONTEST}
              title="Company Name"
              {...props}
            />
          )}
        />
        <PrivateRoute
          exact
          path="/startContest/taglineContest"
          component={(...props) => (
            <ContestCreationPage
              contestType={CONSTANTS.TAGLINE_CONTEST}
              title="TAGLINE"
              {...props}
            />
          )}
        />
        <PrivateRoute
          exact
          path="/startContest/logoContest"
          component={(...props) => (
            <ContestCreationPage
              contestType={CONSTANTS.LOGO_CONTEST}
              title="LOGO"
              {...props}
            />
          )}
        />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/contest/:id" component={ContestPage} />
        <PrivateRoute exact path="/account" component={UserProfile} />

        <Route component={NotFound} />
      </Switch>
      <ChatContainer />
    </Router>
  );
}

export default App;
