import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';

import axios from '../../services/axios';
import history from '../../services/history';

import { App, Main } from '../../styles/GlobalStyles';
import {
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
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lucro, setLucro] = useState('');
  const [nome, setNome] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (senha.length < 6 || senha.length > 50) {
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (formErrors) return;

    try {
      await axios.post('/users', {
        nome,
        email,
        senha,
        lucro_desejado: lucro,
      });

      toast.success('Cadastro realizado com sucesso!');
      history.push('/login');
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);

      errors.map(error => toast.error(error));
    }
  }

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
            <TextCampo>Nome:</TextCampo>
            <InputCampo
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Insira seu nome"
            />
          </Campo>
          <Campo>
            <TextCampo>Lucro Desejado:</TextCampo>
            <InputCampo
              type="text"
              value={lucro}
              onChange={e => setLucro(e.target.value)}
              placeholder="Insira seu lucro desejado"
            />
          </Campo>
        </Campos>
        <Campos>
          <Campo>
            <TextCampo>E-mail:</TextCampo>
            <InputCampo
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Insira seu email"
            />
          </Campo>
          <Campo>
            <TextCampo>Senha:</TextCampo>
            <InputCampo
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="Insira sua senha"
            />
          </Campo>
        </Campos>
        <CadastrarButton onClick={handleSubmit}>Cadastrar</CadastrarButton>
      </Main>
    </App>
  );
}

export default Landing;
