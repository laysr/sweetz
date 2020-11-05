import React from 'react';
import { Switch } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import MyRoute from './MyRoute';
/* import Landing from '../pages/Landing';
import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';
import CalculoLogado from '../pages/CalculoLogado';
import Produtos from '../pages/Produtos'; */
import Calculo from '../pages/Calculo';
import Page404 from '../pages/Page404';

export default function Routes() {
  // const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Switch>
      <MyRoute exact path="/" component={Calculo} />
      {/* <MyRoute exact path="/cadastrar" component={Cadastro} />
      <MyRoute exact path="/login" component={isLoggedIn ? Produtos : Login} />
      <MyRoute
        exact
        path="/calcular"
        component={isLoggedIn ? CalculoLogado : Calculo}
      />
      <MyRoute exact path="/produtos" component={Produtos} isClosed /> */}
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
