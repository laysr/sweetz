import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';

import { App, Main } from '../../styles/GlobalStyles';
import {
  HomeButton,
  Title,
  Paragraph,
  Campo,
  TextCampo,
  InputCampo,
  LoginButton,
} from './styled';
import * as actions from '../../store/modules/auth/actions';

import history from '../../services/history';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (senha.length < 6 || senha.length > 50) {
      formErrors = true;
      toast.error('Senha inválida');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, senha, prevPath }));

    history.push('/');
  }

  return (
    <App>
      <Main>
        <Link to="/">
          <HomeButton>Home</HomeButton>
        </Link>
        <Title>Login</Title>
        <Paragraph>Por favor, insira seus dados abaixo:</Paragraph>

        <Campo>
          <TextCampo>E-mail:</TextCampo>
          <InputCampo
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Insira seu email"
          />

          <TextCampo>Senha:</TextCampo>
          <InputCampo
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="Insira sua senha"
          />
          <LoginButton onClick={handleSubmit}>Login</LoginButton>
        </Campo>
      </Main>
    </App>
  );
}
