import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';

const PrivateRoute = ({ ...rest }) => {
  const userStore = useSelector((state) => state.userStore);

  if (userStore.isFetching) {
    return <Spinner />;
  }

  if (userStore.data === false) {
    return <Redirect to="/" />;
  }

  return (
    <Route {...rest} />
  );
};

export default PrivateRoute;
