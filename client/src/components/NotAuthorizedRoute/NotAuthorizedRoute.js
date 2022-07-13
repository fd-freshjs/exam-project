import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const NotAuthorizedRoute = ({ ...rest }) => {
  const userStore = useSelector((state) => state.userStore);

  if (userStore.isFetching) {
    return <Spinner />;
  }

  if (userStore.isAuth === true) {
    return <Redirect to="/" />;
  }
  
  return <Route {...rest} />;
};

export default NotAuthorizedRoute;
