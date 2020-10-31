import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';
import Landing from '../pages/Landing';
import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Landing} />
      <MyRoute exact path="/cadastrar" component={Cadastro} />
      <MyRoute exact path="/login" component={Login} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
