import styled from 'styled-components';
import * as colors from '../../config/colors';

export const App = styled.body`
  background-color: ${colors.primaryColor};
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 95vw;
  height: 90vh;
  background: #ffffff;
  border-radius: 10px;

  .btn:focus {
    outline-style: none;
  }
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

export const LogoImage = styled.img`
  display: block;
  width: 50vw;
  height: 30vh;
`;

export const Content = styled.div`
  color: #000000;
  background: #f5f5f5;
  width: 40vw;
  height: fit-content;
  border-radius: 10px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  button:focus {
    outline-style: none;
  }
`;

export const Paragraph = styled.p`
  margin-top: 40px;
  margin-left: 5px;
  margin-right: 5px;
  font-family: 'Nova Slim', sans-serif;
  font-size: 3.5vh;
  text-align: center;
`;

export const CalcularButton = styled.button`
  width: 25vw;
  height: 9vh;
  border-radius: 10px;
  margin-top: 30px;
  margin-bottom: 40px;

  font-family: 'Nova Slim', sans-serif;
  font-size: 3vh;
  border: 0px;
  background: #51c5de;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  cursor: pointer;
`;
