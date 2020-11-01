import styled from 'styled-components';
import * as colors from '../../config/colors';

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

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10vw;
  height: 5vh;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 2.5vh;
  font-family: 'Nova Slim', sans-serif;
`;

export const Campos = styled.div`
  width: 60vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Campo = styled.div`
  width: 25vw;
  height: 40vh;
  background: ${colors.secondaryColor};
  border: 4px solid ${colors.primaryColor};
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const TextCampo = styled.h5`
  margin-top: 7%;
  font-family: 'Nova Slim', sans-serif;
`;

export const InputCampo = styled.input`
  height: 15%;
  width: 70%;
  padding-left: 5px;
  border-radius: 5px;
  border: 0;
`;
