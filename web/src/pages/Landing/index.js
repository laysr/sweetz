import React from 'react';
import { Link } from 'react-router-dom';
import landingPage from '../../assets/landing-page.png';

import {
  App,
  Main,
  CadastrarButton,
  LoginButton,
  Botoes,
  LandingImage,
  Content,
  Paragraph,
  CalcularButton,
} from './styled';

function Landing() {
  return (
    <App>
      <Main>
        <Botoes>
          <Link to="/cadastrar">
            <CadastrarButton>Cadastrar</CadastrarButton>
          </Link>
          <Link to="/login">
            <LoginButton>Login</LoginButton>
          </Link>
        </Botoes>
        <LandingImage src={landingPage} alt="logo" />
        <Content>
          <Paragraph>
            Crie uma conta para salvar seus produtos ou clique no botão abaixo
            para apenas calcular seus custos:
          </Paragraph>
          <Link to="/calcular">
            <CalcularButton>Calcular custos</CalcularButton>
          </Link>
        </Content>
      </Main>
    </App>
  );
}

export default Landing;
