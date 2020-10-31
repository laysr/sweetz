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

export const Title = styled.h1`
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${colors.primaryColor};
  font-family: 'Nova Slim', sans-serif;
`;

export const Paragraph = styled.p`
  margin-bottom: 20px;
  font-family: 'Nova Slim', sans-serif;
  color: #000;
  font-size: 3.5vh;
  text-align: center;
`;

export const HomeButton = styled.button`
  display: flex;
  position: absolute;
  right: 0vh;
  background: ${colors.secondaryColor};
  font-family: 'Nova Slim', sans-serif;
  font-size: 20px;
  height: fit-content;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
`;

export const CadastrarButton = styled.button`
  width: 30vw;
  height: 10vh;
  margin-top: 10px;
  border-radius: 10px;
  font-size: 5vh;
  font-family: 'Nova Slim', sans-serif;
`;

export const Campos = styled.div`
  width: 60vw;
  height: 25vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Campo = styled.div`
  width: 25vw;
  height: 15vh;
  background: ${colors.secondaryColor};
  border: 4px solid ${colors.primaryColor};
  box-sizing: border-box;
  border-radius: 10px;
`;

export const TextCampo = styled.h5`
  margin-left: 14%;
  margin-top: 7%;
  font-family: 'Nova Slim', sans-serif;
`;

export const InputCampo = styled.input`
  height: 30%;
  margin-left: 14%;
  border-radius: 5px;
  border: 0;
`;
