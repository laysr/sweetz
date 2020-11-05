import styled from 'styled-components';
import * as colors from '../../config/colors';

export const ListItem = styled.li`
  color: #000;
`;

export const IngredientePicker = styled.div`
  margin-top: 30px;
  background: ${colors.secondaryColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: fit-content;
  border-radius: 10px;
`;

export const SelectContainer = styled.div`
  width: 30vw;
  margin-left: 10px;
  margin-right: 10px;
`;

export const NumberInput = styled.input`
  height: 63%;
  width: 20%;
  padding-left: 7px;
  font-size: 70%;
`;

export const UnidadeIndicator = styled.p`
  margin-left: 0px;
  color: white;
`;

export const TableDiv = styled.div`
  height: 50vh;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const IngredientesTable = styled.table`
  margin-top: 30px;

  border-collapse: collapse;
  border-radius: 5px;

  th {
    background-color: ${colors.primaryColor};
    color: white;
  }

  tr {
    /* border: 1px solid black; */
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  th,
  td {
    border-radius: 0px;
    padding: 15px;
    text-align: left;
  }
`;

export const CustoIndicator = styled.div`
  margin-top: 30px;
  background: ${colors.secondaryColor};
  padding: 5px;
  border-radius: 5px;
  color: black;
`;
