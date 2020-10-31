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
