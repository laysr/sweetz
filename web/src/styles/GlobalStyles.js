import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: 'Nova Slim', sans-serif;
    background: white;
    color: ${colors.primaryColor};
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
    background: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
  }

  a {
    text-decoration: none;
    color: ${colors.primaryColor};
  }

  ul {
    list-style: none;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--success {
    background: ${colors.successColor}
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--error {
    background: ${colors.errorColor}
  }
`;

export const Container = styled.section`
  max-width: 360px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const App = styled.div`
  background-color: ${colors.primaryColor};
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: #000;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 97vw;
  height: 93vh;
  background: #ffffff;
  border-radius: 10px;
  overflow: scroll;

  .btn:focus {
    outline-style: none;
  }
`;

export const Title = styled.h1`
  color: ${colors.primaryColor};
  font-family: 'Nova Slim', sans-serif;
  margin-top: 10px;
`;

export const CadastrarButton = styled.button`
  margin-right: 0px;
  border-radius: 10px 0 0 10px;

  border-right: 1px thick #000000;
  border-bottom: 0px;
  border-left: 0;
  border-top: 0;
`;

export const LoginButton = styled.button`
  border-radius: 0 10px 10px 0;
  border: 0;
  border-left: 1px thick #000000;
  border-right: 0;
  border-bottom: 0;
  border-top: 0;
`;

export const HomeButton = styled.button`
  background: ${colors.secondaryColor};
  font-family: 'Nova Slim', sans-serif;
  font-size: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  border: 0;
  border-left: 1px thick #000000;
  border-right: 0;
  border-bottom: 0;
  border-top: 0;

  display: flex;
  align-items: center;
  height: fit-content;
  position: absolute;
  left: 0vh;
`;

export const Botoes = styled.div`
  display: flex;
  height: 35px;
  position: absolute;
  right: 0vh;

  button {
    background: ${colors.secondaryColor};
    font-family: 'Nova Slim', sans-serif;
    font-size: 20px;
    height: fit-content;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    padding-left: 10px;
    padding-right: 10px;
  }
`;
