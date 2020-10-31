import React from 'react';
import { Link } from 'react-router-dom';

import {
  App,
  Main,
  Title,
  HomeButton,
  CadastrarButton,
  Paragraph,
  Campos,
  Campo,
  TextCampo,
  InputCampo,
} from './styled';

function Landing() {
  return (
    <App>
      <Main>
        <Link to="/">
          <HomeButton>Home</HomeButton>
        </Link>
        <Title>Cadastro</Title>
        <Paragraph>Por favor, insira seus dados abaixo:</Paragraph>
        <Campos>
          <Campo>
            <TextCampo>Email:</TextCampo>
            <InputCampo />
          </Campo>
          <Campo>
            <TextCampo>Senha:</TextCampo>
            <InputCampo />
          </Campo>
        </Campos>
        <Campos>
          <Campo>
            <TextCampo>Lucro Desejado:</TextCampo>
            <InputCampo />
          </Campo>
          <Campo>
            <TextCampo>Repita a Senha:</TextCampo>
            <InputCampo />
          </Campo>
        </Campos>
        <Link to="/login">
          <CadastrarButton>Cadastrar</CadastrarButton>
        </Link>
      </Main>
    </App>
  );
}

export default Landing;
